import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  * {
    font-family: ${(props) => props.theme.fonts.body};
  }
  
  body {
    font-family: ${(props) => props.theme.fonts.body};
    color: ${(props) => props.theme.colors.text};
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: ${(props) => props.theme.fonts.heading};
    font-weight: 500;
  }
  
  p, span, div, a, button, input, textarea, select, label {
    font-family: ${(props) => props.theme.fonts.body};
  }
  
  .accent-text {
    font-family: ${(props) => props.theme.fonts.accent};
  }
  
  .display-text {
    font-family: ${(props) => props.theme.fonts.display};
  }
  
  .heading-text {
    font-family: ${(props) => props.theme.fonts.heading};
  }
  
  .monospace-text {
    font-family: ${(props) => props.theme.fonts.monospace};
  }
  
  .page-wrapper{
    min-height: 100vh;
    display: flex;
    width: 100%;
  }
  
  .content-wrapper{
    flex: 1;
    max-width: 1600px;
    margin-right: auto;
  }
  
  .content-wrapper2{
    flex: 1;
    max-width: 100vw;
    max-height: 100vh;
    transition: margin-left 0.3s ease, width 0.3s ease;
  }
`

export default GlobalStyle
