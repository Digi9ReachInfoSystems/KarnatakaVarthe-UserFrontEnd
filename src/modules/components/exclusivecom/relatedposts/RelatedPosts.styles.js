import styled from "styled-components";
import theme from "../../../../theme/Theme";

export const RelatedPostsContainer = styled.div`
//   max-width: 1200px;
  margin: auto;
  padding: ${theme.spacing(2)};
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing(3)};

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    padding: ${theme.spacing(1)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(0.5)};
  }
`;

export const RelatedPostsNewsCardWrapper = styled.div`
  border-radius: ${theme.spacing(1)};
  overflow: hidden;
  background: ${theme.colors.white};
  display: flex;
  flex-direction: column;

  @media (max-width: ${theme.breakpoints.tablet}) {
    flex-direction: column;
  }
`;

export const RelatedPostsNewsImageWrapper = styled.div`
  img {
    width: 100%;
    height: auto;
    object-fit: cover;
   
    border-radius: 2%;

    @media (max-width: ${theme.breakpoints.mobile}) {
      height: 150px;
    }
  }
`;

export const RelatedPostsNewsContentWrapper = styled.div`
  padding: ${theme.spacing(2)};
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(1.5)};
  }
`;

export const RelatedPostsNewsHeaderWrapper = styled.div`
  font-size: ${theme.spacing(2.5)};
  margin-bottom: ${theme.spacing(2)};
  color: ${theme.colors.gray};
  margin-bottom: ${theme.spacing(1)};
  font-family: ${theme.fonts.body};
`;

export const RelatedPostsNewsTitleWrapper = styled.h2`
  font-size: ${theme.spacing(4)};
  margin-bottom: ${theme.spacing(3)};
  color: ${theme.colors.black};
  font-family: ${theme.fonts.heading};
  margin-bottom: ${theme.spacing(1)};
`;

export const RelatedPostsTrendingTagWrapper = styled.span`
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  font-size: ${theme.spacing(1.5)};
  padding: ${theme.spacing(0.5)} ${theme.spacing(1)};
  border-radius: ${theme.spacing(0.5)};
  margin-right: ${theme.spacing(1)};
`;

export const RelatedPostsNewsMetaWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: ${theme.spacing(1.5)};
  color: ${theme.colors.gray};
  margin-top: ${theme.spacing(1.5)};
`;

export const RelatedPostsIconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing(2)};
  margin-top: ${theme.spacing(1.5)};

  svg {
    font-size: ${theme.spacing(2)};
    color: ${theme.colors.gray};
    cursor: pointer;
    transition: color 0.2s ease-in-out;

    &:hover {
      color: ${theme.colors.primary};
    }
  }
`;