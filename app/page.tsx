'use client';

import { useState } from "react";

interface VideoInfo {
  title: string;
  views: string;
}

export default function Home() {
  const [url, setUrl] = useState('');
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getVideoId = (url: string) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const fetchVideoInfo = async () => {
    setLoading(true);
    setError('');
    setVideoInfo(null);

    const videoId = getVideoId(url);
    if (!videoId) {
      setError('Invalid YouTube URL');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/youtube?videoId=${videoId}`);
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.message || 'Failed to fetch video info');
      
      setVideoInfo(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">YouTube Video Info</h1>
        
        <div className="flex gap-4 mb-8">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter YouTube video URL"
            className="flex-1 p-2 border rounded"
          />
          <button
            onClick={fetchVideoInfo}
            disabled={loading || !url}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            {loading ? 'Loading...' : 'Get Info'}
          </button>
        </div>

        {error && (
          <div className="text-red-500 mb-4">{error}</div>
        )}

        {videoInfo && (
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Title</th>
                <th className="border p-2 text-left">Views</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">{videoInfo.title}</td>
                <td className="border p-2">{videoInfo.views}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
