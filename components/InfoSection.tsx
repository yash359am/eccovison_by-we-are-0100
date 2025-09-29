import React, { useEffect, useRef } from 'react';
import { RecycleIcon, TrashIcon, CompostIcon } from './icons';

const InfoCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 h-full">
        <div className="flex items-center gap-4 mb-3">
            <div className="bg-gray-700 p-2 rounded-full">{icon}</div>
            <h3 className="text-xl font-bold text-green-400">{title}</h3>
        </div>
        <p className="text-gray-400">{children}</p>
    </div>
);

const InfoSection: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const gsap = (window as any).gsap as any;
        const ScrollTrigger = (window as any).ScrollTrigger as any;
        if (!gsap || !ScrollTrigger || !sectionRef.current) return;
        gsap.registerPlugin(ScrollTrigger);

        const cards = sectionRef.current.querySelectorAll('[data-infocard]');
        gsap.fromTo(
            sectionRef.current.querySelector('h2'),
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%'
                }
            }
        );
        cards.forEach((card, idx) => {
            gsap.fromTo(
                card,
                { opacity: 0, y: 24 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: 'power2.out',
                    delay: idx * 0.08,
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%'
                    }
                }
            );
        });
    }, []);

    return (
        <section ref={sectionRef} className="mt-16 md:mt-24">
            <h2 className="text-3xl font-bold text-center mb-8">How Sorting Waste Helps Our Planet</h2>
            <div className="grid md:grid-cols-3 gap-6">
                <div data-infocard>
                    <InfoCard icon={<RecycleIcon className="w-6 h-6 text-blue-400" />} title="Conserves Resources">
                        Recycling materials like paper, plastic, and metal reduces the need to extract new raw materials, saving energy and preserving natural habitats.
                    </InfoCard>
                </div>
                <div data-infocard>
                    <InfoCard icon={<CompostIcon className="w-6 h-6 text-green-400" />} title="Reduces Landfill Waste">
                        Composting organic matter diverts a significant amount of waste from landfills, where it would otherwise produce methane, a potent greenhouse gas.
                    </InfoCard>
                </div>
                <div data-infocard>
                    <InfoCard icon={<TrashIcon className="w-6 h-6 text-gray-400" />} title="Prevents Pollution">
                        Properly disposing of non-recyclables ensures hazardous materials are managed safely, preventing soil and water contamination.
                    </InfoCard>
                </div>
            </div>
        </section>
    );
};

export default InfoSection;