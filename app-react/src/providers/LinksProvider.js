import React, { useState, useEffect } from 'react';

const linkNames = {
  rooms: 'GET_ALL_ROOMS',
  employees: 'GET_ALL_EMPLOYEES',
  offers: 'GET_ALL_OFFERS',
  reservations: 'GET_ALL_RESERVATIONS',
  links: 'GET_MAIN_LINKS',
  login: 'LOGIN',
  logout: 'LOGOUT',
  checkEmail: 'CHECK_EMAIL',
  activeOffers: 'GET_ACTIVE_OFFERS',
};

export const LinksContext = React.createContext({
  rooms: '',
  employees: '',
  offers: '',
  reservations: '',
  login: '',
  logout: '',
  links: '/api',
  getLinks: () => null,
});

const LinksProvider = ({ children }) => {
  const [links, setLinks] = useState({});

  useEffect(() => {
    getLinks();
  }, []);

  const getLinks = async () => {
    let url = '/api';
    const response = await fetch(url);
    const data = await response.json();
    let newLinksContext = {};
    for (const link of data) {
      const { rel, href } = link;
      if (href) {
        switch (rel) {
          case linkNames.rooms:
            newLinksContext.rooms = href;
            break;
          case linkNames.employees:
            newLinksContext.employees = href;
            break;
          case linkNames.offers:
            newLinksContext.offers = href;
            break;
          case linkNames.links:
            newLinksContext.links = href;
            break;
          case linkNames.reservations:
            newLinksContext.reservations = href;
            break;
          case linkNames.login:
            newLinksContext.login = href;
            break;
          case linkNames.logout:
            newLinksContext.logout = href;
            break;
          case linkNames.checkEmail:
            newLinksContext.checkEmail = href;
            break;
          case linkNames.activeOffers:
            newLinksContext.activeOffers = href;
            break;
          default:
            break;
        }
      } else {
        console.error('GetLinks: Missing href param in response');
      }
    }
    setLinks(newLinksContext);
  };

  return (
    <LinksContext.Provider
      value={{
        ...links,
        getLinks,
      }}
    >
      {children}
    </LinksContext.Provider>
  );
};

export default LinksProvider;
