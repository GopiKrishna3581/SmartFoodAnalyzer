import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MoveDown, SmilePlus } from 'lucide-react';
import bgImage from './bg.jpg';

const FoodAnalyzerPage = () => {
    const navigate = useNavigate()
  return (
    <div 
      className="min-h-screen w-full bg-cover  bg-center bg-no-repeat relative"
      style={{ 
        backgroundImage: `url(${bgImage})`  // ✅ Correct way
      }}
    >
      {/* Dark overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-30 bg-cover bg-center"></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 md:px-8 space-y-8">
        {/* Main Title */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <h1 className="text-4xl md:text-6xl text-white font-bold tracking-wider flex items-center justify-center font-['Comic_Sans_MS']">
              SMART F
              <SmilePlus className="mx-1 w-8 h-8 md:w-12 md:h-12" />
              <SmilePlus className="mx-1 w-8 h-8 md:w-12 md:h-12" />
              D PRODUCT
            </h1>
          </div>
          
          <h1 className="text-4xl md:text-6xl text-white font-bold tracking-wider mt-2 font-['Comic_Sans_MS']">
            ANALYZER
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-white italic font-['Satisfy']">
          Your Health is Our mission, Your Safety is Our Promise
        </p>

        {/* Tagline */}
        <p className="text-xl md:text-2xl text-white font-['Pacifico']">
        Why guess whats in your food when we can spill the beans?
        </p>

        {/* Button */}
        <div className="mt-8">
          <button className="bg-black bg-opacity-50 text-orange-500 font-['Satisfy'] py-3 px-3 rounded-full hover:bg-opacity-70 transition-all duration-300 text-lg"
          
          onClick={() => { navigate('/home')}}
          >
            Decode Your Diet
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodAnalyzerPage;