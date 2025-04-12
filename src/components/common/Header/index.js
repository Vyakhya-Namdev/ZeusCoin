import React from 'react';
import { Link } from "react-router-dom";
import "./styles.css";
import SwipeableTemporaryDrawer from './drawer';
import Button from "../../Button/index.js";

function Header() {
  return (
    <div className='navbar'>
      <h1 className="logo">
        <span style={{ color: "var(--primary-accent)" }}>Zeus</span>
        <span style={{ color: "var(--gray-text)" }}>Coin</span>
      </h1>

      <div className='links'>
        <Link to="/">
          <p className='link'>Home</p>
        </Link>
        <Link to="/compare">
          <p className='link'>Compare</p>
        </Link>
        <Link to="/watchlist">
          <p className='link'>WatchList</p>
        </Link>
        <Link to="/dashboard">
          <Button 
            text="Dashboard" 
            onClick={() => console.log("Btn Clicked")} 
          />
        </Link>
      </div>

      <div className="mobile-drawer">
        <SwipeableTemporaryDrawer />
      </div>
    </div>
  )
}

export default Header