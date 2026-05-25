import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import FilterBar from '../components/FilterBar';
import WallpaperGrid from '../components/WallpaperGrid';
import PreviewModal from '../components/PreviewModal';
import { fetchCuratedPhotos, searchPhotos, PexelsPhoto } from '../api/pexels';

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('search') || '';
  
  const [photos, setPhotos] = useState<PexelsPhoto[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [category, setCategory] = useState(query || 'All');
  const [orientation, setOrientation] = useState<string>('all');
  
  const [selectedPhoto, setSelectedPhoto] = useState<PexelsPhoto | null>(null);

  const loadPhotos = useCallback(async (pageNum: number, isNewSearch: boolean = false) => {
    try {
      setLoading(true);
      let response;
      
      const activeQuery = query || (category !== 'All' ? category : '');
      const activeOrientation = orientation !== 'all' ? orientation as 'landscape' | 'portrait' | 'square' : undefined;

      if (activeQuery) {
        response = await searchPhotos(activeQuery, pageNum, 30, activeOrientation);
      } else {
        response = await fetchCuratedPhotos(pageNum, 30);
      }
      
      setPhotos(prev => isNewSearch ? response.photos : [...prev, ...response.photos]);
      setHasMore(response.photos.length > 0);
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
