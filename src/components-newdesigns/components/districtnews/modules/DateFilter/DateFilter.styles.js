import styled from "styled-components"
import theme from "../../../../../theme/Theme"

export const DateFilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  gap: ${theme.spacing1(1)};
  flex-shrink: 0;
  margin-left: auto;
  margin-bottom: ${theme.spacing1(2)};

  @media (max-width: ${theme.breakpoints.tablet}) {
    margin-left: auto;
    margin-top: 0;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-top: 0;
    width: 100%;
    margin-left: 0;
    margin-bottom: ${theme.spacing1(1.5)};
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    gap: ${theme.spacing1(0.5)};
  }
`

export const FilterLabel = styled.span`
  display: flex;
  align-items: center;
  gap: ${theme.spacing1(0.5)};
  font-size: clamp(13px, 1.4vw, 15px);
  font-weight: 600;
  color: ${theme.colors.text || theme.colors.gray[800]};
  font-family: ${theme.fonts.body};
  white-space: nowrap;

  svg {
    width: 16px;
    height: 16px;
    stroke: currentColor;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: none;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    display: flex;
    font-size: 11px;
    color: ${theme.colors.text || theme.colors.gray[800]};
    flex-shrink: 0;
    
    svg {
      width: 12px;
      height: 12px;
    }
  }
`

export const DateFilterWrapper = styled.div`
  position: relative;
  display: flex;
  gap: ${theme.spacing1(1)};
  align-items: center;

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: row;
    width: auto;
    gap: ${theme.spacing1(0.5)};
    align-items: center;
    justify-content: flex-end;
  }
`

export const DatePickerInput = styled.input`
  padding: ${theme.spacing1(1.5)} ${theme.spacing1(3)} ${theme.spacing1(1.5)} ${theme.spacing1(2.5)};
  border: 1px solid ${theme.colors.gray[300]};
  border-radius: 8px;
  background: ${theme.colors.white};
  color: ${theme.colors.text || theme.colors.gray[800]};
  font-size: clamp(13px, 1.4vw, 15px);
  font-weight: 500;
  font-family: ${theme.fonts.body};
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 200px;
  padding-right: ${theme.spacing1(10)};
  position: relative;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='4' width='18' height='18' rx='2' ry='2'%3E%3C/rect%3E%3Cline x1='16' y1='2' x2='16' y2='6'%3E%3C/line%3E%3Cline x1='8' y1='2' x2='8' y2='6'%3E%3C/line%3E%3Cline x1='3' y1='10' x2='21' y2='10'%3E%3C/line%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right ${theme.spacing1(2.5)} center;
  background-size: 18px;

  &::placeholder {
    color: ${theme.colors.gray[400]};
  }

  &:hover {
    border-color: ${theme.colors.primary};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    min-width: 180px;
    font-size: 14px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    min-width: 0;
    width: auto;
    max-width: 150px;
    font-size: 11px;
    padding: ${theme.spacing1(1)} ${theme.spacing1(2)} ${theme.spacing1(1)} ${theme.spacing1(1.5)};
    padding-right: ${theme.spacing1(7)};
    background-size: 14px;
    background-position: right ${theme.spacing1(1.5)} center;
  }
`

export const CalendarDropdown = styled.div`
  position: absolute;
  top: calc(100% + ${theme.spacing1(1)});
  right: 0;
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray[300]};
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: ${theme.spacing1(2.5)};
  z-index: 1000;
  min-width: 320px;
  max-width: 350px;

  @media (max-width: ${theme.breakpoints.mobile}) {
    transform: none;
    width: 90vw;
    max-width: 320px;
    min-width: 280px;
  }
`

export const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing1(2)};
  padding-bottom: ${theme.spacing1(1.5)};
  border-bottom: 1px solid ${theme.colors.gray[200]};
  font-weight: 600;
  font-size: 16px;
  color: ${theme.colors.text || theme.colors.gray[800]};
`

export const CalendarNavButton = styled.button`
  background: ${theme.colors.gray[100]};
  border: none;
  border-radius: 6px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 20px;
  color: ${theme.colors.text || theme.colors.gray[800]};
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
  }

  &:active {
    transform: scale(0.95);
  }
`

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: ${theme.spacing1(0.5)};
`

export const CalendarDay = styled.div`
  text-align: center;
  font-weight: 600;
  font-size: 12px;
  color: ${theme.colors.gray[600]};
  padding: ${theme.spacing1(1)} 0;
  text-transform: uppercase;
`

export const CalendarDateCell = styled.button`
  aspect-ratio: 1;
  border: none;
  background: ${props => {
    if (props.selected) return theme.colors.primary;
    if (props.today) return theme.colors.gray[100];
    return 'transparent';
  }};
  color: ${props => {
    if (props.disabled || props.future) return theme.colors.gray[300];
    if (props.selected) return theme.colors.white;
    if (props.today) return theme.colors.primary;
    return theme.colors.text || theme.colors.gray[800];
  }};
  border-radius: 6px;
  cursor: ${props => props.disabled || props.future ? 'not-allowed' : 'pointer'};
  font-size: 14px;
  font-weight: ${props => props.today || props.selected ? '600' : '400'};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  opacity: ${props => props.disabled || props.future ? '0.4' : '1'};

  &:hover {
    background: ${props => {
      if (props.disabled || props.future) return 'transparent';
      return props.selected ? theme.colors.primary : theme.colors.gray[100];
    }};
    transform: ${props => props.disabled || props.future ? 'none' : 'scale(1.05)'};
  }

  ${props => props.today && !props.selected && !props.disabled && !props.future && `
    border: 2px solid ${theme.colors.primary};
  `}
`

export const ClearButton = styled.button`
  padding: ${theme.spacing1(1.5)} ${theme.spacing1(2.5)};
  border: 1px solid ${theme.colors.gray[300]};
  border-radius: 8px;
  background: ${theme.colors.white};
  color: ${theme.colors.text || theme.colors.gray[800]};
  font-size: clamp(12px, 1.3vw, 14px);
  font-weight: 500;
  font-family: ${theme.fonts.body};
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: ${theme.colors.gray[100]};
    border-color: ${theme.colors.gray[400]};
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing1(1)} ${theme.spacing1(1.5)};
    font-size: 11px;
    flex-shrink: 0;
  }
`
