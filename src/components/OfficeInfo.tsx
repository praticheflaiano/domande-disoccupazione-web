import React, { useEffect } from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';

const OfficeInfo: React.FC = () => {
    useEffect(() => {
        const scriptUrl = "https://link.arcanis.it/js/form_embed.js";
        if (!document.querySelector(`script[src="${scriptUrl}"]`)) {
            const script = document.createElement('script');
            script.src = scriptUrl;
            document.body.appendChild(script);
        }
    }, []);

    return (
        <div className="animate-in fade-in duration-500 pb-12">
            <title>Chi Siamo | Centro Flaiano</title>
            <div className="bg-slate-900 text-white py-16 px-4 text-center">
                <h1 className="text-3xl font-bold mb-6">Centro Pratiche Flaiano</h1>
            </div>
            <div className="max-w-6xl mx-auto px-4 -mt-10 relative z-10 grid md:grid-cols-3 gap-6 mb-16">
                <div className="bg-white p-6 rounded shadow border-t-4 border-blue-600"><MapPin /> Via Filoteo Alberini, 25 Roma</div>
                <div className="bg-white p-6 rounded shadow border-t-4 border-green-600"><Phone /> 06 9784 5429</div>
                <div className="bg-white p-6 rounded shadow border-t-4 border-purple-600">
                    <div className="flex items-center gap-2 font-bold mb-2"><Clock /> Orari</div>
                    <div className="text-sm">
                        <div>L-G: 9:30-13:00 / 15:30-18:00</div>
                        <div>Ven: 9:30-14:00</div>
                    </div>
                </div>
            </div>
            <div className="max-w-6xl mx-auto px-4 flex flex-col lg:flex-row gap-12">
                <div className="flex-1 bg-white rounded-2xl overflow-hidden shadow border min-h-[600px]">
                    <iframe src="https://link.arcanis.it/widget/group/bklXY9sZUszt8V2GpkU1" style={{ width: '100%', border: 'none', overflow: 'hidden', minHeight: '600px' }} scrolling="no" id="bklXY9sZUszt8V2GpkU1_1764775911716" title="Prenotazioni"></iframe>
                </div>
            </div>
        </div>
    );
};
export default OfficeInfo;
