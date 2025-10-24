import styled from "styled-components";
import theme from "../../../theme/Theme";

export const SavedListItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  `;
export const SavedListItemsHeader = styled.div`
  width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  `;
export const SavedListItemsTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  margin: 0;
  `;
  export const SavedNewsItemsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  `;
export const SavedNewsItem = styled.li`
  width: 100%;
    padding: 10px;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  &:hover {
    background-color: ${props => props.theme.colors.hover};
  }
`;
export const SavedNewsItemTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  margin: 0;
  `;
export const SavedNewsItemDetails = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.colors.textSecondary};  `;
