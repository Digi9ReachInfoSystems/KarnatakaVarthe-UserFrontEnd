import React, { useState, useContext, useRef, useEffect } from 'react'
import { LanguageContext } from '../../../../../context/LanguageContext'
import {
  DateFilterContainer,
  FilterLabel,
  DateFilterWrapper,
  DatePickerInput,
  CalendarDropdown,
  CalendarHeader,
  CalendarNavButton,
  CalendarGrid,
  CalendarDay,
  CalendarDateCell,
  ClearButton,
} from './DateFilter.styles'

const texts = {
  English: {
    filterBy: "Filter by:",
    pickDate: "Pick a date",
    clear: "Clear"
  },
  Kannada: {
    filterBy: "ಫಿಲ್ಟರ್ ಮಾಡಿ:",
    pickDate: "ದಿನಾಂಕವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    clear: "ಸ್ಪಷ್ಟ"
  },
  Hindi: {
    filterBy: "फ़िल्टर करें:",
    pickDate: "एक तारीख चुनें",
    clear: "साफ़ करें"
  }
}

export default function DateFilter({ onDateChange }) {
  const { language } = useContext(LanguageContext)
  const [selectedDate, setSelectedDate] = useState(null)
  const [showCalendar, setShowCalendar] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const calendarRef = useRef(null)
  const inputRef = useRef(null)

  const localizedTexts = texts[language] || texts.English

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        calendarRef.current && 
        !calendarRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setShowCalendar(false)
      }
    }
    if (showCalendar) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showCalendar])

  const handleDateSelect = (date) => {
    // Format date as YYYY-MM-DD in local timezone (not UTC)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const dateStr = `${year}-${month}-${day}`
    console.log('📅 DateFilter - Date selected:', dateStr)
    setSelectedDate(dateStr)
    setShowCalendar(false)
    console.log('🚀 DateFilter - Calling onDateChange with:', { date: dateStr })
    onDateChange({ date: dateStr })
  }

  const handleClear = () => {
    setSelectedDate(null)
    setShowCalendar(false)
    onDateChange(null)
  }

  const formatSelectedDate = (dateStr) => {
    if (!dateStr) return localizedTexts.pickDate
    const date = new Date(dateStr)
    return date.toLocaleDateString(language === 'Kannada' ? 'en-IN' : language === 'Hindi' ? 'en-IN' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // Calendar functions
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay()
  }

  const navigateMonth = (direction) => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11)
        setCurrentYear(currentYear - 1)
      } else {
        setCurrentMonth(currentMonth - 1)
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0)
        setCurrentYear(currentYear + 1)
      } else {
        setCurrentMonth(currentMonth + 1)
      }
    }
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear)
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    // Format today in local timezone (not UTC)
    const todayYear = today.getFullYear()
    const todayMonth = String(today.getMonth() + 1).padStart(2, '0')
    const todayDay = String(today.getDate()).padStart(2, '0')
    const todayStr = `${todayYear}-${todayMonth}-${todayDay}`
    
    const monthNames = language === 'Kannada' 
      ? ['ಜನವರಿ', 'ಫೆಬ್ರವರಿ', 'ಮಾರ್ಚ್', 'ಏಪ್ರಿಲ್', 'ಮೇ', 'ಜೂನ್', 'ಜುಲೈ', 'ಆಗಸ್ಟ್', 'ಸೆಪ್ಟೆಂಬರ್', 'ಅಕ್ಟೋಬರ್', 'ನವೆಂಬರ್', 'ಡಿಸೆಂಬರ್']
      : language === 'Hindi'
      ? ['जनवरी', 'फरवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर']
      : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    
    const dayNames = language === 'Kannada'
      ? ['ಭಾನು', 'ಸೋಮ', 'ಮಂಗಳ', 'ಬುಧ', 'ಗುರು', 'ಶುಕ್ರ', 'ಶನಿ']
      : language === 'Hindi'
      ? ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि']
      : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    const days = []
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day)
      date.setHours(0, 0, 0, 0)
      // Format date in local timezone (not UTC) to match handleDateSelect
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const dayStr = String(date.getDate()).padStart(2, '0')
      const dateStr = `${year}-${month}-${dayStr}`
      const isToday = dateStr === todayStr
      const isSelected = selectedDate === dateStr
      // Check if date is in the future
      const isFuture = date > today
      
      days.push({
        day,
        date,
        dateStr,
        isToday,
        isSelected,
        isFuture
      })
    }

    return (
      <CalendarDropdown ref={calendarRef}>
        <CalendarHeader>
          <CalendarNavButton onClick={() => navigateMonth('prev')} aria-label="Previous month">
            ‹
          </CalendarNavButton>
          <span>{monthNames[currentMonth]} {currentYear}</span>
          <CalendarNavButton onClick={() => navigateMonth('next')} aria-label="Next month">
            ›
          </CalendarNavButton>
        </CalendarHeader>
        <CalendarGrid>
          {dayNames.map(day => (
            <CalendarDay key={day}>{day}</CalendarDay>
          ))}
          {days.map((dayData, index) => {
            if (dayData === null) {
              return <CalendarDateCell key={`empty-${index}`} />
            }
            return (
              <CalendarDateCell
                key={dayData.dateStr}
                today={dayData.isToday}
                selected={dayData.isSelected}
                future={dayData.isFuture}
                onClick={() => !dayData.isFuture && handleDateSelect(dayData.date)}
                disabled={dayData.isFuture}
              >
                {dayData.day}
              </CalendarDateCell>
            )
          })}
        </CalendarGrid>
      </CalendarDropdown>
    )
  }

  return (
    <DateFilterContainer>
      <FilterLabel>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
        {localizedTexts.filterBy}
      </FilterLabel>
      <DateFilterWrapper>
        <div style={{ position: 'relative' }}>
          <DatePickerInput
            ref={inputRef}
            type="text"
            readOnly
            value={formatSelectedDate(selectedDate)}
            onClick={() => setShowCalendar(!showCalendar)}
            placeholder={localizedTexts.pickDate}
            aria-label={localizedTexts.pickDate}
          />
          {showCalendar && renderCalendar()}
        </div>

        {selectedDate && (
          <ClearButton
            onClick={handleClear}
            aria-label={localizedTexts.clear}
          >
            {localizedTexts.clear}
          </ClearButton>
        )}
      </DateFilterWrapper>
    </DateFilterContainer>
  )
}
