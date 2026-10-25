import axios from 'axios';
import * as cheerio from 'cheerio';

/**
 * Normalizes text for comparison by removing special characters, excess spacing, and casing.
 */
export function normalizeTitle(text) {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/[–—−-]/g, ' ')
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Compares two badge titles with smart fuzzy matching.
 */
export function isBadgeMatch(targetTitle, candidateTitle) {
  const normTarget = normalizeTitle(targetTitle);
  const normCandidate = normalizeTitle(candidateTitle);

  if (!normTarget || !normCandidate) return false;

  // Direct match
  if (normTarget === normCandidate) return true;

  // Check substring containment
  if (normTarget.includes(normCandidate) || normCandidate.includes(normTarget)) {
    // Ensure sufficient length to avoid false positives on small words
    const shorterLen = Math.min(normTarget.length, normCandidate.length);
    if (shorterLen >= 12) return true;
  }

  // Token-based matching: check if key words match
  const targetWords = normTarget.split(' ').filter(w => !['the', 'and', 'with', 'on', 'in', 'of', 'for', 'to', 'a', 'an'].includes(w));
  const candidateWords = normCandidate.split(' ').filter(w => !['the', 'and', 'with', 'on', 'in', 'of', 'for', 'to', 'a', 'an'].includes(w));

  if (targetWords.length === 0 || candidateWords.length === 0) return false;

  let matchCount = 0;
  for (const word of targetWords) {
    if (candidateWords.includes(word)) {
      matchCount++;
    }
  }

  const matchRatio = matchCount / targetWords.length;
  return matchRatio >= 0.85; // 85% keyword overlap
}

/**
 * Normalizes user input into a full public profile URL.
 */
export function normalizeProfileUrl(input) {
  if (!input) return '';
  let url = input.trim();

  // If user pasted only a UUID (e.g., 61476db8-b196-4122-b5e8-...)
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (uuidRegex.test(url)) {
    return `https://www.cloudskillsboost.google/public_profiles/${url}`;
  }

  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = `https://${url}`;
  }

  return url;
}

/**
 * Scrapes a public Google Skills / Cloud Skills Boost profile.
 */
export async function scrapePublicProfile(profileUrl) {
  const normalizedUrl = normalizeProfileUrl(profileUrl);

  const response = await axios.get(normalizedUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
      'Cache-Control': 'no-cache'
    },
    timeout: 15000,
    maxRedirects: 5
  });

  const html = response.data;
  const $ = cheerio.load(html);

  // Check if profile is private or not found
  const pageText = $('body').text().toLowerCase();
  if (pageText.includes('profile is private') || pageText.includes('this profile is currently private')) {
    throw new Error('This Google Skills profile is set to Private. Please set it to Public in your settings.');
  }

  // Extract User Information
  let userName = $('h1.ql-headline-medium').text().trim() ||
                 $('h1.ql-headline-large').text().trim() ||
                 $('.public-profile__hero h1').text().trim() ||
                 $('h1').first().text().trim() ||
                 'Google Cloud Learner';

  let memberSince = $('.ql-body-medium:contains("Member since")').text().trim() ||
                    $('.public-profile__hero p').first().text().trim() || '';

  let avatarUrl = $('.public-profile__hero img').attr('src') ||
                  $('.avatar img').attr('src') ||
                  $('img.avatar').attr('src') || '';

  // Extract All Badges from profile
  const userBadges = [];
  $('.profile-badge').each((_, el) => {
    const $el = $(el);
    let title = $el.find('.ql-title-medium').text().trim() ||
                $el.find('.ql-title').text().trim() ||
                $el.find('h3').text().trim() ||
                $el.find('img').attr('alt') ||
                '';

    let earnedDate = $el.find('.ql-body-medium').text().trim() ||
                     $el.find('.ql-subhead').text().trim() ||
                     $el.find('.badge-date').text().trim() || '';

    let iconUrl = $el.find('img').attr('src') || '';
    let badgeUrl = $el.find('a').attr('href') || '';

    if (title) {
      userBadges.push({
        title,
        earnedDate: earnedDate.replace(/Earned\s+/i, ''),
        iconUrl,
        badgeUrl: badgeUrl.startsWith('http') ? badgeUrl : (badgeUrl ? `https://www.cloudskillsboost.google${badgeUrl}` : '')
      });
    }
  });

  return {
    profileUrl: normalizedUrl,
    userName,
    memberSince,
    avatarUrl,
    totalBadgesFound: userBadges.length,
    userBadges
  };
}

/**
 * Evaluates progress against the 10 required badges list.
 */
export function evaluateMilestones(userProfileData, requiredBadges) {
  const { userBadges } = userProfileData;

  const checklist = requiredBadges.map((badge, idx) => {
    // Find matching badge from user's earned badges
    const matchedBadge = userBadges.find(ub => isBadgeMatch(badge.title, ub.title));

    return {
      id: badge.id || idx + 1,
      requiredTitle: badge.title,
      category: badge.category || badge.type || 'Skill Badge',
      courseUrl: badge.courseUrl || '',
      credits: badge.credits ?? 0,
      isCompleted: !!matchedBadge,
      earnedTitle: matchedBadge ? matchedBadge.title : null,
      earnedDate: matchedBadge ? matchedBadge.earnedDate : null,
      iconUrl: matchedBadge?.iconUrl || badge.iconUrl || 'https://www.gstatic.com/devrel-devsite/prod/v52a23e9cb3de7a61d6fb1e6a17b6a6bbfe3e04e84cbef70139b854378f85f54d/cloud/images/favicons/onecloud/super_g.png'
    };
  });

  const completedCount = checklist.filter(b => b.isCompleted).length;
  const totalRequired = requiredBadges.length;
  const percentage = Math.round((completedCount / totalRequired) * 100);

  // Milestones: Milestone 1 (5 badges), Milestone 2 (10 badges)
  const milestone1 = {
    target: 5,
    isCompleted: completedCount >= 5,
    badgesRemaining: Math.max(0, 5 - completedCount),
    title: "Milestone 1 (5 Badges)",
    rewardTier: "Tier 1 Community Swags"
  };

  const milestone2 = {
    target: 10,
    isCompleted: completedCount >= 10,
    badgesRemaining: Math.max(0, 10 - completedCount),
    title: "Milestone 2 (10 Badges)",
    rewardTier: "Tier 2 Ultimate Champion Kit"
  };

  let statusLevel = 'Getting Started';
  if (completedCount >= 10) {
    statusLevel = 'Milestone 2 Champion 🏆';
  } else if (completedCount >= 5) {
    statusLevel = 'Milestone 1 Achiever 🎉';
  } else if (completedCount > 0) {
    statusLevel = 'In Progress 🚀';
  }

  return {
    ...userProfileData,
    completedCount,
    totalRequired,
    percentage,
    statusLevel,
    milestone1,
    milestone2,
    checklist,
    checkedAt: new Date().toISOString()
  };
}
