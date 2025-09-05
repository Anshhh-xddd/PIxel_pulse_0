import React from 'react';

const PersonalPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-orange-500/5" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black" />

      <main className="relative z-10 pt-24 md:pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 text-center space-y-6">
          <h1 className="text-white text-3xl md:text-4xl font-extrabold">Personal Page</h1>
          <p className="text-gray-300 max-w-prose mx-auto">
            This page is under construction. Soon you will be able to view personal projects, achievements, and experiences here.
          </p>
          <a href="/" className="inline-block mt-8 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-black font-semibold rounded-lg shadow-lg hover:shadow-orange-500/30 transition">
            ← Back to Home
          </a>
        </div>
      </main>
    </div>
  );
};

export default PersonalPage;