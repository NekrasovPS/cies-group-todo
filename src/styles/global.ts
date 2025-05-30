import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: system-ui, -apple-system, sans-serif;
    background-color: #f9fafb;
    color: #1f2937;
  }

  h1 {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 24px;
    text-align: center;
    color: #111827;
  }

  button, select, input, textarea {
    font-family: inherit;
  }
`;
