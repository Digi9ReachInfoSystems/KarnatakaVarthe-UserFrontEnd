import styled from "styled-components";
import theme from "../../../../theme/Theme";

export const ExclusiveNewsContainer = styled.div`
  width: 100%;
  max-width: ${theme.spacing(50)};
  margin: auto;
  padding: ${theme.spacing(2)};
  background: ${theme.colors.background};
  font-family: ${theme.fonts.body};

  @media (max-width: ${theme.breakpoints.tablet}) {
    max-width: 100%;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    max-width: 100%;
    padding: ${theme.spacing(1)};
    padding-right: ${theme.spacing(1)};
  }
`;

export const ExclusiveNewsHeader = styled.h2`
  font-size: ${theme.spacing(3)};
  color: ${theme.colors.black};
  font-family: ${theme.fonts.heading};
  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.spacing(3.5)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(3)};
  }
`;

export const ExclusiveNewsTabContainer = styled.div`
  display: flex;
  overflow-x: auto;
  scrollbar-width: thin; /* For Firefox */
  scrollbar-color: ${theme.colors.primary} ${theme.colors.light}; /* For Firefox */

  &::-webkit-scrollbar {
    height: ${theme.spacing(0.5)};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${theme.colors.primary};
    border-radius: ${theme.spacing(0.25)};
  }

  &::-webkit-scrollbar-track {
    background-color: ${theme.colors.light};
  }

  border-bottom: ${theme.spacing(0.25)} solid ${theme.colors.info};
  margin-bottom: ${theme.spacing(2)};

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: ${theme.spacing(1)};
  }
`;

export const ExclusiveNewsTab = styled.button`
  background: none;
  border: none;
  padding: ${theme.spacing(1)} ${theme.spacing(2)};
  cursor: pointer;
  font-size: ${theme.spacing(2)};
  font-weight: bold;
  color: ${({ active }) => (active ? theme.colors.primary : theme.colors.black)};
  border-bottom: ${({ active }) =>
    active ? `${theme.spacing(0.375)} solid ${theme.colors.primary}` : "none"};
  white-space: nowrap; /* Prevent text wrapping */

  &:hover {
    color: ${theme.colors.primary};
  }
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(1.75)};
    padding: ${theme.spacing(0.75)};
  }
`;

export const ExclusiveNewsVideoTab = styled(ExclusiveNewsTab)`
  color: ${({ active }) => (active ? theme.colors.secondary : theme.colors.black)};
  border-bottom: ${({ active }) =>
    active ? `${theme.spacing(0.375)} solid ${theme.colors.secondary}` : "none"};
`;

export const ExclusiveNewsContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(2)};
`;

export const ExclusiveNewsCard = styled.div`
  display: flex;
  align-items: center;
  padding: ${theme.spacing(1)};
  background: ${theme.colors.light};
  border-radius: ${theme.spacing(1)};
  box-shadow: 0px ${theme.spacing(0.25)} ${theme.spacing(0.625)} rgba(0, 0, 0, 0.1);
`;

export const ExclusiveNewsImage = styled.img`
  width: ${theme.spacing(10)};
  height: ${theme.spacing(8)};
  object-fit: cover;
  border-radius: ${theme.spacing(1)};
  margin-right: ${theme.spacing(2)};
`;

export const ExclusiveNewsVideoThumbnail = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: ${theme.spacing(1)};
  margin-right: ${theme.spacing(2)};
`;

export const ExclusiveNewsDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ExclusiveNewsTitle = styled.h4`
  font-size: ${theme.spacing(2)};
  font-weight: bold;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing(1)};
  font-family: ${theme.fonts.body};
`;

export const ExclusiveNewsMeta = styled.span`
  font-size: ${theme.spacing(1.8)};
  font-weight: bold;
  padding: ${theme.spacing(0.5)} ${theme.spacing(2)};
  margin-top: ${theme.spacing(2)};
  margin-right: ${theme.spacing(2)};
  color: ${theme.colors.icons};
`;

export const ExclusiveNewsMeta1 = styled.span`
  font-size: ${theme.spacing(1.8)};
  font-weight: bold;
  color: ${theme.colors.icons};
`;

export const ExclusiveNewsVideoCard = styled.div`
  align-items: center;
  padding: ${theme.spacing(2)};
  background: ${theme.colors.light};
  border-radius: ${theme.spacing(1)};
  cursor: pointer;
  box-shadow: 0px ${theme.spacing(0.25)} ${theme.spacing(0.625)} rgba(0, 0, 0, 0.1);
`;

export const ExclusiveNewsVideoDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(3)};
`;

export const ExclusiveNewsVideoMeta = styled.span`
  font-size: ${theme.spacing(2)};
  font-weight: bold;
  margin-top: ${theme.spacing(1)};
  color: ${theme.colors.icons};
`;

export const ExclusiveNewsVideoMetacat = styled.span`
  font-size: ${theme.spacing(2.4)};
  font-weight: bold;
  color: ${theme.colors.icons};
`;