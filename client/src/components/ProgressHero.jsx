import React from 'react';
import { CheckCircle2, Trophy, ExternalLink, RefreshCw, Calendar, Sparkles } from 'lucide-react';

export default function ProgressHero({ data, onRefresh, loading }) {
  if (!data) return null;

  const {
    userName,
    profileUrl,
    avatarUrl,
    memberSince,
    completedCount,
    totalRequired,
    percentage,
    statusLevel,
    milestone1,
    milestone2,
    checkedAt
  } = data;

  const formattedDate = checkedAt
    ? new Date(checkedAt).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : '';

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-10 shadow-xs transition-colors overflow-hidden">
      {/* Top Google accent line */}
      <div className="-mt-6 sm:-mt-10 -mx-6 sm:-mx-10 mb-6 h-2 bg-linear-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC05] to-[#34A853]" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
        {/* User Info */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={userName}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-white dark:border-slate-700 shadow-md"
                onError={(e) => {
                  e.currentTarget.src = 'https://www.gstatic.com/devrel-devsite/prod/v52a23e9cb3de7a61d6fb1e6a17b6a6bbfe3e04e84cbef70139b854378f85f54d/cloud/images/favicons/onecloud/super_g.png';
                }}
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-md shadow-blue-500/20">
                {userName ? userName.charAt(0).toUpperCase() : 'G'}
              </div>
            )}
            {milestone2.isCompleted && (
              <span className="absolute -top-1.5 -right-1.5 bg-amber-400 text-amber-950 p-1 rounded-full shadow-xs">
                <Trophy className="w-4 h-4" />
              </span>
            )}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {userName}
              </h2>
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full border ${
                  milestone2.isCompleted
                    ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700'
                    : milestone1.isCompleted
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700'
                    : 'bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800'
                }`}
              >
                {statusLevel}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-slate-500 dark:text-slate-400">
              {memberSince && <span>{memberSince}</span>}
              {memberSince && <span>&bull;</span>}
              <a
                href={profileUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                <span>View Public Profile</span>
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
              <span>&bull;</span>
              <span className="flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                Verified: {formattedDate}
              </span>
            </div>
          </div>
        </div>

        {/* Refresh Action */}
        <button
          onClick={() => onRefresh(profileUrl)}
          disabled={loading}
          className="self-start md:self-center inline-flex items-center space-x-2 px-4 py-2.5 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-semibold rounded-2xl border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-blue-600' : ''}`} />
          <span>Re-verify Profile</span>
        </button>
      </div>

      {/* Progress Track */}
      <div className="mt-6">
        <div className="flex flex-wrap items-end justify-between gap-2 mb-2">
          <div>
            <span className="text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider">
              Cohort Badges Completed
            </span>
            <div className="flex items-baseline space-x-2 mt-0.5">
              <span className="text-3xl font-black text-slate-900 dark:text-white">
                {completedCount}
              </span>
              <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                / {totalRequired} Skill Badges
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-[#1a73e8] dark:text-blue-400">
              {percentage}%
            </span>
          </div>
        </div>

        {/* Bar */}
        <div className="relative w-full h-3.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-200 dark:border-slate-700">
          <div
            className={`h-full rounded-full transition-all duration-1000 ease-out ${
              milestone2.isCompleted
                ? 'bg-linear-to-r from-amber-400 via-emerald-500 to-[#1a73e8]'
                : milestone1.isCompleted
                ? 'bg-linear-to-r from-[#1a73e8] to-emerald-500'
                : 'bg-linear-to-r from-blue-400 to-[#1a73e8]'
            }`}
            style={{ width: `${Math.min(100, Math.max(5, percentage))}%` }}
          />
        </div>
      </div>
    </div>
  );
}
