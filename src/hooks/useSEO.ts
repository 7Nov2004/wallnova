import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
}

export function useSEO({ title, description, keywords }: SEOProps) {
  useEffect(() => {
    // Save original values
    const originalTitle = document.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    
    const originalDescription = metaDescription?.getAttribute('content');
    const originalKeywords = metaKeywords?.getAttribute('content');

    // Update title
    document.title = title;

    // Update Open Graph and Twitter titles as well for dynamic sharing
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    
    if (ogTitle) ogTitle.setAttribute('content', title);
    if (twitterTitle) twitterTitle.setAttribute('content', title);

    // Update description
    if (description) {
      if (metaDescription) metaDescription.setAttribute('content', description);
      
      const ogDesc = document.querySelector('meta[property="og:description"]');
      const twitterDesc = document.querySelector('meta[name="twitter:description"]');
      
      if (ogDesc) ogDesc.setAttribute('content', description);
      if (twitterDesc) twitterDesc.setAttribute('content', description);
    }

    // Update keywords
    if (keywords && metaKeywords) {
      metaKeywords.setAttribute('content', keywords);
    }

    // Cleanup on unmount
    return () => {
      document.title = originalTitle || 'WallNova';
      
      if (originalDescription && metaDescription) {
        metaDescription.setAttribute('content', originalDescription);
      }
      
      if (originalKeywords && metaKeywords) {
        metaKeywords.setAttribute('content', originalKeywords);
      }
    };
  }, [title, description, keywords]);
}
