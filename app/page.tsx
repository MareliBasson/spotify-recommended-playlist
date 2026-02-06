"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Music, Loader2 } from "lucide-react"

interface TrackInfo {
  track: {
    id: string
    name: string
    artists: string[]
    album: string
    image?: string
  }
  genres: string[]
  audioFeatures: {
    acousticness: number
    danceability: number
    energy: number
    instrumentalness: number
    liveness: number
    loudness: number
    speechiness: number
    valence: number
    tempo: number
    key: number
    mode: number
    time_signature: number
  }
  audioAnalysis: {
    duration: number
    tempo: number
    key: number
    mode: number
    time_signature: number
  }
}

interface RecommendedTrack {
  id: string
  name: string
  artists: string[]
  album: string
  image?: string
  url: string
  preview_url?: string
}

export default function Home() {
  const [songUrl, setSongUrl] = useState("")
  const [trackInfo, setTrackInfo] = useState<TrackInfo | null>(null)
  const [recommendations, setRecommendations] = useState<RecommendedTrack[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingRecommendations, setLoadingRecommendations] = useState(false)
  const [error, setError] = useState("")
  
  const [selectedFeatures, setSelectedFeatures] = useState({
    acousticness: false,
    danceability: false,
    energy: false,
    instrumentalness: false,
    liveness: false,
    speechiness: false,
    valence: false,
    tempo: false,
  })

  const handleFetchTrack = async () => {
    setError("")
    setTrackInfo(null)
    setRecommendations([])
    setLoading(true)

    try {
      const response = await fetch("/api/spotify/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: songUrl }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to fetch track")
      }

      const data = await response.json()
      setTrackInfo(data)
    } catch (err: any) {
      setError(err.message || "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleGetRecommendations = async () => {
    if (!trackInfo) return

    setError("")
    setLoadingRecommendations(true)

    try {
      const response = await fetch("/api/spotify/recommendations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          trackId: trackInfo.track.id,
          selectedFeatures,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to get recommendations")
      }

      const data = await response.json()
      setRecommendations(data.tracks)
    } catch (err: any) {
      setError(err.message || "An error occurred")
    } finally {
      setLoadingRecommendations(false)
    }
  }

  const toggleFeature = (feature: keyof typeof selectedFeatures) => {
    setSelectedFeatures((prev) => ({
      ...prev,
      [feature]: !prev[feature],
    }))
  }

  const formatFeatureValue = (value: number, isPercentage: boolean = true) => {
    if (isPercentage) {
      return `${(value * 100).toFixed(0)}%`
    }
    return value.toFixed(2)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Music className="h-8 w-8 text-green-600" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Spotify Playlist Recommender
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Get personalized playlist recommendations based on your favorite song's features
          </p>
        </div>

        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle>Enter a Spotify Song URL</CardTitle>
            <CardDescription>
              Paste a Spotify track URL (e.g., https://open.spotify.com/track/...)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                placeholder="https://open.spotify.com/track/..."
                value={songUrl}
                onChange={(e) => setSongUrl(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleFetchTrack} disabled={loading || !songUrl}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Analyze Song"
                )}
              </Button>
            </div>
            {error && (
              <div className="text-sm text-red-600 dark:text-red-400">{error}</div>
            )}
          </CardContent>
        </Card>

        {/* Track Info and Features */}
        {trackInfo && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Track Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  {trackInfo.track.image && (
                    <img
                      src={trackInfo.track.image}
                      alt={trackInfo.track.name}
                      className="w-full sm:w-32 h-32 object-cover rounded-md"
                    />
                  )}
                  <div className="flex-1 space-y-2">
                    <h3 className="text-xl font-semibold">{trackInfo.track.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {trackInfo.track.artists.join(", ")}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Album: {trackInfo.track.album}
                    </p>
                    {trackInfo.genres.length > 0 && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Genres: {trackInfo.genres.join(", ")}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Select Important Features</CardTitle>
                <CardDescription>
                  Toggle the features that are most important to you for recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries({
                    acousticness: {
                      label: "Acousticness",
                      description: "How acoustic the track is",
                      value: trackInfo.audioFeatures.acousticness,
                    },
                    danceability: {
                      label: "Danceability",
                      description: "How suitable for dancing",
                      value: trackInfo.audioFeatures.danceability,
                    },
                    energy: {
                      label: "Energy",
                      description: "Intensity and activity",
                      value: trackInfo.audioFeatures.energy,
                    },
                    instrumentalness: {
                      label: "Instrumentalness",
                      description: "Predicts if track has no vocals",
                      value: trackInfo.audioFeatures.instrumentalness,
                    },
                    liveness: {
                      label: "Liveness",
                      description: "Presence of an audience",
                      value: trackInfo.audioFeatures.liveness,
                    },
                    speechiness: {
                      label: "Speechiness",
                      description: "Presence of spoken words",
                      value: trackInfo.audioFeatures.speechiness,
                    },
                    valence: {
                      label: "Valence",
                      description: "Musical positiveness",
                      value: trackInfo.audioFeatures.valence,
                    },
                    tempo: {
                      label: "Tempo",
                      description: "Overall tempo (BPM)",
                      value: trackInfo.audioFeatures.tempo,
                    },
                  }).map(([key, feature]) => (
                    <div
                      key={key}
                      className="flex items-start justify-between space-x-4 p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex-1 space-y-1">
                        <Label htmlFor={key} className="text-base font-medium">
                          {feature.label}
                        </Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {feature.description}
                        </p>
                        <p className="text-sm font-semibold text-green-600">
                          Current: {formatFeatureValue(feature.value, key !== "tempo")}
                          {key === "tempo" && " BPM"}
                        </p>
                      </div>
                      <Switch
                        id={key}
                        checked={selectedFeatures[key as keyof typeof selectedFeatures]}
                        onCheckedChange={() =>
                          toggleFeature(key as keyof typeof selectedFeatures)
                        }
                      />
                    </div>
                  ))}
                </div>

                <Button
                  onClick={handleGetRecommendations}
                  disabled={loadingRecommendations || Object.values(selectedFeatures).every(v => !v)}
                  className="w-full mt-6"
                  size="lg"
                >
                  {loadingRecommendations ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Getting Recommendations...
                    </>
                  ) : (
                    "Get Playlist Recommendations"
                  )}
                </Button>
                {Object.values(selectedFeatures).every(v => !v) && (
                  <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2">
                    Please select at least one feature to get recommendations
                  </p>
                )}
              </CardContent>
            </Card>
          </>
        )}

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Recommended Tracks</CardTitle>
              <CardDescription>
                Based on your selected features, here are {recommendations.length} tracks for you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recommendations.map((track) => (
                  <a
                    key={track.id}
                    href={track.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    {track.image && (
                      <img
                        src={track.image}
                        alt={track.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{track.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                        {track.artists.join(", ")}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {track.album}
                      </p>
                    </div>
                    <Music className="h-5 w-5 text-green-600 flex-shrink-0" />
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  )
}
