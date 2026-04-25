import { CheckCircle } from 'lucide-react';

const StepIndicator = ({ step, current }: { step: number, current: number }) => {
    const isCompleted = current > step;
    const isActive = current === step;
    return (
        <div className={`flex items-center gap-2 ${isActive ? 'text-blue-600 font-bold' : isCompleted ? 'text-green-600' : 'text-slate-300'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${isActive ? 'border-blue-600 bg-blue-50' : isCompleted ? 'border-green-600 bg-green-50' : 'border-slate-300'}`}>
                {isCompleted ? <CheckCircle className="w-5 h-5" /> : step + 1}
            </div>
            <div className="hidden md:block text-sm">Fase {step + 1}</div>
        </div>
    );
};

export default StepIndicator;
