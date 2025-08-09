import { createGlobalStyle, withTheme } from 'styled-components';

const globalStyle = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body  {
    background-repeat: no-repeat;
    background-size: contain;
    background-position: top center;
    margin: 0;
    font-family: var(--ff-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI',
    'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
    'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${({ theme }) => theme.background};
    background-image: 
      url(${({ theme }) => theme.backgroundImageSm});
    font-size: 18px;
    color: ${({ theme }) => theme.text};
  }

  h1 {
    font-size: 33.75px;
    color: ${({ theme }) => theme.text};
  }

  .todo {
    background-color: ${({ theme }) => theme.inputBg};
    color: ${({ theme }) => theme.text}
  }

  input {
    color: ${({ theme }) => theme.text}
  }

  @media screen and (min-width: 64em) {
    body {
      background-image: 
        url(${({ theme }) => theme.backgroundImage});
    }
  }
`;

export default withTheme(globalStyle);
