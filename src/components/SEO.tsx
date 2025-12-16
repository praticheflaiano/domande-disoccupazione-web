import React, { useEffect } from 'react';

import SchemaMarkup from './SchemaMarkup';

interface SEOProps {
    title: string;
    description: string;
}

const SEO: React.FC<SEOProps> = ({ title, description }) => {
    useEffect(() => {
        document.title = `${title} | Centro Pratiche Flaiano`;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', description);
        } else {
            const meta = document.createElement('meta');
            meta.name = "description";
            meta.content = description;
            document.head.appendChild(meta);
        }
    }, [title, description]);

    return <SchemaMarkup />;
};

export default SEO;
