# Spotify Playlist Recommender

An app that compiles a recommended playlist based on song's features using the Spotify API.

## Features

- 🎵 Input any Spotify track URL
- 📊 Analyze track audio features (acousticness, danceability, energy, etc.)
- 🎛️ Select which features are important to you with intuitive switch buttons
- 🎼 Get personalized playlist recommendations based on your preferences
- 📱 Fully responsive and mobile-friendly design
- 🎨 Built with ShadUI components for a modern, clean interface

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **ShadUI** - High-quality UI components
- **Spotify Web API** - Music data and recommendations

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

3. Create a Spotify App:
   - Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
   - Create a new app
   - Copy your Client ID and Client Secret

4. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your Spotify credentials:
```
SPOTIFY_CLIENT_ID=your_client_id_here
SPOTIFY_CLIENT_SECRET=your_client_secret_here
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Copy a Spotify track URL (e.g., from the Spotify app or web player)
2. Paste it into the input field and click "Analyze Song"
3. View the track information and audio features
4. Toggle switches for the features that are important to you
5. Click "Get Playlist Recommendations" to see similar tracks
6. Click on any recommended track to open it in Spotify

## Audio Features Explained

- **Acousticness**: Confidence measure of whether the track is acoustic
- **Danceability**: How suitable the track is for dancing
- **Energy**: Intensity and activity level
- **Instrumentalness**: Predicts whether a track contains no vocals
- **Liveness**: Presence of an audience in the recording
- **Speechiness**: Presence of spoken words in a track
- **Valence**: Musical positiveness conveyed by the track
- **Tempo**: Overall tempo of the track in beats per minute (BPM)

## License

ISC
