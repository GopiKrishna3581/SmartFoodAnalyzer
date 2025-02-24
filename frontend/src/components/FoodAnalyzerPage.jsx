import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SmilePlus } from 'lucide-react';
import bgImage from './bg.jpg';

const FoodAnalyzerPage = () => {
  const navigate = useNavigate();
  
  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative"
      style={{ 
        backgroundImage: `url(${bgImage})`
      }}
    >
      {/* Dark overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40 bg-cover bg-center"></div>
      
      {/* MOBILE LAYOUT - Only visible on small screens */}
      <div className="relative z-10 flex flex-col items-center justify-between min-h-screen text-center px-4 py-20 md:hidden">
        {/* Top content container */}
        <div className="w-full flex flex-col items-center space-y-6 pt-10">
          {/* Main Title - Fixed for mobile */}
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold tracking-wider font-['Comic_Sans_MS'] text-white">
              <span className="block mb-1">SMART</span>
              <div className="flex items-center justify-center my-1">
                <span>F</span>
                <SmilePlus className="mx-1 w-6 h-6" />
                <SmilePlus className="mx-1 w-6 h-6" />
                <span>D</span>
              </div>
              <span className="block mb-2">PRODUCT</span>
            </div>
            
            <h1 className="text-3xl text-white font-bold tracking-wider mt-2 font-['Comic_Sans_MS']">
              ANALYZER
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-lg text-white italic font-['Satisfy']">
            Your Health is Our mission, Your Safety is Our Promise
          </p>

          {/* Tagline */}
          <p className="text-base text-white font-['Pacifico'] max-w-xs mx-auto">
            Why guess what's in your food when we can spill the beans?
          </p>
        </div>

        {/* Bottom button container - Push to bottom */}
        <div className="mt-auto mb-16">
          <button 
            className="bg-black bg-opacity-60 text-orange-500 font-['Satisfy'] py-3 px-8 rounded-full hover:bg-opacity-70 transition-all duration-300 text-xl shadow-lg"
            onClick={() => { navigate('/home') }}
          >
            Decode Your Diet
          </button>
        </div>
      </div>

      {/* DESKTOP LAYOUT - Hidden on small screens, visible on md and up */}
      <div className="relative z-10 hidden md:flex flex-col items-center justify-center min-h-screen text-center px-8 space-y-8">
        {/* Main Title */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <h1 className="text-5xl lg:text-6xl text-white font-bold tracking-wider flex items-center justify-center font-['Comic_Sans_MS']">
              SMART F
              <SmilePlus className="mx-1 w-10 h-10 lg:w-12 lg:h-12" />
              <SmilePlus className="mx-1 w-10 h-10 lg:w-12 lg:h-12" />
              D PRODUCT
            </h1>
          </div>
          
          <h1 className="text-5xl lg:text-6xl text-white font-bold tracking-wider mt-2 font-['Comic_Sans_MS']">
            ANALYZER
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-2xl lg:text-3xl text-white italic font-['Satisfy']">
          Your Health is Our mission, Your Safety is Our Promise
        </p>

        {/* Tagline */}
        <p className="text-xl lg:text-2xl text-white font-['Pacifico']">
          Why guess what's in your food when we can spill the beans?
        </p>

        {/* Button */}
        <div className="mt-8">
          <button 
            className="bg-black bg-opacity-50 text-orange-500 font-['Satisfy'] py-3 px-6 rounded-full hover:bg-opacity-70 transition-all duration-300 text-lg"
            onClick={() => { navigate('/home') }}
          >
            Decode Your Diet
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodAnalyzerPage;