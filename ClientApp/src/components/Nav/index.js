import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

function Nav() {
  return (
    <div className="links">
      <Link
        to="/"
        className={
          window.location.pathname === '/' ||
          window.location.pathname === '/search'
            ? 'search active'
            : 'saved'
        }
      >
        Search
      </Link>
      <Link
        to="/saved"
        className={
          window.location.pathname === '/saved' ? 'saved active' : 'saved'
        }
        href="/saved"
      >
        Saved
      </Link>
    </div>
  );
}

export default Nav;
