import SpotifyWebApi from 'spotify-web-api-node';

let spotifyApi: SpotifyWebApi | null = null;

export function getSpotifyApi() {
  if (!spotifyApi) {
    spotifyApi = new SpotifyWebApi({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    });
  }
  return spotifyApi;
}

export async function getAccessToken() {
  const api = getSpotifyApi();
  try {
    const data = await api.clientCredentialsGrant();
    api.setAccessToken(data.body['access_token']);
    return data.body['access_token'];
  } catch (error) {
    console.error('Failed to authenticate with Spotify API:', error);
    throw error;
  }
}
