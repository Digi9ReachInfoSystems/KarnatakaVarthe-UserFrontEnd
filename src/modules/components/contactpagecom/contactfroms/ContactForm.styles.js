import styled from "styled-components"
import theme from "../../../../theme/Theme"

export const ContactFormContainer = styled.div`
  font-family: ${theme.fonts.body};
  margin: auto;
  max-width: 600px;
  padding: ${theme.spacing(4)};
  background-color: ${theme.colors.background}; /* Uncommented and set to white */
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Added box-shadow */

  h2 {
    font-size: 24px;
    color: ${theme.colors.primary};
    margin-bottom: ${theme.spacing(2)}; /* Added margin-bottom for spacing */
  }

  p {
    font-size: 16px;
    color: ${theme.colors.text};
    margin-bottom: ${theme.spacing(3)}; /* Added margin-bottom for spacing */
  }

  .contact-info {
    margin-top: ${theme.spacing(2)};
  }

  h4 {
    color: ${theme.colors.primary}; /* Ensure h4 is blue */
    margin-bottom: ${theme.spacing(0.5)}; /* Adjust spacing below h4 */
  }

  a {
    color: ${theme.colors.primary}; /* Ensure links are blue */
    text-decoration: none; /* Remove default underline */
    &:hover,
    &:focus {
      text-decoration: underline; /* Add underline on hover/focus */
      outline: 2px solid ${theme.colors.primary}; /* Visible focus indicator */
      outline-offset: 2px;
      border-radius: 2px; /* Slightly round the outline corners */
    }
  }
`

export const ContactItem = styled.div`
  display: flex;
  align-items: flex-start; /* Align items to the start for multi-line text */
  margin-bottom: ${theme.spacing(2)};
  gap: ${theme.spacing(2)}; /* Use gap for spacing between icon and text */

  &:last-child {
    margin-bottom: 0; /* No margin for the last item */
  }
`

export const ContactIcon = styled.i`
  font-size: 20px;
  color: ${theme.colors.primary}; /* Set icon color to primary blue */
  flex-shrink: 0; /* Prevent icon from shrinking */
  margin-top: 30px; /* Adjust vertical alignment of icon */
`
