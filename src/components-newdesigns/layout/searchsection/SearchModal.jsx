import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, FileText, BookOpen, Clock, TrendingUp } from 'lucide-react';
import { getMagazineContext } from '../../../services/searchapi/SearchApi';
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  CloseButton,
  SearchInputContainer,
  SearchInput,
  SearchIconWrapper,
  TabContainer,
  Tab,
  ResultsContainer,
  ResultItem,
  ResultIcon,
  ResultContent,
  ResultTitle,
  ResultDescription,
  ResultMeta,
  NoResults,
  RecentSearches,
  RecentTitle,
  RecentItem,
  ClearRecent,
  TrendingSection,
  TrendingTitle,
  TrendingTag
} from './SearchModal.styles';

// Static mock data for magazines
const mockMagazines = [
  { id: 1, title: 'Karnataka Development Magazine', description: 'Latest updates on state development', date: 'October 2024' },
  { id: 2, title: 'Vartha Janapada', description: 'Monthly news compilation', date: 'September 2024' },
  { id: 3, title: 'March of Karnataka', description: 'Progress and achievements', date: 'August 2024' },
  { id: 4, title: 'State Policy Magazine', description: 'Government policies and initiatives', date: 'October 2024' },
  { id: 5, title: 'Karnataka Today', description: 'Current affairs and news', date: 'September 2024' },
];

// Static mock data for news
const mockNews = [
  { id: 1, title: 'Chief Minister announces new development projects', description: 'Major infrastructure initiatives launched', date: '2 hours ago' },
  { id: 2, title: 'Karnataka leads in IT sector growth', description: 'State achieves highest growth rate', date: '5 hours ago' },
  { id: 3, title: 'New education policy implementation', description: 'Schools to adopt new curriculum', date: '1 day ago' },
  { id: 4, title: 'Healthcare facilities expansion announced', description: 'New hospitals to be built across state', date: '2 days ago' },
  { id: 5, title: 'Agricultural reforms boost farmer income', description: 'New initiatives show positive results', date: '3 days ago' },
  { id: 6, title: 'Tourism sector sees record growth', description: 'State attracts more visitors this year', date: '4 days ago' },
];

const trendingSearches = [
  'Chief Minister',
  'Development Projects',
  'Education Policy',
  'Healthcare',
  'IT Sector',
  'Agriculture',
];

const SearchModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // all, magazines, news
  const [recentSearches, setRecentSearches] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const searchInputRef = useRef(null);
  const debounceTimeoutRef = useRef(null);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);

    // Clear existing timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // Set new timeout for debounced API call and console logging
    debounceTimeoutRef.current = setTimeout(async () => {
      if (query.trim()) {
        console.log(`User searched for: "${query}"`);
        setIsSearching(true);

        try {
          const response = await getMagazineContext(query.trim());
          setSearchResults(response);
          console.log('Search results:', response);
        } catch (error) {
          console.error('Search API error:', error);
          setSearchResults({ results: [] }); // Set empty results array to indicate search completed
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults(null);
      }
    }, 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      addToRecentSearches(searchQuery);
      // Navigate to March of Karnataka Magazine page with search query
      navigate('/marchofkarnatakmagzine', {
        state: { searchQuery: searchQuery.trim() }
      });
      onClose(); // Close the search modal
    }
  };

  const addToRecentSearches = (query) => {
    const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  const handleRecentClick = (query) => {
    setSearchQuery(query);
  };

  const handleTrendingClick = (query) => {
    setSearchQuery(query);
    addToRecentSearches(query);
  };

  // Filter results based on search query and active tab
  const filterResults = (items, type) => {
    if (!searchQuery.trim()) return [];
    
    return items.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredMagazines = filterResults(mockMagazines, 'magazine');
  const filteredNews = filterResults(mockNews, 'news');

  const showResults = searchQuery.trim().length > 0;
  const hasResults = filteredMagazines.length > 0 || filteredNews.length > 0;

  // Get the highest scoring result from API
  const getTopResult = () => {
    if (!searchResults?.results || searchResults.results.length === 0) return null;
    return searchResults.results.reduce((max, current) =>
      current.score > max.score ? current : max
    );
  };

  const topResult = getTopResult();

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <SearchInputContainer>
            <SearchIconWrapper>
              <Search size={22} />
            </SearchIconWrapper>
            <SearchInput
              ref={searchInputRef}
              type="text"
              placeholder="Search for magazines, news, articles..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <CloseButton onClick={onClose} aria-label="Close search">
              <X size={24} />
            </CloseButton>
          </SearchInputContainer>

          {showResults && !topResult && !searchResults && (
            <TabContainer>
              <Tab
                active={activeTab === 'all'}
                onClick={() => setActiveTab('all')}
              >
                All ({filteredMagazines.length + filteredNews.length})
              </Tab>
              <Tab
                active={activeTab === 'magazines'}
                onClick={() => setActiveTab('magazines')}
              >
                Magazines ({filteredMagazines.length})
              </Tab>
              <Tab
                active={activeTab === 'news'}
                onClick={() => setActiveTab('news')}
              >
                News ({filteredNews.length})
              </Tab>
            </TabContainer>
          )}
        </ModalHeader>

        <ResultsContainer>
          {isSearching ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p>Searching...</p>
            </div>
          ) : topResult ? (
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1a1a1a', marginBottom: '16px', marginTop: '0' }}>
                {searchQuery}
              </h3>
              <ResultItem>
                <ResultIcon>
                  <BookOpen size={20} />
                </ResultIcon>
                <ResultContent>
                  <ResultTitle>{topResult.title}</ResultTitle>
                  <ResultDescription>{topResult.description}</ResultDescription>
                  <ResultMeta>
                    {topResult.published_month} {topResult.published_year} • Score: {topResult.score.toFixed(4)}
                  </ResultMeta>
                  {topResult.content && (
                    <div style={{ marginTop: '8px', fontSize: '13px', color: '#666', lineHeight: '1.4' }}>
                      {topResult.content.length > 200
                        ? `${topResult.content.substring(0, 200)}...`
                        : topResult.content
                      }
                    </div>
                  )}
                </ResultContent>
              </ResultItem>
            </div>
          ) : showResults && searchResults ? (
            // API search completed but no results
            <NoResults>
              <Search size={48} />
              <h3>No results found</h3>
              <p>Try searching with different keywords</p>
            </NoResults>
          ) : !showResults ? (
            <>
              {recentSearches.length > 0 && (
                <RecentSearches>
                  <RecentTitle>
                    <Clock size={18} />
                    <span>Recent Searches</span>
                    <ClearRecent onClick={clearRecentSearches}>Clear</ClearRecent>
                  </RecentTitle>
                  {recentSearches.map((query, index) => (
                    <RecentItem key={index} onClick={() => handleRecentClick(query)}>
                      <Clock size={16} />
                      <span>{query}</span>
                    </RecentItem>
                  ))}
                </RecentSearches>
              )}

              <TrendingSection>
                <TrendingTitle>
                  <TrendingUp size={18} />
                  <span>Trending Searches</span>
                </TrendingTitle>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {trendingSearches.map((query, index) => (
                    <TrendingTag key={index} onClick={() => handleTrendingClick(query)}>
                      {query}
                    </TrendingTag>
                  ))}
                </div>
              </TrendingSection>
            </>
          ) : hasResults ? (
            <>
              {(activeTab === 'all' || activeTab === 'magazines') && filteredMagazines.length > 0 && (
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#404040', marginBottom: '12px', marginTop: '0' }}>
                    Magazines
                  </h3>
                  {filteredMagazines.map((magazine) => (
                    <ResultItem key={`magazine-${magazine.id}`}>
                      <ResultIcon>
                        <BookOpen size={20} />
                      </ResultIcon>
                      <ResultContent>
                        <ResultTitle>{magazine.title}</ResultTitle>
                        <ResultDescription>{magazine.description}</ResultDescription>
                        <ResultMeta>{magazine.date}</ResultMeta>
                      </ResultContent>
                    </ResultItem>
                  ))}
                </div>
              )}

              {(activeTab === 'all' || activeTab === 'news') && filteredNews.length > 0 && (
                <div style={{ marginTop: activeTab === 'all' && filteredMagazines.length > 0 ? '24px' : '0' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#404040', marginBottom: '12px', marginTop: '0' }}>
                    News
                  </h3>
                  {filteredNews.map((news) => (
                    <ResultItem key={`news-${news.id}`}>
                      <ResultIcon>
                        <FileText size={20} />
                      </ResultIcon>
                      <ResultContent>
                        <ResultTitle>{news.title}</ResultTitle>
                        <ResultDescription>{news.description}</ResultDescription>
                        <ResultMeta>{news.date}</ResultMeta>
                      </ResultContent>
                    </ResultItem>
                  ))}
                </div>
              )}
            </>
          ) : (
            <NoResults>
              <Search size={48} />
              <h3>No results found</h3>
              <p>Try searching with different keywords</p>
            </NoResults>
          )}
        </ResultsContainer>

        {/* Action Button */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid #e5e7eb',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <button
            style={{
              backgroundColor: '#1f2937',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              minWidth: '120px'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#374151'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#1f2937'}
            onClick={() => {
              // Navigate to March of Karnataka Magazine page with search query
              navigate('/marchofkarnatakmagzine', {
                state: { searchQuery: searchQuery.trim() }
              });
              onClose(); // Close the search modal
            }}
          >
            View All Results
          </button>
        </div>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default SearchModal;
