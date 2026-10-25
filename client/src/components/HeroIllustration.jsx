import React from 'react';
import { CheckCircle2, User } from 'lucide-react';
import { GoogleLogo } from './GdgLogo';

export default function HeroIllustration() {
  return (
    <div className="relative w-full max-w-md lg:max-w-lg mx-auto aspect-4/3 flex items-center justify-center select-none">
      {/* Decorative Spark Lines around Laptop (matching reference image) */}
      <div className="absolute top-4 left-10 w-4 h-1 bg-[#FBBC05] rounded-full -rotate-45" />
      <div className="absolute top-14 left-4 w-5 h-1 bg-[#4285F4] rounded-full rotate-12" />
      <div className="absolute bottom-8 left-8 w-6 h-1 bg-[#FBBC05] rounded-full rotate-45" />
      <div className="absolute top-6 right-8 w-5 h-1 bg-white/70 rounded-full rotate-45" />
      <div className="absolute top-12 right-2 w-4 h-1 bg-[#4285F4] rounded-full -rotate-30" />
      <div className="absolute bottom-16 right-4 w-6 h-1 bg-[#FBBC05] rounded-full -rotate-15" />
      <div className="absolute bottom-10 right-10 w-4 h-1 bg-[#EA4335] rounded-full rotate-30" />

      {/* Floating Badge on top right of laptop: "Learn Build Grow" */}
      <div className="absolute -top-1 sm:top-2 right-4 sm:right-6 z-20 bg-white rounded-2xl p-2.5 sm:p-3 px-3.5 sm:px-4 shadow-xl border border-slate-100 flex flex-col items-center justify-center animate-pulse-subtle">
        <span className="text-xs sm:text-sm font-extrabold text-[#1a73e8] leading-tight">
          Learn
        </span>
        <span className="text-xs sm:text-sm font-extrabold text-[#1a73e8] leading-tight">
          Build
        </span>
        <span className="text-xs sm:text-sm font-extrabold text-[#1a73e8] leading-tight">
          Grow
        </span>
      </div>

      {/* Laptop Device Mockup */}
      <div className="relative z-10 w-[88%] sm:w-[84%]">
        {/* Screen Bezel */}
        <div className="bg-[#1967d2] p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl shadow-2xl border-2 border-[#4285f4]/50">
          {/* Inner Display (White card showing Google Skills Profile) */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 relative overflow-hidden aspect-16/10 flex flex-col justify-between shadow-inner">
            {/* Screen Header: Google Skills */}
            <div className="flex items-center space-x-1.5 pb-3 border-b border-slate-100">
              <GoogleLogo className="h-4 sm:h-5 w-auto" />
              <span className="font-semibold text-slate-700 text-xs sm:text-sm tracking-tight">
                Skills
              </span>
            </div>

            {/* Profile Content Mockup */}
            <div className="my-auto py-2 flex items-center space-x-3.5">
              {/* User Avatar */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#e8f0fe] flex items-center justify-center text-[#1a73e8] shrink-0 border-2 border-white shadow-xs">
                <User className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>

              {/* Skeleton Lines & Verified Checkmark */}
              <div className="flex-1 space-y-2">
                <div className="w-3/4 h-2.5 bg-slate-200 rounded-full" />
                <div className="w-1/2 h-2 bg-slate-100 rounded-full" />
                
                {/* Verified Skill Badge Tag */}
                <div className="pt-1 flex items-center space-x-1.5 text-emerald-600">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-2xs">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div className="w-16 h-2 bg-slate-200 rounded-full" />
                </div>
              </div>
            </div>

            {/* Bottom Screen Bar */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-100">
              <div className="w-14 h-1.5 bg-slate-200 rounded-full" />
              <div className="w-8 h-1.5 bg-blue-300 rounded-full" />
            </div>
          </div>
        </div>

        {/* Laptop Base */}
        <div className="relative -mt-1 mx-auto w-[112%] -left-[6%] h-3.5 sm:h-4 bg-[#1557b0] rounded-b-xl sm:rounded-b-2xl shadow-lg flex justify-center items-center">
          <div className="w-16 sm:w-20 h-1 bg-[#1a73e8] rounded-full" />
        </div>
      </div>
    </div>
  );
}
