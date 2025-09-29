import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ClassificationResult } from '../types';
import { classifyWaste } from '../services/geminiService';
import CameraCapture from './CameraCapture';
import ResultCard from './ResultCard';
import Loader from './Loader';
import { CameraIcon, UploadIcon } from './icons';

type View = 'select' | 'camera' | 'loading' | 'result';

const WasteClassifier: React.FC = () => {
    const [view, setView] = useState<View>('select');
    const [result, setResult] = useState<ClassificationResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const sectionRef = useRef<HTMLElement>(null);

    const handleClassification = useCallback(async (imageDataUrl: string) => {
        setImageSrc(imageDataUrl);
        setView('loading');
        setError(null);
        setResult(null);

        try {
            const classificationResult = await classifyWaste(imageDataUrl);
            setResult(classificationResult);
        } catch (e) {
            setError(e instanceof Error ? e.message : 'An unknown error occurred.');
        } finally {
            setView('result');
        }
    }, []);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageDataUrl = e.target?.result as string;
                if (imageDataUrl) {
                    handleClassification(imageDataUrl);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const reset = () => {
        setView('select');
        setResult(null);
        setError(null);
        setImageSrc(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    useEffect(() => {
        const gsap = (window as any).gsap as any;
        if (!gsap || !sectionRef.current) return;
        gsap.fromTo(
            sectionRef.current,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
        );
    }, [view]);

    const renderContent = () => {
        switch (view) {
            case 'select':
                return (
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button onClick={triggerFileInput} className="flex-1 bg-teal-600 hover:bg-teal-700 transition-colors duration-300 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-3 text-lg">
                            <UploadIcon />
                            Upload Image
                        </button>
                        <button onClick={() => setView('camera')} className="flex-1 bg-green-600 hover:bg-green-700 transition-colors duration-300 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-3 text-lg">
                            <CameraIcon />
                            Use Camera
                        </button>
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                    </div>
                );
            case 'camera':
                return <CameraCapture onCapture={handleClassification} onCancel={() => setView('select')} />;
            case 'loading':
                return <Loader />;
            case 'result':
                return <ResultCard imageSrc={imageSrc} result={result} error={error} onReset={reset} />;
            default:
                return null;
        }
    };

    return (
        <section ref={sectionRef} className="bg-gray-800/50 backdrop-blur-sm p-6 md:p-10 rounded-2xl shadow-2xl border border-gray-700 min-h-[300px] flex flex-col justify-center items-center">
            {renderContent()}
        </section>
    );
};

export default WasteClassifier;