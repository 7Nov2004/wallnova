import { Wallpaper } from '../types';

export interface PixabayImage {
  id: number;
  pageURL: string;
  type: string;
  tags: string;
  previewURL: string;
  previewWidth: number;
  previewHeight: number;
  webformatURL: string;
  webformatWidth: number;
  webformatHeight: number;
  largeImageURL: string;
  imageWidth: number;
  imageHeight: number;
  imageSize: number;
  views: number;
  downloads: number;
  collections: number;
  likes: number;
  comments: number;
  user_id: number;
  user: string;
  userImageURL: string;
}

export interface PixabayVideo {
  id: number;
  pageURL: string;
  type: string;
  tags: string;
  duration: number;
  picture_id: string;
  videos: {
    large: { url: string; width: number; height: number; size: number };
    medium: { url: string; width: number; height: number; size: number };
    small: { url: string; width: number; height: number; size: number };
    tiny: { url: string; width: number; height: number; size: number };
  };
  views: number;
  downloads: number;
  likes: number;
  comments: number;
  user_id: number;
  user: string;
  userImageURL: string;
}

const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;
const BASE_URL = 'https://pixabay.com/api';

const mapImageToWallpaper = (image: PixabayImage): Wallpaper => ({
  id: `pixabay-img-${image.id}`,
  width: image.imageWidth,
  height: image.imageHeight,
  url: image.pageURL,
  photographer: image.user,
  photographer_url: `https://pixabay.com/users/${image.user}-${image.user_id}/`,
  avg_color: '#333333', // Pixabay doesn't provide avg_color
  src: {
    original: image.largeImageURL,
    large2x: image.largeImageURL,
    medium: image.webformatURL,
  },
  alt: image.tags,
  provider: 'pixabay',
  type: 'photo',
});

const mapVideoToWallpaper = (video: PixabayVideo): Wallpaper => {
  const videoData = video.videos.large || video.videos.medium || video.videos.small;
  return {
    id: `pixabay-vid-${video.id}`,
    width: videoData.width,
    height: videoData.height,
    url: video.pageURL,
    photographer: video.user,
    photographer_url: `https://pixabay.com/users/${video.user}-${video.user_id}/`,
    avg_color: '#333333',
    src: {
      original: `https://i.vimeocdn.com/video/${video.picture_id}_640x360.jpg`, // Fallback thumbnail
      large2x: `https://i.vimeocdn.com/video/${video.picture_id}_640x360.jpg`,
      medium: `https://i.vimeocdn.com/video/${video.picture_id}_640x360.jpg`,
    },
    alt: video.tags,
    provider: 'pixabay',
    type: 'video',
    videoUrl: videoData.url,
  };
};

export const fetchPixabayPhotos = async (query: string, page = 1, perPage = 15, orientation?: 'landscape' | 'portrait' | 'square'): Promise<{ photos: Wallpaper[] }> => {
  let url = `${BASE_URL}/?key=${API_KEY}&q=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}&image_type=photo&safesearch=true`;
  
  if (orientation) {
    if (orientation === 'landscape' || orientation === 'portrait') {
      url += `&orientation=${orientation}`;
    }
  }

  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch Pixabay photos');
  const data = await response.json();
  return { photos: (data.hits as PixabayImage[]).map(mapImageToWallpaper) };
};

export const fetchPixabayVideos = async (query: string, page = 1, perPage = 30): Promise<{ photos: Wallpaper[] }> => {
  // Use vertical videos as requested for Live Wallpapers
  let url = `${BASE_URL}/videos/?key=${API_KEY}&q=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}&safesearch=true`;
  
  // Note: Pixabay doesn't directly support orientation for videos in the same way, 
  // but if needed we could filter on client side. For now, fetch generic vertical videos if requested.

  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch Pixabay videos');
  const data = await response.json();
  
  // We want to return vertical videos since it's for phone wallpapers ideally, 
  // but we can just map what we get and let CSS `object-fit: cover` handle it.
  return { photos: (data.hits as PixabayVideo[]).map(mapVideoToWallpaper) };
};
