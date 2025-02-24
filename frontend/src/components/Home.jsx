import React, { useState, useEffect } from 'react';
import ImageUpload from './ImageUpload';
import NutritionTable from './NutritionTable';
import DietaryPanel from './DietaryPanel';
import ThemeToggle from './ThemeToggle';
import { Microscope, Sparkles } from 'lucide-react';
import FoodAnalyzerPage from './FoodAnalyzerPage';

function Home() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  const [activeSection, setActiveSection] = useState('upload');
  const [apiResponse, setApiResponse] = useState(null); // State to store API response

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Automatically navigate to the "nutrition" section when API response is received
  useEffect(() => {
    if (apiResponse) {
      setActiveSection('nutrition');
      console.log(apiResponse) // Navigate to the "nutrition" section
    }
  }, [apiResponse]);

  return (
    <div id='main-content' className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />

      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="relative">
              <Microscope className="w-12 h-12 text-blue-500" />
              <Sparkles className="w-5 h-5 text-yellow-400 absolute -top-2 -right-2 animate-pulse" />
            </div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Smart Food Product Analyzer
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Get instant analysis of ingredients, nutrition facts, and dietary recommendations
          </p>
        </header>
        <nav className="mb-12">
          <div className="flex justify-center space-x-4 p-1 bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-md mx-auto">
            {['upload', 'nutrition', 'dietary'].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-6 py-2 rounded-md transition-all duration-200 ${
                  activeSection === section
                    ? 'bg-blue-500 text-white shadow-lg scale-105'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
        </nav>
        <div className="max-w-4xl mx-auto">
          {/* Upload Section */}
          <div className={`transition-all duration-300 ${activeSection === 'upload' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full absolute'}`}>
            <section className={activeSection === 'upload' ? 'block' : 'hidden'}>
              <ImageUpload onResponse={setApiResponse} /> {/* Pass the setApiResponse function */}
            </section>
          </div>

          {/* Nutrition Section */}
          <div className={`transition-all duration-300 ${activeSection === 'nutrition' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full absolute'}`}>
            <section className={activeSection === 'nutrition' ? 'block' : 'hidden'}>
              <NutritionTable data={apiResponse} /> {/* Pass the API response as props */}
            </section>
          </div>

          {/* Dietary Section */}
          <div className={`transition-all duration-300 ${activeSection === 'dietary' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full absolute'}`}>
            <section className={activeSection === 'dietary' ? 'block' : 'hidden'}>
              <DietaryPanel  data={apiResponse}/>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;