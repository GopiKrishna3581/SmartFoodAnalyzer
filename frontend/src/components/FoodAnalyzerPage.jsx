import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MoveDown, SmilePlus } from 'lucide-react';
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
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 md:px-8 space-y-6 md:space-y-8">
        {/* Main Title - Made more responsive */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-bold tracking-wider flex items-center justify-center font-['Comic_Sans_MS']">
              SMART F
              <SmilePlus className="mx-1 w-6 h-6 sm:w-7 sm:h-7 md:w-10 md:h-10 lg:w-12 lg:h-12" />
              <SmilePlus className="mx-1 w-6 h-6 sm:w-7 sm:h-7 md:w-10 md:h-10 lg:w-12 lg:h-12" />
              D PRODUCT
            </h1>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-bold tracking-wider mt-2 font-['Comic_Sans_MS']">
            ANALYZER
          </h1>
        </div>

        {/* Subtitle - Better text scaling */}
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white italic font-['Satisfy']">
          Your Health is Our mission, Your Safety is Our Promise
        </p>

        {/* Tagline - Better text scaling */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white font-['Pacifico'] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto">
          Why guess what's in your food when we can spill the beans?
        </p>

        {/* Button - Improved mobile tap target */}
        <div className="mt-6 md:mt-8">
          <button 
            className="bg-black bg-opacity-50 text-orange-500 font-['Satisfy'] py-3 px-6 rounded-full hover:bg-opacity-70 transition-all duration-300 text-base sm:text-lg shadow-lg"
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