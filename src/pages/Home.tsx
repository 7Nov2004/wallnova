import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import FilterBar from '../components/FilterBar';
import WallpaperGrid from '../components/WallpaperGrid';
import PreviewModal from '../components/PreviewModal';
import { Wallpaper } from '../types';
import { fetchCuratedPhotos, searchPhotos } from '../api/pexels';
import { fetchPixabayPhotos, fetchPixabayVideos } from '../api/pixabay';

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('search') || '';
  
  const [photos, setPhotos] = useState<Wallpaper[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [category, setCategory] = useState(query || 'All');
  const [orientation, setOrientation] = useState<string>('all');
  
  const [selectedPhoto, setSelectedPhoto] = useState<Wallpaper | null>(null);

  const loadPhotos = useCallback(async (pageNum: number, isNewSearch: boolean = false) => {
    try {
      setLoading(true);
      
      const activeQuery = query || (category !== 'All' ? category : '');
      const activeOrientation = orientation !== 'all' ? orientation as 'landscape' | 'portrait' | 'square' : undefined;

      let newWallpapers: Wallpaper[] = [];

      if (category === 'Live Wallpapers') {
        const queryTerm = query || 'wallpaper';
        const pResponse = await fetchPixabayVideos(queryTerm, pageNum, 30);
        newWallpapers = pResponse.photos;
      } else {
        if (activeQuery) {
          const [pexelsRes, pixabayRes] = await Promise.all([
            searchPhotos(activeQuery, pageNum, 15, activeOrientation),
            fetchPixabayPhotos(activeQuery, pageNum, 15, activeOrientation === 'square' ? undefined : activeOrientation)
          ].map(p => p.catch(e => { console.error(e); return { photos: [] }; })));
          
          // Interleave results
          const maxLen = Math.max(pexelsRes.photos.length, pixabayRes.photos.length);
          for (let i = 0; i < maxLen; i++) {
            if (pexelsRes.photos[i]) newWallpapers.push(pexelsRes.photos[i]);
            if (pixabayRes.photos[i]) newWallpapers.push(pixabayRes.photos[i]);
          }
        } else {
          const [pexelsRes, pixabayRes] = await Promise.all([
            fetchCuratedPhotos(pageNum, 15),
            fetchPixabayPhotos('wallpaper', pageNum, 15)
          ].map(p => p.catch(e => { console.error(e); return { photos: [] }; })));
          
          const maxLen = Math.max(pexelsRes.photos.length, pixabayRes.photos.length);
          for (let i = 0; i < maxLen; i++) {
            if (pexelsRes.photos[i]) newWallpapers.push(pexelsRes.photos[i]);
            if (pixabayRes.photos[i]) newWallpapers.push(pixabayRes.photos[i]);
          }
        }
      }
      
      setPhotos(prev => isNewSearch ? newWallpapers : [...prev, ...newWallpapers]);
      setHasMore(newWallpapers.length > 0);
    } catch (error) {
      console.error('Failed to fetch photos:', error);
      if (isNewSearch) setPhotos([]);
    } finally {
      setLoading(false);
    }
  }, [query, category, orientation]);

  // Effect to reset and fetch when filters change
  useEffect(() => {
    setPage(1);
    loadPhotos(1, true);
  }, [query, category, orientation, loadPhotos]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadPhotos(nextPage, false);
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    if (query) {
      setSearchParams({}); // clear search when clicking a category
    }
  };

  const handleOrientationChange = (newOrientation: string) => {
    setOrientation(newOrientation);
  };

  return (
    <div className="container animate-fade-in">
      <FilterBar 
        currentCategory={category}
        currentOrientation={orientation}
        onCategoryChange={handleCategoryChange}
        onOrientationChange={handleOrientationChange}
      />
      
      <WallpaperGrid 
        photos={photos} 
        loading={loading}
        onPhotoClick={setSelectedPhoto}
        hasMore={hasMore}
        loadMore={handleLoadMore}
      />
      
      <PreviewModal 
        photo={selectedPhoto} 
        onClose={() => setSelectedPhoto(null)} 
      />
    </div>
  );
};

export default Home;
