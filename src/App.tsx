import React from "react";
import "./App.scss";
import Header from "./components/header";
import Converter from './components/converter'

function App() {
  return (
    <div className="App">
      <Header />
      <Converter/>
    </div>
  );
}

export default App;
