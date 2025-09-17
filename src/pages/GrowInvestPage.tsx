import React from 'react';
import GrowInvestDesktop from '../components/growInvest/GrowInvestDesktop';
import GrowInvestMobile from '../components/growInvest/GrowInvestMobile';

const GrowInvestPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-slate-950 font-inter text-slate-100">
      <div className="lg:hidden">
        <GrowInvestMobile />
      </div>
      <div className="hidden lg:block">
        <GrowInvestDesktop />
      </div>
    </main>
  );
};

export default GrowInvestPage;
