import React from 'react';
import { Award, Trophy, CheckCircle2, ShieldCheck, Gift, Sparkles } from 'lucide-react';

export default function MilestonesGuide() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
      <div className="flex items-center space-x-2 pb-4 border-b border-slate-100">
        <Sparkles className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-bold text-slate-900">Program Milestones & Goodies Overview</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Milestone 1 box */}
        <div className="p-5 rounded-2xl bg-linear-to-br from-emerald-50/50 to-white border border-emerald-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-emerald-800 font-bold text-sm">
              <Award className="w-5 h-5 text-emerald-600" />
              <span>Milestone 1 — 5 Skill Badges</span>
            </div>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Complete any 5 out of the 10 fixed curriculum skill badges to unlock Milestone 1.
            </p>
            <div className="mt-4 p-3 bg-white rounded-xl border border-emerald-100 flex items-center space-x-3">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                <img src="/goodies/google-bottle.jpg" alt="Google Bottle" className="w-full h-full object-cover" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-slate-900 block">Milestone 1 Goodie</span>
                <span className="text-emerald-700 font-medium">Official Google Water Bottle</span>
              </div>
            </div>
          </div>

          <div className="mt-4 inline-flex items-center space-x-1.5 text-xs text-emerald-800 font-semibold bg-emerald-100/70 px-3 py-1.5 rounded-xl border border-emerald-300 w-fit">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
            <span>Target: 5 Badges (50%)</span>
          </div>
        </div>

        {/* Milestone 2 box */}
        <div className="p-5 rounded-2xl bg-linear-to-br from-amber-50/50 to-white border border-amber-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-amber-900 font-bold text-sm">
              <Trophy className="w-5 h-5 text-amber-600" />
              <span>Milestone 2 — 10 Skill Badges (All Completed)</span>
            </div>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Complete all 10 fixed curriculum skill badges to unlock the ultimate Milestone 2!
            </p>
            <div className="mt-4 p-3 bg-white rounded-xl border border-amber-100 flex items-center space-x-3">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                <img src="/goodies/google-dev-kit.jpg" alt="Developers Kit" className="w-full h-full object-cover" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-slate-900 block">Milestone 2 Goodies</span>
                <span className="text-amber-800 font-medium">Google Developers Kit & Google T-Shirt</span>
              </div>
            </div>
          </div>

          <div className="mt-4 inline-flex items-center space-x-1.5 text-xs text-amber-900 font-semibold bg-amber-100/70 px-3 py-1.5 rounded-xl border border-amber-300 w-fit">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Ultimate Target: 10 Badges (100%)</span>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 rounded-xl bg-blue-50/60 border border-blue-100 flex items-start space-x-3 text-xs sm:text-sm text-slate-700">
        <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-blue-900">Live Profile Verification:</span>
          <p className="mt-0.5 text-slate-600">
            Paste your public Google Cloud Skills Boost profile link to verify your completed badges in real time. Badges earned on your public profile will automatically check off in your progress dashboard!
          </p>
        </div>
      </div>
    </div>
  );
}
