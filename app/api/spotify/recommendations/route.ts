import { NextRequest, NextResponse } from 'next/server';
import { getSpotifyApi, getAccessToken } from '@/lib/spotify';

export async function POST(request: NextRequest) {
  try {
    const { trackId, selectedFeatures } = await request.json();
    
    if (!trackId || !selectedFeatures) {
      return NextResponse.json(
        { error: 'Track ID and selected features are required' },
        { status: 400 }
      );
    }
    
    // Get access token
    await getAccessToken();
    const spotifyApi = getSpotifyApi();
    
    // Get audio features for the seed track
    const audioFeatures = await spotifyApi.getAudioFeaturesForTrack(trackId);
    
    // Build recommendation parameters based on selected features
    const params: any = {
      seed_tracks: [trackId],
      limit: 20,
    };
    
    // Add target values for selected features
    if (selectedFeatures.acousticness) {
      params.target_acousticness = audioFeatures.body.acousticness;
    }
    if (selectedFeatures.danceability) {
      params.target_danceability = audioFeatures.body.danceability;
    }
    if (selectedFeatures.energy) {
      params.target_energy = audioFeatures.body.energy;
    }
    if (selectedFeatures.instrumentalness) {
      params.target_instrumentalness = audioFeatures.body.instrumentalness;
    }
    if (selectedFeatures.liveness) {
      params.target_liveness = audioFeatures.body.liveness;
    }
    if (selectedFeatures.speechiness) {
      params.target_speechiness = audioFeatures.body.speechiness;
    }
    if (selectedFeatures.valence) {
      params.target_valence = audioFeatures.body.valence;
    }
    if (selectedFeatures.tempo) {
      params.target_tempo = audioFeatures.body.tempo;
    }
    
    // Get recommendations
    const recommendations = await spotifyApi.getRecommendations(params);
    
    return NextResponse.json({
      tracks: recommendations.body.tracks.map((track: any) => ({
        id: track.id,
        name: track.name,
        artists: track.artists.map((a: any) => a.name),
        album: track.album.name,
        image: track.album.images[0]?.url,
        url: track.external_urls.spotify,
        preview_url: track.preview_url,
      })),
    });
  } catch (error: any) {
    console.error('Error getting recommendations:', error);
    return NextResponse.json(
      { error: 'Failed to get recommendations', details: error.message },
      { status: 500 }
    );
  }
}
