import React, { createContext, useContext, useState, useEffect } from 'react'

const RouterContext = createContext()

export function HashRouter({ children }) {
    const [ location, setLocation ] = useState(getCurrentLocation())

    const handleHashChange = () => {
        setLocation(getCurrentLocation())
    }

    function getCurrentLocation() {
        return window.location.hash.replace(/^#/, '') || '/';
    }

    useEffect(() => {
        window.addEventListener('hashchange', handleHashChange)
        return () => window.removeEventListener('hashchange', handleHashChange)
    }, [])

    const value = {
        location,
        push: p => window.location.hash = p
    }

    return (
        <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
    )

}

export function Route({ path, component }) {
    const { location } = useContext(RouterContext);
    const match = location === path
    return match ? React.createElement(component) : null
}

export function Link({ to, children }) {
    const { push } = useContext(RouterContext)
    function handleClick(event) {
        event.preventDefault();
        push(to);
      }
    
      return (
        <a href={`#${to}`} onClick={handleClick}>
          {children}
        </a>
      );
}