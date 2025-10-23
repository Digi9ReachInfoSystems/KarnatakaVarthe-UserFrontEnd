import React, { useState, useEffect, useContext } from 'react';
import { ImFolderDownload } from "react-icons/im";
import { IoChevronDownOutline } from "react-icons/io5";
import { useNavigate, useLocation } from 'react-router-dom';
import { MarchMagazines } from '../../../../services/magazineApi/magazineService';
import { LanguageContext } from '../../../../context/LanguageContext';
import {
  MagazineContainer,
  SectionHeader,
  TitleWrapper,
  PageTitle,
  SelectedYearText,
  YearFilterWrapper,
  YearFilterIcon,
  YearFilter,
  MagazineGrid,
  MagazineCard,
  MagazineImageWrapper,
  MagazineImage,
  DownloadButton,
  ShimmerWrapper,
  ShimmerCard,
  ShimmerImageBox,
  ShimmerButton,
  ShimmerTitle,
  ShimmerFilter
} from './MarchKarnatakaGallery.styles';
import { getMagazineContext } from '../../../../services/searchapi/SearchApi';

// Translations
const translations = {
  Kannada: {
    title: "ಇತ್ತೀಚಿನ ಮಾರ್ಚ್ ಆಫ್ ಕರ್ನಾಟಕ ನಿಯತಕಾಲಿಕೆಗಳು",
    edition: "ಆವೃತ್ತಿ",
    selectYear: "ವರ್ಷ ಆಯ್ಕೆಮಾಡಿ",
    download: "ಡೌನ್‌ಲೋಡ್",
    loading: "ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
    noMagazines: "ಯಾವುದೇ ನಿಯತಕಾಲಿಕೆಗಳು ಲಭ್ಯವಿಲ್ಲ"
  },
  English: {
    title: "Latest March of Karnataka Magazines",
    edition: "Edition",
    selectYear: "Select year",
    download: "Download",
    loading: "Loading magazines...",
    noMagazines: "No magazines available"
  },
  Hindi: {
    title: "नवीनतम मार्च ऑफ कर्नाटक पत्रिकाएँ",
    edition: "संस्करण",
    selectYear: "वर्ष चुनें",
    download: "डाउनलोड",
    loading: "लोड हो रहा है...",
    noMagazines: "कोई पत्रिकाएँ उपलब्ध नहीं"
  }
};

// Month order for sorting
const monthOrder = {
  'January': 1,
  'February': 2,
  'March': 3,
  'April': 4,
  'May': 5,
  'June': 6,
  'July': 7,
  'August': 8,
  'September': 9,
  'October': 10,
  'November': 11,
  'December': 12
};

