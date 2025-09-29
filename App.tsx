 import React, { useEffect, useRef } from 'react';
import WasteClassifier from './components/WasteClassifier';
import InfoSection from './components/InfoSection';
import HomeHero from './components/HomeHero';
import MoreContent from './components/MoreContent';

const App: React.FC = () => {
    const headerRef = useRef<HTMLHeadingElement>(null);
    const subRef = useRef<HTMLParagraphElement>(null);
    const mainRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const gsap = (window as any).gsap as any;
        if (!gsap) return;
        gsap.set([headerRef.current, subRef.current, mainRef.current], { opacity: 0, y: 16 });
        const tl = gsap.timeline();
        tl.to(headerRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
          .to(subRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
          .to(mainRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.2');
    }, []);

    return (
        <div className="bg-gray-900 text-white min-h-screen font-sans antialiased">
            <main ref={mainRef} className="container mx-auto px-4 py-8 md:py-12">
                <header className="text-center mb-8 md:mb-12">
                    <h1 ref={headerRef} className="sr-only">EcoVision</h1>
                    <p ref={subRef} className="sr-only">Your AI-Powered Guide to Sustainable Waste Disposal</p>
                </header>
                <HomeHero onUploadClick={() => document.querySelector<HTMLInputElement>('input[type="file"]')?.click()} onCameraClick={() => (document.querySelector('button[data-open-camera]') as HTMLButtonElement)?.click()} />
                <div className="mt-10">
                    <WasteClassifier hideCtas />
                </div>
                <InfoSection />
                <MoreContent />
            </main>
            <footer className="text-center py-6 text-gray-500 text-sm border-t border-gray-800">
                <p>&copy; {new Date().getFullYear()} EcoVision. Helping build a cleaner planet.</p>
            </footer>
        </div>
    );
};

export default App;