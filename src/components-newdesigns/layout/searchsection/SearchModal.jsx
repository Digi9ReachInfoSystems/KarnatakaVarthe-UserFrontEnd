import React, { useState, useEffect, useRef } from 'react';
import { Search, X, FileText, BookOpen, Clock, TrendingUp } from 'lucide-react';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // all, magazines, news
  const [recentSearches, setRecentSearches] = useState([]);
  const searchInputRef = useRef(null);

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

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      addToRecentSearches(searchQuery);
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

          {showResults && (
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
          {!showResults ? (
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
      </ModalContainer>
    </ModalOverlay>
  );
};

export default SearchModal;
