export interface ChatMessage { role: 'user' | 'model'; text: string; }

const API_ENDPOINT = '/api/chat';

export const sendChatMessage = async (history: ChatMessage[], newMessage: string): Promise<string> => {
    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ history, message: newMessage }),
        });

        if (!response.ok) {
            const err = await response.json().catch(() => ({ error: 'Errore di rete.' }));
            return err.error || 'Errore momentaneo. Riprova.';
        }

        const data = await response.json() as { reply: string };
        return data.reply || 'Errore. Riprova.';
    } catch (error) {
        console.error('chatService error:', error);
        return 'Errore momentaneo. [Scrivici su WhatsApp](https://wa.me/393716230690)';
    }
};
