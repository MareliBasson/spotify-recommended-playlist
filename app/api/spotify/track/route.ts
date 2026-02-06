import { NextRequest, NextResponse } from 'next/server';
import { getSpotifyApi, getAccessToken } from '@/lib/spotify';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();
    
    // Extract track ID from Spotify URL
    const trackIdMatch = url.match(/track\/([a-zA-Z0-9]+)(?:[?#]|$)/);
    if (!trackIdMatch) {
      return NextResponse.json({ error: 'Invalid Spotify URL' }, { status: 400 });
    }
    
    const trackId = trackIdMatch[1];
    
    // Get access token
    await getAccessToken();
    const spotifyApi = getSpotifyApi();
    
    // Fetch track info, audio features, and audio analysis
    const [trackInfo, audioFeatures, audioAnalysis] = await Promise.all([
      spotifyApi.getTrack(trackId),
      spotifyApi.getAudioFeaturesForTrack(trackId),
      spotifyApi.getAudioAnalysisForTrack(trackId),
    ]);
    
    // Extract genre from artist
    const artistId = trackInfo.body.artists[0]?.id;
    let genres: string[] = [];
    
    if (artistId) {
      const artistInfo = await spotifyApi.getArtist(artistId);
      genres = artistInfo.body.genres;
    }
    
    return NextResponse.json({
      track: {
        id: trackInfo.body.id,
        name: trackInfo.body.name,
        artists: trackInfo.body.artists.map((a: any) => a.name),
        album: trackInfo.body.album.name,
        image: trackInfo.body.album.images[0]?.url,
      },
      genres,
      audioFeatures: {
        acousticness: audioFeatures.body.acousticness,
        danceability: audioFeatures.body.danceability,
        energy: audioFeatures.body.energy,
        instrumentalness: audioFeatures.body.instrumentalness,
        liveness: audioFeatures.body.liveness,
        loudness: audioFeatures.body.loudness,
        speechiness: audioFeatures.body.speechiness,
        valence: audioFeatures.body.valence,
        tempo: audioFeatures.body.tempo,
        key: audioFeatures.body.key,
        mode: audioFeatures.body.mode,
        time_signature: audioFeatures.body.time_signature,
      },
      audioAnalysis: {
        duration: audioAnalysis.body.track.duration,
        tempo: audioAnalysis.body.track.tempo,
        key: audioAnalysis.body.track.key,
        mode: audioAnalysis.body.track.mode,
        time_signature: audioAnalysis.body.track.time_signature,
      },
    });
  } catch (error: any) {
    console.error('Error fetching track info:', error);
    return NextResponse.json(
      { error: 'Failed to fetch track information', details: error.message },
      { status: 500 }
    );
  }
}