export default function MarchKarnatakaGallery() {
  const navigate = useNavigate();
  const location = useLocation();
  const [magazines, setMagazines] = useState([]);
  const [filteredMagazines, setFilteredMagazines] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [availableYears, setAvailableYears] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { setPageLanguage, language } = useContext(LanguageContext);
  
  // Get translations based on current language
  const t = translations[language] || translations.English;

  // Helper function to get localized magazine data
  const getLocalizedMagazineData = (magazine, field) => {
    const langKey = language.toLowerCase(); // Convert "Kannada" to "kannada"
    if (magazine[langKey] && magazine[langKey][field]) {
      return magazine[langKey][field];
    }
    // Fallback to default field
    return magazine[field] || '';
  };
// call getmagzinebyContent
const getMagazineByContent = async (content) => {
  try {
    const response = await getMagazineContext(content);
     return response || { results: [] };
  } catch (error) {
    console.error('Error fetching magazines:', error);
    return { results: [] }; // Return empty results on error
  }
};

// Perform search using the API
const performSearch = async (query) => {
  try {
    console.log('Starting search for query:', query);
    setLoading(true);
    const searchResults = await getMagazineByContent(query.trim());
  
    if (searchResults && searchResults.results && searchResults.results.length > 0) {
  
      // Find the highest scoring result
      const topResult = searchResults.results.reduce((max, current) =>
        current.score > max.score ? current : max
      );
 
      // Transform API results to match magazine format
      const transformedResults = searchResults.results.map(result => ({
        _id: result.magazine_id, // Use magazine_id for navigation, not chunk id
        title: result.title,
        description: result.description,
        magazineThumbnail: result.thumbnail_url,
        magazinePdf: result.pdf_url,
        publishedYear: result.published_year,
        publishedMonth: result.published_month,
        editionNumber: result.edition_number,
        score: result.score,
        content: result.content, // Include content for display
        // Add other necessary fields
      }));
   
      // Deduplicate results based on magazine ID/title
      const deduplicatedResults = transformedResults.filter((result, index, self) =>
        index === self.findIndex(r => r._id === result._id || r.title === result.title)
      );
 
      setMagazines(deduplicatedResults);
      setFilteredMagazines(deduplicatedResults);
      setSearchQuery(query); // Store the query for display
    } else {
      console.log('No search results found, falling back to regular magazines');
      // If no search results, fall back to regular magazines
      fetchMagazines();
    }
  } catch (error) {
    console.error('Search failed:', error);
    // Fall back to regular magazines on error
    fetchMagazines();
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    // Set page language to magazine2 type on mount
    setPageLanguage('magazine2');

    return () => {
      // Reset to global language on unmount
      setPageLanguage(null);
    };
  }, [setPageLanguage]);

  // Removed initial fetchMagazines call - handled in search query useEffect

  // Check for search query from navigation state
  useEffect(() => {
    const queryFromState = location.state?.searchQuery;
    console.log('Location state:', location.state);
    console.log('Query from state:', queryFromState);
    if (queryFromState && queryFromState.trim()) {
      console.log('Performing search for:', queryFromState);
      setSearchQuery(queryFromState);
      performSearch(queryFromState);
    } else {
      console.log('No search query found, loading regular magazines');
      fetchMagazines();
    }
  }, [location.state]);

  const fetchMagazines = async () => {
    try {
      setLoading(true);
      const response = await MarchMagazines();
      console.log('Fetched magazines:', response);
      
      if (response && response.data) {
        // Get all unique years from publishedYear and sort them to find the latest
        const years = [...new Set(response.data.map(mag => mag.publishedYear))].sort((a, b) => b - a);
        const latestYear = years[0];
        
        // Filter magazines to get only the latest year
        const latestYearMagazines = response.data.filter(
          mag => mag.publishedYear === latestYear && mag.status === 'approved'
        );
        
        // Sort by month (January to December)
        const sortedMagazines = latestYearMagazines.sort((a, b) => {
          const monthA = monthOrder[a.publishedMonth] || 0;
          const monthB = monthOrder[b.publishedMonth] || 0;
          return monthA - monthB;
        });
        
        // Take only first 12 magazines (one per month)
        const twelveMonthMagazines = sortedMagazines.slice(0, 12);
        
        setMagazines(response.data);
        setFilteredMagazines(twelveMonthMagazines);
        
        // Set selected year to latest year
        setSelectedYear(latestYear);
        
        // Get all available years for filter dropdown
        setAvailableYears(years);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching magazines:', error);
      setLoading(false);
    }
  };

  const handleDownload = (e, magazinePdf, title) => {
    e.stopPropagation(); // Prevent card click when clicking download
    console.log('Download attempt:', { magazinePdf, title });

    if (magazinePdf) {
      console.log('Opening PDF URL:', magazinePdf);
      // Open PDF in new tab
      const newWindow = window.open(magazinePdf, '_blank');

      // Check if popup was blocked or failed to open
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        alert(`Popup blocked or PDF failed to open. Please allow popups for this site and try again.`);
      }
    } else {
      console.log(`No PDF available for: ${title}`);
      alert(`No PDF available for ${title}`);
    }
  };

  const handleMagazineClick = (magazineId) => {
    navigate(`/marchofkarnatakview/${magazineId}`);
  };

  const handleYearChange = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    
    if (year) {
      // Filter magazines by selected publishedYear and get only approved ones
      const yearMagazines = magazines.filter(
        mag => mag.publishedYear === year && mag.status === 'approved'
      );
      
      // Sort by month (January to December)
      const sortedMagazines = yearMagazines.sort((a, b) => {
        const monthA = monthOrder[a.publishedMonth] || 0;
        const monthB = monthOrder[b.publishedMonth] || 0;
        return monthA - monthB;
      });
      
      // Take only first 12 magazines (one per month)
      const twelveMonthMagazines = sortedMagazines.slice(0, 12);
      
      setFilteredMagazines(twelveMonthMagazines);
    }
  };

  if (loading) {
    return (
      <ShimmerWrapper>
        <MagazineContainer aria-labelledby="march-karnataka-gallery-heading">
          <SectionHeader>
            <TitleWrapper>
              <ShimmerTitle aria-label={t.loading} />
            </TitleWrapper>
            <YearFilterWrapper>
              <ShimmerFilter />
            </YearFilterWrapper>
          </SectionHeader>
          
          <MagazineGrid>
            {[...Array(12)].map((_, index) => (
              <ShimmerCard key={index}>
                <ShimmerImageBox />
                <ShimmerButton />
              </ShimmerCard>
            ))}
          </MagazineGrid>
        </MagazineContainer>
      </ShimmerWrapper>
    );
  }

  // Check if we have search results (when searchQuery is set and we have results)
  const hasSearchResults = searchQuery && filteredMagazines.length > 0 && filteredMagazines[0].score !== undefined;
  console.log('hasSearchResults check:', {
    searchQuery,
    filteredMagazinesLength: filteredMagazines.length,
    firstResultScore: filteredMagazines[0]?.score,
    hasSearchResults
  });

  return (
    <MagazineContainer aria-labelledby="march-karnataka-gallery-heading">
      {hasSearchResults ? (
        // Search Results Layout
        <>
          <SectionHeader>
            <TitleWrapper>
              <PageTitle id="march-karnataka-gallery-heading">
                {filteredMagazines[0]?.title || 'Search Results'}
              </PageTitle>
              {filteredMagazines[0] && (
                <SelectedYearText aria-live="polite">
                 
                </SelectedYearText>
              )}
            </TitleWrapper>
          </SectionHeader>

          {/* Display the highest scoring result content */}
          {filteredMagazines[0] && (
            <div style={{
              padding: '20px',
              marginBottom: '30px',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              border: '1px solid #e9ecef'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#333',
                marginBottom: '15px'
              }}>
                {filteredMagazines[0].description}
              </h3>
              {filteredMagazines[0].content && (
                <div style={{
                  fontSize: '14px',
                  lineHeight: '1.6',
                  color: '#666',
                  maxHeight: '200px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {filteredMagazines[0].content}
                  
                </div>
              )}
            </div>
          )}

          {/* Magazine Cards Grid */}
          <MagazineGrid role="list" aria-label="Search result magazines">
            {filteredMagazines.length > 1 ? (
              filteredMagazines.slice(1).map((magazine) => (
                <MagazineCard
                  key={magazine._id}
                  role="listitem"
                  onClick={() => handleMagazineClick(magazine._id)}
                  style={{ cursor: 'pointer' }}
                >
                  <MagazineImageWrapper>
                    <MagazineImage
                      src={magazine.magazineThumbnail}
                      alt={getLocalizedMagazineData(magazine, 'title') || `${magazine.publishedMonth || magazine.published_month} ${magazine.publishedYear || magazine.published_year} ${t.edition}`}
                      loading="lazy"
                    />
                  </MagazineImageWrapper>

                  <DownloadButton
                    onClick={(e) => handleDownload(e, magazine.magazinePdf || magazine.pdf_url, getLocalizedMagazineData(magazine, 'title'))}
                    aria-label={`${t.download} ${magazine.publishedMonth || magazine.published_month} ${magazine.publishedYear || magazine.published_year}`}
                  >
                    <ImFolderDownload aria-hidden="true" />
                    {t.download}
                  </DownloadButton>
                </MagazineCard>
              ))
            ) : (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>
                No additional magazines found
              </div>
            )}
          </MagazineGrid>
        </>
      ) : (
        // Regular Magazine Layout
        <>
          <SectionHeader>
            <TitleWrapper>
              <PageTitle id="march-karnataka-gallery-heading">{t.title}</PageTitle>
              {selectedYear && <SelectedYearText aria-live="polite">{selectedYear}</SelectedYearText>}
            </TitleWrapper>
            <YearFilterWrapper>
              <YearFilter value={selectedYear} onChange={handleYearChange} aria-label={t.selectYear}>
                <option value="">{t.selectYear}</option>
                {availableYears.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </YearFilter>
              <YearFilterIcon aria-hidden="true">
                <IoChevronDownOutline />
              </YearFilterIcon>
            </YearFilterWrapper>
          </SectionHeader>

          <MagazineGrid role="list" aria-label="Magazine collection">
            {filteredMagazines.length > 0 ? (
              filteredMagazines.map((magazine) => (
                <MagazineCard
                  key={magazine._id}
                  role="listitem"
                  onClick={() => handleMagazineClick(magazine._id)}
                  style={{ cursor: 'pointer' }}
                >
                  <MagazineImageWrapper>
                    <MagazineImage
                      src={magazine.magazineThumbnail}
                      alt={getLocalizedMagazineData(magazine, 'title') || `${magazine.publishedMonth || magazine.published_month} ${magazine.publishedYear || magazine.published_year} ${t.edition}`}
                      loading="lazy"
                    />
                  </MagazineImageWrapper>

                  <DownloadButton
                    onClick={(e) => handleDownload(e, magazine.magazinePdf || magazine.pdf_url, getLocalizedMagazineData(magazine, 'title'))}
                    aria-label={`${t.download} ${magazine.publishedMonth || magazine.published_month} ${magazine.publishedYear || magazine.published_year}`}
                  >
                    <ImFolderDownload aria-hidden="true" />
                    {t.download}
                  </DownloadButton>
                </MagazineCard>
              ))
            ) : (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>
                {t.noMagazines}
              </div>
            )}
          </MagazineGrid>
        </>
      )}
    </MagazineContainer>
  );
}

