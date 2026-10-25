import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import Navbar from './components/Navbar';
import ProfileInput from './components/ProfileInput';
import MilestoneCards from './components/MilestoneCards';
import RewardsBanner from './components/RewardsBanner';
import BadgesList from './components/BadgesList';
import AboutModal from './components/AboutModal';
import { GoogleLogo, GdgBrackets } from './components/GdgLogo';
import { InstagramIcon, LinkedinIcon } from './components/SocialIcons';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [fixedBadges, setFixedBadges] = useState([]);
  const [showAbout, setShowAbout] = useState(false);

  // Fetch fixed 10 badges on mount
  useEffect(() => {
    fetch('/api/badges')
      .then((res) => res.json())
      .then((data) => {
        if (data.badges) setFixedBadges(data.badges);
      })
      .catch((err) => console.error('Error fetching badges:', err));
  }, []);

  // Trigger celebration confetti based on milestone tier
  const triggerConfetti = (milestone2Unlocked, milestone1Unlocked) => {
    if (milestone2Unlocked) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 999 };

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
          return clearInterval(interval);
        }
        const particleCount = 50 * (timeLeft / duration);
        confetti({
          ...defaults,
          particleCount,
          origin: { x: 0.2, y: 0.6 },
          colors: ['#4285F4', '#EA4335', '#FBBC05', '#34A853']
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: 0.8, y: 0.6 },
          colors: ['#4285F4', '#EA4335', '#FBBC05', '#34A853']
        });
      }, 250);
    } else if (milestone1Unlocked) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#34A853', '#4285F4', '#FBBC05']
      });
    }
  };

  const handleCheckProfile = async (url) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/check-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profileUrl: url })
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || 'Failed to check profile');
      }

      setProfileData(json.data);

      // Trigger celebration if milestones reached
      if (json.data?.milestone2?.isCompleted) {
        triggerConfetti(true, true);
      } else if (json.data?.milestone1?.isCompleted) {
        triggerConfetti(false, true);
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col selection:bg-blue-100 selection:text-blue-900">
      {/* About Modal */}
      {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}

      {/* Top Navigation */}
      <Navbar onAboutClick={() => setShowAbout(true)} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 md:py-10 space-y-5 sm:space-y-8 md:space-y-10">
        {/* 1. Hero Section: "Check Your Progress" with the Progress Section shifted into it */}
        <ProfileInput
          onCheckProfile={handleCheckProfile}
          loading={loading}
          error={error}
          profileData={profileData}
        />

        {/* 2. Milestones Section: Complete 5 Badges & Complete 10 Badges with Goodies */}
        <MilestoneCards
          milestone1={profileData?.milestone1 || { isCompleted: false, badgesRemaining: 5 }}
          milestone2={profileData?.milestone2 || { isCompleted: false, badgesRemaining: 10 }}
          completedCount={profileData ? profileData.completedCount : 0}
        />

        {/* 3. Your Rewards Section: Dark Navy Banner with Google Water Bottle & Goodies Box Cards */}
        <RewardsBanner />

        {/* 4. Fixed 10 Skill Badges Curriculum Checklist */}
        <BadgesList
          checklist={
            profileData
              ? profileData.checklist
              : fixedBadges.map((b) => ({
                  id: b.id,
                  requiredTitle: b.title,
                  category: b.type,
                  courseUrl: b.courseUrl,
                  credits: b.credits,
                  isCompleted: false
                }))
          }
        />
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-5 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">

          {/* Logo + title */}
          <div className="flex items-center space-x-2.5">
            <GoogleLogo className="h-5 sm:h-6 w-auto" />
            <span className="text-sm font-semibold text-slate-700 tracking-tight">
              Learn with Communities
            </span>
          </div>

          {/* Right section */}
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4 text-xs sm:text-sm text-slate-600 font-medium">

            {/* Social icons */}
            <div className="flex items-center space-x-2">
              <a
                href="https://www.instagram.com/gdg.dcrust/"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-pink-50 hover:bg-pink-100 text-pink-600 flex items-center justify-center transition-colors"
                title="GDG DCRUST Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/gdsc-dcrust/"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 flex items-center justify-center transition-colors"
                title="GDG DCRUST LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>

            <span className="hidden sm:block text-slate-300">|</span>

            {/* Built by */}
            <div className="flex items-center gap-1.5 flex-wrap justify-center">
              <span className="text-slate-500">Built by</span>
              <a
                href="https://www.linkedin.com/in/shreyansh-dubey-266317329"
                target="_blank"
                rel="noreferrer"
                className="font-bold text-slate-900 hover:text-blue-600 transition-colors"
              >
                Shreyansh Dubey
              </a>
              <span className="text-slate-300">|</span>
              <div className="flex items-center space-x-1 font-bold text-slate-900">
                <GdgBrackets className="w-4 h-4 shrink-0" />
                <span>GDG DCRUST</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
