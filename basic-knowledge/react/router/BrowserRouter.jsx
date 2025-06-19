import React, { createContext, useContext, useState, useEffect } from 'react';

const RouterContext = createContext();

export function BrowserRouter({ children }) {
  const [location, setLocation] = useState(getCurrentLocation());

  useEffect(() => {
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  function handlePopState() {
    setLocation(getCurrentLocation());
  }

  function getCurrentLocation() {
    return window.location.pathname;
  }

  const value = {
    location,
    push: (path) => {
      window.history.pushState(null, null, path);
      setLocation(getCurrentLocation());
    },
    replace: (path) => {
      window.history.replaceState(null, null, path);
      setLocation(getCurrentLocation());
    },
  };

  return (
    <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
  );
}

export function Route({ path, component }) {
  const { location } = useContext(RouterContext);
  const match = location === path;

  return match ? React.createElement(component) : null;
}

export function Link({ to, children }) {
  const { push } = useContext(RouterContext);

  function handleClick(event) {
    event.preventDefault();
    push(to);
  }

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
}