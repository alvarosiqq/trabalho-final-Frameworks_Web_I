import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * { box-sizing: border-box; }
  body { margin: 0; background: #f5f3ea; color: #182c29; font-family: Arial, sans-serif; }
  a { color: inherit; }
  button, input, select { font: inherit; }
  button, a, input, select { -webkit-tap-highlight-color: transparent; }
  :focus-visible { outline: 3px solid #96702d; outline-offset: 4px; }
  h1, h2, h3 { font-family: Georgia, serif; }
  h1 { font-size: clamp(2.1rem, 5vw, 3.6rem); line-height: 1.1; margin: 12px 0 18px; }
  p { line-height: 1.6; }
`;

export const Container = styled.div`
  width: min(1120px, calc(100% - 40px));
  margin: auto;
  @media (max-width: 480px) { width: calc(100% - 28px); }
`;

export const Button = styled.button`
  background: #182c29; color: #fff; border: 1px solid #182c29;
  padding: 11px 18px; border-radius: 7px; cursor: pointer;
  &:hover:not(:disabled) { background: #304e45; }
  &:disabled { opacity: .45; cursor: default; }
`;

export const Panel = styled.section`
  padding: 26px; border: 1px solid #d5dacd; border-radius: 12px; background: #fffdf7;
`;
