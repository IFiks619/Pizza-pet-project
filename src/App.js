import React, { useState } from "react";
import "./scss/app.scss";

import Header from "./components/Header.jsx";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";


export const SearchContext = React.createContext()

function App() {


  const [searchValue, setSearchValue] = useState('')

  return (
    <div className="App">
      <div className="wrapper">
        <SearchContext.Provider value={{searchValue, setSearchValue}}>
          <Header />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home searchValue={searchValue} />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </SearchContext.Provider>
      </div>
    </div>
  );
}

export default App;