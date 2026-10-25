import React from 'react';
import { GoogleLogo, GdgBrackets } from './GdgLogo';

function InfoIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  );
}

export default function Navbar({ onAboutClick }) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">

          {/* Left: Google Logo + Title */}
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
            <GoogleLogo className="h-5 sm:h-6 md:h-7 w-auto shrink-0" />
            <div className="flex items-center space-x-1.5 sm:space-x-2 min-w-0">
              <span className="hidden xs:block text-sm sm:text-base md:text-lg font-semibold text-slate-500 tracking-tight truncate">
                Learn with Communities
              </span>
              <span className="hidden sm:block text-slate-300 font-light text-lg">|</span>
              <span className="text-sm sm:text-base md:text-lg font-bold text-slate-900 tracking-tight truncate">
                Progress Checker
              </span>
            </div>
          </div>

          {/* Right: GDG badge + About */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">

            {/* Built by — hidden on small screens */}
            <div className="hidden lg:flex flex-col text-right">
              <span className="text-xs text-slate-400 font-medium">Built by</span>
              <a
                href="https://www.linkedin.com/in/shreyansh-dubey-266317329"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-slate-900 leading-tight hover:text-blue-600 transition-colors"
              >
                Shreyansh Dubey
              </a>
            </div>
            <span className="hidden lg:block text-slate-300 font-light text-lg">|</span>

            {/* GDG DCRUST badge */}
            <div className="flex items-center space-x-1.5 py-1 px-2 sm:px-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <GdgBrackets className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
              <div className="flex flex-col text-left">
                <span className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight leading-none">
                  GDG DCRUST
                </span>
                <span className="font-semibold text-slate-400 leading-tight" style={{ fontSize: '10px' }}>on Campus</span>
              </div>
            </div>

            {/* About button */}
            <button
              onClick={onAboutClick}
              className="flex items-center space-x-1 py-1.5 px-2.5 sm:px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors font-semibold text-sm"
              title="About this program"
            >
              <InfoIcon className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline text-xs sm:text-sm">About</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
