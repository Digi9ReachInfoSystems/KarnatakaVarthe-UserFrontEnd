import { useEffect, useRef, useState, useCallback } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { AiOutlineSearch } from "react-icons/ai"
import { SearchMagazineApi } from "../../services/searchapi/SearchApi" // Assuming this API is still relevant

import {
  ModalOverlay,
  ModalContent,
  ModalTitle,
  TabsContainer,
  TabButton,
  TabContent,
  SearchInputContainer,
  SearchInput,
  SearchIcon,
  SuggestionsContainer,
  SuggestionItem,
  SuggestionContent,
  SuggestionTitle,
  SuggestionDate,
  ResultCount,
  LoadingIndicator,
  NoResults,
} from "./SearchCategoryModal.styles"

const categories = ["Magazine", "Vartha", "Janapada", "March of Karnataka", "News"]

const SearchCategoryModal = ({ onClose, triggerRef, openPdfModal, closePdfModal, isPdfModalOpen }) => {
  const modalRef = useRef(null)
  const searchInputRef = useRef(null)
  const suggestionsRef = useRef(null)

  const [activeTab, setActiveTab] = useState(categories[0])
  const [searchText, setSearchText] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1)

  // Translations for modal content (can be integrated with LanguageContext if needed)
  const translations = {
    searchPlaceholder: "Search within this category...",
    noResults: "No results found.",
    resultsCount: "results found",
    searching: "Searching...",
    selectCategory: "Select a Category",
  }

  const debounce = (func, delay) => {
    let timeoutId
    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(() => func.apply(null, args), delay)
    }
  }

  const handleSearch = useCallback(async (query, category) => {
    if (!query.trim()) {
      setSuggestions([])
      setShowSuggestions(false)
      setSelectedSuggestionIndex(-1)
      return
    }
    setIsSearching(true)
    setShowSuggestions(true)
    try {
      // Modify SearchMagazineApi to accept category if it doesn't already, or filter results
      const response = await SearchMagazineApi(query, category) // Assuming API can take category
      const sortedResults = Array.isArray(response.data)
        ? [...response.data].sort(
            (a, b) => new Date(b.createdTime || b.date || 0) - new Date(a.createdTime || a.date || 0),
          )
        : []
      setSuggestions(sortedResults)
      setSelectedSuggestionIndex(-1)
    } catch (error) {
      console.error("Search Error:", error)
      setSuggestions([])
      setSelectedSuggestionIndex(-1)
    } finally {
      setIsSearching(false)
    }
  }, [])

  const debouncedSearch = useCallback(debounce(handleSearch, 300), [handleSearch])

  useEffect(() => {
    debouncedSearch(searchText, activeTab)
  }, [searchText, activeTab, debouncedSearch])

  // Reset search state when tab changes
  useEffect(() => {
    setSearchText("")
    setSuggestions([])
    setIsSearching(false)
    setShowSuggestions(false)
    setSelectedSuggestionIndex(-1)
  }, [activeTab])

  const handleSuggestionClick = (suggestion) => {
    openPdfModal(suggestion.magazinePdf, suggestion.title)
    // Optionally, close the search modal after opening PDF modal
    // onClose();
  }

  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedSuggestionIndex((prev) => {
          const newIndex = prev === suggestions.length - 1 ? 0 : prev + 1
          if (suggestionsRef.current) {
            const item = suggestionsRef.current.children[newIndex + 1] // +1 for ResultCount div
            item?.scrollIntoView({ behavior: "smooth", block: "nearest" })
          }
          return newIndex
        })
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedSuggestionIndex((prev) => {
          const newIndex = prev === 0 ? suggestions.length - 1 : prev - 1
          if (suggestionsRef.current) {
            const item = suggestionsRef.current.children[newIndex + 1] // +1 for ResultCount div
            item?.scrollIntoView({ behavior: "smooth", block: "nearest" })
          }
          return newIndex
        })
        break
      case "Enter":
        e.preventDefault()
        if (selectedSuggestionIndex >= 0 && selectedSuggestionIndex < suggestions.length) {
          handleSuggestionClick(suggestions[selectedSuggestionIndex])
        }
        break
      case "Escape":
        setShowSuggestions(false)
        setSelectedSuggestionIndex(-1)
        searchInputRef.current?.blur()
        break
      default:
        break
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return ""
    return date.toLocaleDateString()
  }

  // Calculate modal position relative to the trigger element (search input)
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0, width: 0 })
  useEffect(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      setModalPosition({
        top: rect.bottom + 8, // 8px below the search input
        left: rect.left,
        width: rect.width,
      })
    }
  }, [triggerRef])

  // Focus trap and Escape key handling
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !isPdfModalOpen) {
        // Only close if PDF modal is not open
        onClose()
      }
      // Implement focus trapping if needed for full accessibility
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [onClose, isPdfModalOpen])

  // Close suggestions when clicking outside the search input/suggestions within the modal
  useEffect(() => {
    const handleClickOutsideSearch = (event) => {
      if (
        showSuggestions &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false)
        setSelectedSuggestionIndex(-1)
      }
    }
    document.addEventListener("mousedown", handleClickOutsideSearch)
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideSearch)
    }
  }, [showSuggestions])

  return createPortal(
    <ModalOverlay
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose} // Close on overlay click
      className="search-category-modal" // Class for click outside detection in ToolBar
      role="presentation"
    >
      <ModalContent
        ref={modalRef}
        as={motion.div}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.2 }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="search-modal-title"
        style={{ top: modalPosition.top, left: modalPosition.left, width: modalPosition.width }}
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside modal from closing it
      >
        <ModalTitle id="search-modal-title">{translations.selectCategory}</ModalTitle>

        <TabsContainer role="tablist" aria-label="Search Categories">
          {categories.map((category) => (
            <TabButton
              key={category}
              role="tab"
              aria-selected={activeTab === category}
              tabIndex={activeTab === category ? 0 : -1}
              onClick={() => setActiveTab(category)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  setActiveTab(category)
                }
              }}
            >
              {category}
            </TabButton>
          ))}
        </TabsContainer>

        <TabContent role="tabpanel" aria-labelledby={`tab-${activeTab}`}>
          <SearchInputContainer>
            <SearchIcon aria-hidden="true">
              <AiOutlineSearch />
            </SearchIcon>
            <SearchInput
              ref={searchInputRef}
              type="text"
              placeholder={`${translations.searchPlaceholder} (${activeTab})`}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onFocus={() => {
                if (searchText.trim() && suggestions.length > 0) {
                  setShowSuggestions(true)
                }
              }}
              onKeyDown={handleKeyDown}
              aria-label={`Search within ${activeTab}`}
              aria-expanded={showSuggestions}
              aria-controls="search-suggestions-list"
              aria-activedescendant={selectedSuggestionIndex >= 0 ? `suggestion-${selectedSuggestionIndex}` : undefined}
              role="combobox"
              aria-autocomplete="list"
            />
          </SearchInputContainer>

          <AnimatePresence>
            {showSuggestions && searchText.trim() && (
              <SuggestionsContainer
                ref={suggestionsRef}
                as={motion.div}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                id="search-suggestions-list"
                role="listbox"
                aria-label="Search suggestions"
              >
                {isSearching ? (
                  <LoadingIndicator aria-live="polite">{translations.searching}</LoadingIndicator>
                ) : suggestions.length > 0 ? (
                  <>
                    <ResultCount>
                      {suggestions.length} {translations.resultsCount}
                    </ResultCount>
                    {suggestions.map((suggestion, index) => (
                      <SuggestionItem
                        as={motion.div}
                        key={index}
                        id={`suggestion-${index}`}
                        onClick={() => handleSuggestionClick(suggestion)}
                        whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                        transition={{ duration: 0.1 }}
                        role="option"
                        aria-selected={index === selectedSuggestionIndex}
                        tabIndex="0"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault()
                            handleSuggestionClick(suggestion)
                          }
                        }}
                      >
                        <SuggestionContent>
                          <SuggestionTitle>{suggestion.title}</SuggestionTitle>
                          <SuggestionDate>{formatDate(suggestion.createdTime || suggestion.date)}</SuggestionDate>
                        </SuggestionContent>
                      </SuggestionItem>
                    ))}
                  </>
                ) : (
                  <NoResults role="status" aria-live="polite">
                    {translations.noResults}
                  </NoResults>
                )}
              </SuggestionsContainer>
            )}
          </AnimatePresence>
        </TabContent>
      </ModalContent>
    </ModalOverlay>,
    document.body,
  )
}

export default SearchCategoryModal
