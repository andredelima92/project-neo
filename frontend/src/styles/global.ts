import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    background: white;
    color: ${props => props.theme.palette.primary.main};
    font: 400 16px Roboto, sans-serif;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`
