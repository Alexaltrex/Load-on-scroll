import React from 'react';
import styled from "styled-components";
import Header from "./Components/Header";
import List from "./Components/List";

const Div = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
`;


function App() {
  return (
    <Div>
      <Header/>
      <List/>
    </Div>
  );
}

export default App;
