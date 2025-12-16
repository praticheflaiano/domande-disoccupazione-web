import React from 'react';

const SchemaMarkup: React.FC = () => {
    const schemas = [
        // Organization / Government Service Schema
        {
            "@context": "https://schema.org",
            "@type": "GovernmentService",
            "name": "Richiesta NASpI Online - Centro Flaiano",
            "serviceType": "Unemployment Benefits",
            "provider": {
                "@type": "Organization",
                "name": "Centro Pratiche Flaiano"
            },
            "areaServed": "IT",
            "description": "Portale per il calcolo, la richiesta e la gestione della Nuova Assicurazione Sociale per l'Impiego (NASpI)."
        },
        // FAQ Schema for AI
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "Posso lavorare mentre prendo la NASpI?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Sì, è possibile lavorare mantenendo la NASpI se il reddito annuo non supera gli 8.500€ per lavoro subordinato o 5.500€ per lavoro autonomo. È necessario comunicare il reddito presunto all'INPS."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Quando decade la NASpI?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "La NASpI decade se si perde lo stato di disoccupazione, se si inizia un'attività autonoma senza comunicarlo, o se si raggiungono i requisiti per la pensione."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Come funziona il decalage del 3%?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "L'importo della NASpI si riduce del 3% ogni mese a partire dal 6° mese di fruizione. Per chi ha più di 55 anni, la riduzione parte dall'8° mese."
                    }
                }
            ]
        }
    ];

    return (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />
    );
};

export default SchemaMarkup;
