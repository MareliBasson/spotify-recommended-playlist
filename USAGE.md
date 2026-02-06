# Usage Guide

This guide shows you how to use the Spotify Playlist Recommender app.

## Prerequisites

Before you begin, you need to set up Spotify API credentials:

1. Visit the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account
3. Click "Create app"
4. Fill in the app details:
   - App name: "Spotify Playlist Recommender" (or any name you prefer)
   - App description: "Get playlist recommendations based on song features"
   - Redirect URI: `http://localhost:3000` (not used but required)
   - API/SDKs: Check "Web API"
5. Accept the terms and create the app
6. From your app's dashboard, copy your Client ID and Client Secret

## Setup

1. Clone the repository:
```bash
git clone https://github.com/MareliBasson/spotify-recommended-playlist.git
cd spotify-recommended-playlist
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Edit the `.env` file and add your Spotify credentials:
```
SPOTIFY_CLIENT_ID=your_actual_client_id_here
SPOTIFY_CLIENT_SECRET=your_actual_client_secret_here
```

5. Start the development server:
```bash
npm run dev
```

6. Open your browser and navigate to `http://localhost:3000`

## How to Use

### Step 1: Get a Spotify Track URL

1. Open Spotify (web, desktop app, or mobile)
2. Find a song you like
3. Click the "..." (more options) button on the song
4. Select "Share" → "Copy Song Link"
5. The URL will look like: `https://open.spotify.com/track/6rqhFgbbKwnb9MLmUQDhG6`

### Step 2: Analyze the Song

1. Paste the Spotify track URL into the input field
2. Click "Analyze Song"
3. Wait a moment while the app fetches the track information

### Step 3: View Track Information

The app will display:
- Song name
- Artist(s)
- Album name
- Album artwork
- Genre(s) (if available)

### Step 4: Select Important Features

You'll see 8 audio features with switches:

- **Acousticness**: How acoustic the track is (0-100%)
- **Danceability**: How suitable the track is for dancing (0-100%)
- **Energy**: Intensity and activity level (0-100%)
- **Instrumentalness**: Likelihood the track has no vocals (0-100%)
- **Liveness**: Presence of an audience (0-100%)
- **Speechiness**: Presence of spoken words (0-100%)
- **Valence**: Musical positiveness/cheerfulness (0-100%)
- **Tempo**: Overall tempo in BPM (e.g., 120 BPM)

Toggle the switches for features that are important to you. For example:
- If you want danceable music, enable "Danceability"
- If you want energetic tracks, enable "Energy"
- If you prefer acoustic songs, enable "Acousticness"

### Step 5: Get Recommendations

1. Select at least one feature (you need at least one selected)
2. Click "Get Playlist Recommendations"
3. The app will fetch 20 similar tracks based on your selected features

### Step 6: Explore Recommendations

The app displays a list of recommended tracks with:
- Song name
- Artist(s)
- Album name
- Album artwork
- Direct link to Spotify (click any track to open it)

Click on any recommended track to open it in Spotify!

## Example Workflow

1. Find a song on Spotify: "Blinding Lights" by The Weeknd
2. Copy URL: `https://open.spotify.com/track/0VjIjW4GlUZAMYd2vXMi3b`
3. Paste in the app and click "Analyze Song"
4. Review the features:
   - Danceability: 51%
   - Energy: 73%
   - Valence: 33%
5. Toggle switches for "Danceability" and "Energy"
6. Click "Get Playlist Recommendations"
7. Browse through 20 similar tracks!

## Tips

- **Mobile Friendly**: The app works great on mobile devices. The layout automatically adjusts for smaller screens.
- **Feature Combinations**: Try different combinations of features to discover various types of music.
- **Multiple Features**: Selecting more features makes recommendations more specific to the original song.
- **Fewer Features**: Selecting fewer features gives you more variety in recommendations.

## Troubleshooting

### "Invalid Spotify URL" Error
- Make sure you copied the complete URL from Spotify
- The URL must contain `/track/` followed by the track ID
- Example: `https://open.spotify.com/track/6rqhFgbbKwnb9MLmUQDhG6`

### "Failed to fetch track information" Error
- Check that your `.env` file has valid Spotify credentials
- Ensure your Spotify app is active in the Developer Dashboard
- Try restarting the development server

### "Please select at least one feature" Message
- You need to toggle at least one feature switch before getting recommendations
- The button will be disabled until at least one feature is selected

## Building for Production

To build the app for production:

```bash
npm run build
npm start
```

The app will be available at `http://localhost:3000`

## Technologies Used

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **ShadUI**: High-quality UI components built on Radix UI
- **Spotify Web API**: Music data and recommendations
- **Lucide React**: Beautiful icons

Enjoy discovering new music! 🎵
