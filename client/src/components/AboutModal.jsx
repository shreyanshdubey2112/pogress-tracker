import React from 'react';

function XIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function WhatsAppIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M11.999 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2.032 22l4.948-1.393A9.953 9.953 0 0 0 12 22c5.523 0 10-4.477 10-10S17.522 2 12 2zm0 18a7.946 7.946 0 0 1-4.338-1.28l-.31-.19-3.228.908.924-3.143-.202-.322A7.954 7.954 0 0 1 4 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8z" />
    </svg>
  );
}

function LinkIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function ChevronRight({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

export default function AboutModal({ onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      style={{ backgroundColor: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      {/* Modal — bottom sheet on mobile, centred card on sm+ */}
      <div
        className="bg-white w-full sm:max-w-lg sm:mx-4 sm:rounded-2xl rounded-t-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90dvh] sm:max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3.5 sm:px-6 sm:py-5 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-white font-bold text-base sm:text-lg leading-tight">Google Learn with Communities</h2>
            <p className="text-blue-200 text-xs mt-0.5">GDG on Campus · DCRUST Murthal</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors shrink-0 ml-3"
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>

        {/* ── Scrollable body ── */}
        <div className="overflow-y-auto flex-1 px-4 py-4 sm:px-6 sm:py-5 space-y-4">

          {/* About */}
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">About the Program</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              <strong>Google Learn with Communities</strong> is a structured learning initiative by GDG where participants complete curated Google Cloud skill badges to earn goodies and recognition.
            </p>
            <div className="mt-2.5 space-y-1.5">
              <div className="flex items-start space-x-2 text-xs sm:text-sm text-slate-600">
                <span className="shrink-0">🎯</span>
                <span>Complete <strong>5 badges</strong> → Earn a <strong>Google Water Bottle</strong></span>
              </div>
              <div className="flex items-start space-x-2 text-xs sm:text-sm text-slate-600">
                <span className="shrink-0">🏆</span>
                <span>Complete <strong>all 10 badges</strong> → Earn a <strong>T-Shirt + Goodies Box</strong></span>
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* How to use */}
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">How to Use</h3>
            <ol className="space-y-1 text-xs sm:text-sm text-slate-600 list-decimal list-inside">
              <li>Visit your <a href="https://www.cloudskillsboost.google/" target="_blank" rel="noreferrer" className="text-blue-600 font-medium hover:underline">Google Cloud Skills Boost</a> profile</li>
              <li>Copy your public profile URL</li>
              <li>Paste it and click <strong>"Check Progress"</strong></li>
              <li>See which of the 10 required badges you've earned</li>
            </ol>
          </div>

          <hr className="border-slate-100" />

          {/* Links */}
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">Get in Touch</h3>
            <div className="space-y-2">
              {/* WhatsApp */}
              <a
                href="https://chat.whatsapp.com/JHDLFzljaHIF7Zn2z422V3?s=cl&p=a&mlu=4&ilr=4"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-3 p-2.5 sm:p-3 rounded-xl bg-green-50 hover:bg-green-100 border border-green-100 transition-colors group"
              >
                <WhatsAppIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-green-700 transition-colors">Join WhatsApp Group</p>
                  <p className="text-xs text-slate-500">GDG DCRUST · Learn with Communities</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
              </a>

              {/* Register */}
              <a
                href="https://hack2skill-dot-yamm-track.appspot.com/2dqis2ZXvXFBIDK9uTf5d1CULCaPxyoF5wB2gacPSsu1QzE33oAFEkMdYDOWxusu07mDkIzHQPBtuvbq0Ld_Myqc6HDDqUR17IMQ3QFCU34J8yMAW8fHKCN5py6GzJp6bfHXcmm3uhs0V-8omFsh4wouw_CPqbMy38-MV9vS1DNeSlEEzPtKxEGhJtbdzfmGdzFc"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-3 p-2.5 sm:p-3 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-100 transition-colors group"
              >
                <LinkIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-blue-700 transition-colors">Register Now</p>
                  <p className="text-xs text-slate-500">Open the registration form</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
              </a>

              {/* Referral code */}
              <div className="flex items-center space-x-3 p-2.5 sm:p-3 rounded-xl bg-amber-50 border border-amber-100">
                <span className="text-base shrink-0">🎟️</span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-semibold text-slate-800">Referral Code</p>
                  <p className="text-xs text-slate-500">Use during registration</p>
                </div>
                <span className="font-mono font-bold text-xs sm:text-sm text-amber-700 bg-amber-100 px-2.5 py-1 rounded-lg tracking-wider shrink-0">
                  GDGC-DCRUS
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="px-4 py-3 sm:px-6 sm:py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
          <p className="text-xs text-slate-400">
            Built by <span className="font-semibold text-slate-600">Shreyansh Dubey</span> · GDG DCRUST
          </p>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-700 transition-colors"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
}
