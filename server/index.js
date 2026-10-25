import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { scrapePublicProfile, evaluateMilestones } from './scraper.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const BADGES_FILE = path.join(__dirname, 'data', 'badges.json');

// Fixed 10 Badges defined in badges.json
function getFixedBadges() {
  try {
    const data = fs.readFileSync(BADGES_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading badges file:', err);
    return [];
  }
}

// 1. Get the fixed list of 10 required badges
app.get('/api/badges', (req, res) => {
  const badges = getFixedBadges();
  res.json({ badges, total: badges.length });
});

// 2. Check Profile Progress (Live Public Profile)
app.post('/api/check-profile', async (req, res) => {
  try {
    const { profileUrl } = req.body;

    if (!profileUrl || typeof profileUrl !== 'string') {
      return res.status(400).json({ error: 'Please enter a valid Google Skills public profile URL.' });
    }

    const trimmedUrl = profileUrl.trim();
    const fixedBadges = getFixedBadges();

    // Scrape live profile
    const profileData = await scrapePublicProfile(trimmedUrl);

    // Evaluate progress against the fixed 10 badges list
    const result = evaluateMilestones(profileData, fixedBadges);

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error checking profile:', error.message);
    let userFriendlyMessage = error.message;

    if (error.response?.status === 404) {
      userFriendlyMessage = 'Profile not found or is private. Please verify your public profile URL and ensure "Make profile public" is turned on in your Google Skills settings.';
    } else if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      userFriendlyMessage = 'Request timed out while connecting to Google Cloud Skills Boost. Please try again.';
    } else if (error.message.includes('Private')) {
      userFriendlyMessage = 'This Google Skills profile is currently private. Please visit Settings > Public Visibility and check "Make profile public".';
    }

    res.status(500).json({
      error: userFriendlyMessage,
      hint: 'Make sure your profile is public at Google Cloud Skills Boost > Settings > Make profile public.'
    });
  }
});

// Serve frontend static build in production
const clientDist = path.join(__dirname, '..', 'client', 'dist');
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.use((req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

if (process.env.NODE_ENV !== 'production' || process.env.RENDER || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;
