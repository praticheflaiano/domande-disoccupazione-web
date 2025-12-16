import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { sendChatMessage } from '../services/chatService';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ChatBot: React.FC<any> = () => {
    const [open, setOpen] = useState(false);
    const [msgs, setMsgs] = useState([{ role: 'model', text: 'Ciao! Come posso aiutarti?' }]);
    const [input, setInput] = useState('');

    const send = async () => {
        if (!input) return;
        const newMsgs = [...msgs, { role: 'user', text: input }];
        // @ts-ignore
        setMsgs(newMsgs);
        setInput('');
        // @ts-ignore
        const res = await sendChatMessage(newMsgs, input);
        // @ts-ignore
        setMsgs([...newMsgs, { role: 'model', text: res }]);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {open && (
                <div className="bg-white w-80 h-96 rounded-xl shadow-2xl border mb-4 flex flex-col">
                    <div className="bg-slate-900 text-white p-3 flex justify-between rounded-t-xl"><span>Assistente</span><button onClick={() => setOpen(false)}><X /></button></div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-2">
                        {msgs.map((m, i) => <div key={i} className={`p-2 rounded ${m.role === 'user' ? 'bg-blue-100 ml-auto' : 'bg-slate-100'}`}>{m.text}</div>)}
                    </div>
                    <div className="p-2 border-t flex gap-2"><input value={input} onChange={e => setInput(e.target.value)} className="flex-1 border rounded p-1" /><button onClick={send}><Send /></button></div>
                </div>
            )}
            <button onClick={() => setOpen(!open)} className="bg-blue-600 text-white p-4 rounded-full shadow-lg"><MessageCircle /></button>
        </div>
    );
};
export default ChatBot;
