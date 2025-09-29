import React, { useEffect, useRef } from 'react';
import { LightningIcon, ShieldCheckIcon, GlobeIcon, SparklesIcon } from './icons';

const MoreContent: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const gsap = (window as any).gsap as any;
        const ScrollTrigger = (window as any).ScrollTrigger as any;
        if (!gsap || !ScrollTrigger || !sectionRef.current) return;
        gsap.registerPlugin(ScrollTrigger);

        const rows = sectionRef.current.querySelectorAll('[data-row]');
        rows.forEach((row: Element) => {
            gsap.fromTo(
                row,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: 'power2.out',
                    scrollTrigger: { trigger: row, start: 'top 85%' }
                }
            );
        });
    }, []);

    return (
        <section ref={sectionRef} className="mt-20 md:mt-28">
            <h2 className="text-3xl font-bold text-center mb-10">Why EcoVision?</h2>
            <div data-row className="grid md:grid-cols-4 gap-6">
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-teal-600 transition-colors">
                    <div className="flex items-center gap-3 mb-2 text-teal-400"><LightningIcon /> Instant Results</div>
                    <p className="text-gray-400">AI classifies images in seconds so you can act quickly and responsibly.</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-teal-600 transition-colors">
                    <div className="flex items-center gap-3 mb-2 text-green-400"><ShieldCheckIcon /> Privacy First</div>
                    <p className="text-gray-400">Images are processed securely with your key; nothing is shared publicly.</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-teal-600 transition-colors">
                    <div className="flex items-center gap-3 mb-2 text-blue-400"><GlobeIcon /> Eco Impact</div>
                    <p className="text-gray-400">Correct sorting reduces landfill waste and conserves resources globally.</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-teal-600 transition-colors">
                    <div className="flex items-center gap-3 mb-2 text-amber-300"><SparklesIcon /> Simple & Fun</div>
                    <p className="text-gray-400">Clean design, smooth animations, and clear guidance for every item.</p>
                </div>
            </div>

            <h3 className="text-2xl font-semibold mt-14 mb-6 text-center">How It Works</h3>
            <ol data-row className="grid md:grid-cols-3 gap-6 list-decimal list-inside text-gray-300">
                <li className="bg-gray-800 p-6 rounded-lg border border-gray-700">Upload or capture a photo of the waste item.</li>
                <li className="bg-gray-800 p-6 rounded-lg border border-gray-700">EcoVision analyzes the image with AI.</li>
                <li className="bg-gray-800 p-6 rounded-lg border border-gray-700">Follow the recommendation to dispose responsibly.</li>
            </ol>

            <h3 className="text-2xl font-semibold mt-14 mb-6 text-center">FAQ</h3>
            <div data-row className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                    <p className="font-semibold text-white">Is the classification always correct?</p>
                    <p className="text-gray-400 mt-2">Results are best-effort. When unsure, we suggest the safest option and a reason.</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                    <p className="font-semibold text-white">Does it work offline?</p>
                    <p className="text-gray-400 mt-2">No, it requires an internet connection to query the AI model.</p>
                </div>
            </div>
        </section>
    );
};

export default MoreContent;


