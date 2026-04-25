import { Info } from 'lucide-react';

const InfoCard = ({ title, desc }: { title: string, desc: string }) => (
    <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl mb-4 text-sm">
        <h4 className="font-bold text-blue-900 flex items-center gap-2 mb-1"><Info className="w-4 h-4" /> {title}</h4>
        <p className="text-blue-800 opacity-90">{desc}</p>
    </div>
);

export default InfoCard;
