import { Wallpaper } from '../types';

export interface PexelsPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  liked: boolean;
  alt: string;
}

export interface PexelsResponse {
  page: number;
  per_page: number;
  photos: PexelsPhoto[];
  total_results: number;
  next_page?: string;
  prev_page?: string;
}

const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
const BASE_URL = 'https://api.pexels.com/v1';

const headers = {
  Authorization: API_KEY,
};

const mapToWallpaper = (photo: PexelsPhoto): Wallpaper => ({
  id: `pexels-${photo.id}`,
  width: photo.width,
  height: photo.height,
  url: photo.url,
  photographer: photo.photographer,
  photographer_url: photo.photographer_url,
  avg_color: photo.avg_color || '#cccccc',
  src: {
    original: photo.src.original,
    large2x: photo.src.large2x,
    medium: photo.src.medium,
  },
  alt: photo.alt || 'Pexels photo',
  provider: 'pexels',
  type: 'photo',
});

export const fetchCuratedPhotos = async (page = 1, perPage = 30): Promise<{ photos: Wallpaper[] }> => {
  const response = await fetch(`${BASE_URL}/curated?page=${page}&per_page=${perPage}`, { headers });
  if (!response.ok) throw new Error('Failed to fetch curated photos');
  const data: PexelsResponse = await response.json();
  return { photos: data.photos.map(mapToWallpaper) };
};

export const searchPhotos = async (query: string, page = 1, perPage = 30, orientation?: 'landscape' | 'portrait' | 'square'): Promise<{ photos: Wallpaper[] }> => {
  let url = `${BASE_URL}/search?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`;
  if (orientation) {
    url += `&orientation=${orientation}`;
  }
  const response = await fetch(url, { headers });
  if (!response.ok) throw new Error('Failed to fetch searched photos');
  const data: PexelsResponse = await response.json();
  return { photos: data.photos.map(mapToWallpaper) };
};
