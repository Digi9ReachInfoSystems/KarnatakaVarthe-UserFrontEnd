import styled from "styled-components";
import theme from "../../theme/Theme";

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${theme.spacing(4)};
  max-width: 600px;
  margin: 0 auto;
  border-radius: 12px;
  // box-shadow: 0 4px 12px rgba(0,0,0,0.1);
`;

export const ProfileHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing(3)};
  
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid ${theme.colors.primary};
    margin-bottom: ${theme.spacing(1)};
  }

  h2 {
    font-size: 24px;
    margin: 8px 0;
    color: ${theme.colors.dark};
  }

  p {
    color: ${theme.colors.black};
    font-size: 14px;
  }
`;

export const UserDetailsContainer = styled.div`
  width: 100%;
  margin-bottom: ${theme.spacing(3)};
`;

export const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${theme.spacing(1.5)} 0;
  border-bottom: 1px solid #eee;
`;

export const DetailLabel = styled.span`
  font-weight: bold;
  color: ${theme.colors.dark};
`;

export const DetailValue = styled.span`
  color: #555;
`;

export const SocialIcons = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing(2)};
  margin-top: ${theme.spacing(2)};

  span {
    color: ${theme.colors.light};
    margin-right: ${theme.spacing(1)};
  }

  a {
    color: ${theme.colors.primary};
    font-size: 20px;
    transition: all 0.3s ease;

    &:hover {
      color: ${theme.colors.secondary};
      transform: translateY(-2px);
    }
  }
`;