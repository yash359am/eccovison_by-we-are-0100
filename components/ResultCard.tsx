import React, { useEffect, useRef } from 'react';
import { ClassificationResult, ClassificationCategory } from '../types';
import { RecycleIcon, TrashIcon, CompostIcon } from './icons';

interface ResultCardProps {
    imageSrc: string | null;
    result: ClassificationResult | null;
    error: string | null;
    onReset: () => void;
}

const getCategoryStyle = (category?: ClassificationCategory) => {
    switch (category) {
        case ClassificationCategory.RECYCLABLE:
            return {
                bg: 'bg-blue-500',
                text: 'text-blue-100',
                icon: <RecycleIcon className="w-8 h-8" />,
                name: 'Recyclable'
            };
        case ClassificationCategory.COMPOSTABLE:
            return {
                bg: 'bg-green-600',
                text: 'text-green-100',
                icon: <CompostIcon className="w-8 h-8" />,
                name: 'Compostable'
            };
        case ClassificationCategory.NON_RECYCLABLE:
            return {
                bg: 'bg-gray-600',
                text: 'text-gray-100',
                icon: <TrashIcon className="w-8 h-8" />,
                name: 'Non-Recyclable'
            };
        default:
            return {
                bg: 'bg-red-500',
                text: 'text-red-100',
                icon: null,
                name: 'Error'
            };
    }
}

const ResultCard: React.FC<ResultCardProps> = ({ imageSrc, result, error, onReset }) => {
    const categoryStyle = getCategoryStyle(result?.classification);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const gsap = (window as any).gsap as any;
        if (!gsap) return;
        if (wrapperRef.current) {
            gsap.fromTo(wrapperRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
        }
        if (!error && result && badgeRef.current) {
            gsap.fromTo(badgeRef.current, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' });
        }
    }, [result, error]);

    return (
        <div ref={wrapperRef} className="w-full flex flex-col items-center gap-6">
            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl">
                <div className="flex justify-center items-center">
                    {imageSrc && <img src={imageSrc} alt="Waste item" className="rounded-lg max-h-80 object-contain shadow-lg" />}
                </div>
                <div className="flex flex-col justify-center">
                    {error ? (
                        <div className="bg-red-900/50 p-4 rounded-lg border border-red-700">
                            <h2 className="text-xl font-bold text-red-300">Classification Failed</h2>
                            <p className="text-red-300 mt-2">{error}</p>
                        </div>
                    ) : result && (
                        <>
                            <div ref={badgeRef} className={`flex items-center gap-3 px-4 py-2 rounded-full self-start ${categoryStyle.bg} ${categoryStyle.text}`}>
                                {categoryStyle.icon}
                                <span className="font-bold text-lg">{categoryStyle.name}</span>
                            </div>
                            <p className="text-gray-300 mt-4 text-lg">
                                <span className="font-semibold text-white">Reason:</span> {result.reason}
                            </p>
                        </>
                    )}
                </div>
            </div>
            <button onClick={onReset} className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300">
                Classify Another Item
            </button>
        </div>
    );
};

export default ResultCard;