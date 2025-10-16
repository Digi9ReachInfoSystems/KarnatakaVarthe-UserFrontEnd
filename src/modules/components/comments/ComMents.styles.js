import styled from "styled-components";
import theme from "../../../theme/Theme";

export const CommentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(1)};
  width: 100%;
  align-items: center;
  margin-top: ${(props) => props.theme.spacing(2)};
`;

export const Comment = styled.div`
  display: flex;
  width: 100%;
  max-width: 90%;
  align-items: flex-start;
  padding: ${(props) => props.theme.spacing(2)};
  background-color: transparent;  // Set to transparent
  border-radius: ${(props) => props.theme.spacing(1)};

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    max-width: 100%;
    padding: ${(props) => props.theme.spacing(1)};
  }
`;

export const ProfileImage = styled.img`
  width: ${(props) => props.theme.spacing(5)};
  height: ${(props) => props.theme.spacing(5)};
  margin-right: ${(props) => props.theme.spacing(2)};
  border-radius: 50%;
`;

export const CommentContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const UserHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(0.5)};
  color: ${(props) => props.theme.colors.text};
  font-weight: 600;
`;

export const Username = styled.span`
  font-size: ${(props) => props.theme.spacing(2)};
`;

export const VerifiedIcon = styled.span`
  color: ${(props) => props.theme.colors.primary};
  font-size: ${(props) => props.theme.spacing(1.75)};
`;

export const Time = styled.span`
  font-size: ${(props) => props.theme.spacing(1.75)};
  color: ${(props) => props.theme.colors.icons};
  margin-left: auto;
`;

export const CommentText = styled.p`
  margin: ${(props) => props.theme.spacing(0.5)} 0;
  font-size: ${(props) => props.theme.spacing(1.75)};
  color: ${(props) => props.theme.colors.text};
`;

export const NestedComment = styled.div`
  background-color: ${(props) => props.theme.colors.lightgreen};
  padding: ${(props) => props.theme.spacing(1)};
  border-radius: ${(props) => props.theme.spacing(1)};
  margin-top: ${(props) => props.theme.spacing(0.5)};
  font-size: ${(props) => props.theme.spacing(1.75)};
`;

export const NestedUser = styled.span`
  font-weight: 600;
  color: ${(props) => props.theme.colors.primary};
`;

export const Actions = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing(2)};
  margin-top: ${(props) => props.theme.spacing(2)};
  color: ${(props) => props.theme.colors.icons};
`;

export const ActionIcon = styled.span`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(0.5)};
  cursor: pointer;
  font-size: ${(props) => props.theme.spacing(1.75)};
`;

export const CommentSectionWrapper = styled.div`
  margin-top: ${theme.spacing(1)};
`;

// commenets section 

export const CommentInputWrapper = styled.div`
  display: flex;
  align-items: center;
  background: ${theme.colors.background};
  border-radius: ${theme.spacing(1.875)};
  margin-top: ${theme.spacing(2.5)};
  padding: ${theme.spacing(0.7)};
  width: ${theme.spacing(30)};
  position: relative;

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

export const CommentInputField = styled.input`
  flex: 1;
  border: none;
  font-size: ${theme.spacing(1.75)};
  outline: none;
  background: transparent;
  padding-left: ${theme.spacing(1.25)};
  padding-right: ${theme.spacing(4.375)};
`;

export const CommentButtonWrapper = styled.button`
  position: absolute;
  right: ${theme.spacing(1.25)};
  top: ${theme.spacing(0.8)};
  background: none;
  border: none;
  font-size: ${theme.spacing(2.375)};
  color: ${theme.colors.icons};
  cursor: pointer;
`;

export const ErrorText = styled.p`
  color: red;
  font-size: ${theme.spacing(1.5)};
  margin-top: ${theme.spacing(1)};
`;
