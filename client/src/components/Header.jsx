import React, { memo } from "react";

const Header = memo(({ username, onLogout, onMyTweets, onAllTweets }) => {
  return (
    <nav className="container navbar sticky-top navbar-light bg-light">
      <div className="container-fluid">
        <div className="navbar-brand">
          <img src="./assets/logo.png" alt="logo" height="75" />
        </div>
        <div className="d-flex">
          <div className="col">
            {username && (
              <>
                <button className="btn btn-outline-secondary mx-2 disabled">@{username}</button>
                <button onClick={() => onLogout()} className="btn btn-outline-secondary mx-2">
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
});

export default Header;
