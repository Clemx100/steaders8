'use client'

import { useEffect, useState } from 'react'
import { Play } from 'lucide-react'

interface YouTubeVideo {
  id: string
  title: string
  thumbnail: string
  videoId: string
}

export function Updates() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchYouTubeVideos = async () => {
      try {
        setLoading(true)
        // Using YouTube Data API to fetch latest videos from channel
        // This example uses hardcoded videos for demo - in production, use server-side API call
        const channelId = 'UCJQVr1yKBg2yMLh3C3r5-WA' // Example channel ID
        
        // For demo purposes, we'll show placeholder videos
        // In production, replace with actual API call
        const mockVideos: YouTubeVideo[] = [
          {
            id: '1',
            title: 'Sustainable Farming Techniques - Episode 1',
            thumbnail: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/african-man-harvesting-vegetables-icPt7Hz5qIYvaovW9LHrCvwplJmTP6.jpg',
            videoId: 'dQw4w9WgXcQ',
          },
          {
            id: '2',
            title: 'Tour of Our Vertical Farm Facility',
            thumbnail: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/colorful-tomatoes-vegetables-fruits-are-growing-indoor-farm-vertical-farm-NnnBSnoH4Gq6WOOM5t3LEUbEjgbOtE.jpg',
            videoId: 'dQw4w9WgXcQ',
          },
          {
            id: '3',
            title: 'Investment Opportunities in Modern Agriculture',
            thumbnail: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/beautiful-shot-cornfield-with-blue-sky-cCO51UJQRQzdpBjJ7iw53LcaLrhf4P.jpg',
            videoId: 'dQw4w9WgXcQ',
          },
        ]
        
        setVideos(mockVideos)
        setError(null)
      } catch (err) {
        console.error('Error fetching videos:', err)
        setError('Failed to load videos')
        // Fallback videos
        setVideos([
          {
            id: '1',
            title: 'Sustainable Farming Techniques',
            thumbnail: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/african-man-harvesting-vegetables-icPt7Hz5qIYvaovW9LHrCvwplJmTP6.jpg',
            videoId: 'dQw4w9WgXcQ',
          },
          {
            id: '2',
            title: 'Vertical Farm Tour',
            thumbnail: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/colorful-tomatoes-vegetables-fruits-are-growing-indoor-farm-vertical-farm-NnnBSnoH4Gq6WOOM5t3LEUbEjgbOtE.jpg',
            videoId: 'dQw4w9WgXcQ',
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchYouTubeVideos()
  }, [])

  return (
    <section id="updates" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Latest Updates
          </h2>
          <div className="w-16 h-1 bg-green-600 mx-auto mb-6" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay informed with our latest videos and updates about our farming initiatives and innovations.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-64 animate-pulse" />
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600">{error}</p>
          </div>
        )}

        {/* Videos Grid */}
        {!loading && videos.length > 0 && (
          <div className="grid md:grid-cols-3 gap-8">
            {videos.map((video) => (
              <a
                key={video.id}
                href={`https://youtube.com/watch?v=${video.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group cursor-pointer"
              >
                <div className="relative h-64 rounded-lg overflow-hidden bg-gray-200 mb-4">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Play className="w-8 h-8 text-white fill-white" />
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors line-clamp-2">
                  {video.title}
                </h3>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
