import { createGlobalStyle } from "styled-components";
import Main from "./Main";

const App = () => (
  <>
    <GlobalStyle />
    <Main />
  </>
);

export default App;

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    font-size: 1em;
    font-family: Arial, Helvetica, sans-serif;

    scrollbar-width: thin;
    scrollbar-color: rgb(41, 41, 41) transparent;

    &::-webkit-scrollbar {
        width: 5px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: rgb(41, 41, 41);
      border-radius: 20px;
      border: transparent;
    }

    box-sizing: border-box;
  }

  button{
    cursor: pointer;
  }

  input{
    padding: 10px 15px;
    border-radius: 20px;
    border: 1px solid grey;
    color: white;
    background: transparent;
    outline: none;
  }
`;
