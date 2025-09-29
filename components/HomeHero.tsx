import React, { useEffect, useRef } from 'react';
import { CameraIcon, UploadIcon, RecycleIcon, CompostIcon, TrashIcon } from './icons';

const HomeHero: React.FC<{ onUploadClick?: () => void; onCameraClick?: () => void }> = ({ onUploadClick, onCameraClick }) => {
    const rootRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const badgesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const gsap = (window as any).gsap as any;
        if (!gsap) return;
        gsap.set([titleRef.current, subtitleRef.current, ctaRef.current, badgesRef.current], { opacity: 0, y: 16 });
        const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
        tl.to(titleRef.current, { opacity: 1, y: 0, duration: 0.6 })
          .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
          .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6 }, '-=0.2')
          .to(badgesRef.current, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3');
    }, []);

    return (
        <section ref={rootRef} className="pt-10 md:pt-16">
            <div className="text-center mb-8 md:mb-12">
                <h1 ref={titleRef} className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-teal-500">
                    EcoVision
                </h1>
                <p ref={subtitleRef} className="text-lg md:text-xl text-gray-400 mt-2 max-w-3xl mx-auto">
                    Snap or upload a photo and let AI instantly classify waste as Recyclable, Non‑Recyclable, or Compostable so you can dispose responsibly.
                </p>
            </div>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={onUploadClick} className="group flex-1 sm:flex-none bg-teal-600 hover:bg-teal-500 active:bg-teal-700 transition-colors duration-200 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-3 text-lg shadow-lg hover:shadow-teal-700/20">
                    <UploadIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    Upload Image
                </button>
                <button onClick={onCameraClick} className="group flex-1 sm:flex-none bg-green-600 hover:bg-green-500 active:bg-green-700 transition-colors duration-200 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-3 text-lg shadow-lg hover:shadow-green-700/20">
                    <CameraIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    Use Camera
                </button>
            </div>

            <div ref={badgesRef} className="mt-8 flex items-center justify-center gap-3 text-sm text-gray-400">
                <span className="inline-flex items-center gap-2 bg-gray-800/60 border border-gray-700 rounded-full px-3 py-1 hover:bg-gray-800 transition-colors">
                    <RecycleIcon className="w-4 h-4 text-blue-400" /> Recyclable
                </span>
                <span className="inline-flex items-center gap-2 bg-gray-800/60 border border-gray-700 rounded-full px-3 py-1 hover:bg-gray-800 transition-colors">
                    <CompostIcon className="w-4 h-4 text-green-400" /> Compostable
                </span>
                <span className="inline-flex items-center gap-2 bg-gray-800/60 border border-gray-700 rounded-full px-3 py-1 hover:bg-gray-800 transition-colors">
                    <TrashIcon className="w-4 h-4 text-gray-300" /> Non‑Recyclable
                </span>
            </div>
        </section>
    );
};

export default HomeHero;


