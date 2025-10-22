import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, BookOpen } from 'lucide-react';
import { getMagazineContext } from '../../../services/searchapi/SearchApi';
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  CloseButton,
  SearchInputContainer,
  SearchInput,
  SearchIconWrapper,
  ResultsContainer,
  ResultItem,
  ResultIcon,
  ResultContent,
  ResultTitle,
  ResultDescription,
  ResultMeta,
  NoResults
} from './SearchModal.styles';

// ...existing code...

const SearchModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  // Remove tabs and recent/trending searches
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const searchInputRef = useRef(null);
  const debounceTimeoutRef = useRef(null);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // ...existing code...

  // ...existing code...

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
      navigate('/marchofkarnatakmagzine', {
        state: { searchQuery: searchQuery.trim() }
      });
      onClose(); // Close the search modal
    }
  };

  // ...existing code...

  const showResults = searchQuery.trim().length > 0;

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
          ) : null}
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
