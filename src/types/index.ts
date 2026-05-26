export interface Wallpaper {
  id: string; // Unique string ID combining provider and original ID
  width: number;
  height: number;
  url: string; // Original URL
  photographer: string;
  photographer_url: string;
  avg_color: string;
  src: {
    original: string; // For downloading
    large2x: string; // For full screen preview
    medium: string; // For grid view
  };
  alt: string;
  provider: 'pexels' | 'pixabay';
  type: 'photo' | 'video';
  videoUrl?: string; // Optional URL for live wallpaper MP4
}
