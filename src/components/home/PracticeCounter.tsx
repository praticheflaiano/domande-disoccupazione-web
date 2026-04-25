import React, { useState } from 'react';

const PracticeCounter: React.FC = () => {
    const [count] = useState(1843);
    return <span className="font-mono">{count.toLocaleString('it-IT')}</span>;
};

export default PracticeCounter;
