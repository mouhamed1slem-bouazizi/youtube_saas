import { NextResponse } from 'next/server';

// You'll need to replace this with your actual YouTube API key
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const videoId = searchParams.get('videoId');

  if (!videoId) {
    return NextResponse.json(
      { message: 'Video ID is required' },
      { status: 400 }
    );
  }

  if (!YOUTUBE_API_KEY) {
    return NextResponse.json(
      { message: 'YouTube API key is not configured' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${YOUTUBE_API_KEY}`
    );

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      return NextResponse.json(
        { message: 'Video not found' },
        { status: 404 }
      );
    }

    const video = data.items[0];
    return NextResponse.json({
      title: video.snippet.title,
      views: video.statistics.viewCount,
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch video information' },
      { status: 500 }
    );
  }
}
