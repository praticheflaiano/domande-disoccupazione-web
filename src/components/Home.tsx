import React from 'react';
import HomeHero from './home/HomeHero';
import StatsBar from './home/StatsBar';
import RequisitiSection from './home/RequisitiSection';
import CalcoloSection from './home/CalcoloSection';
import CompareSection from './home/CompareSection';
import HowToApplySection from './home/HowToApplySection';

const Home: React.FC = () => {
    return (
        <div className="space-y-12 pb-12">
            <HomeHero />
            <StatsBar />
            <RequisitiSection />
            <CalcoloSection />
            <CompareSection />
            <HowToApplySection />
        </div>
    );
};
export default Home;
