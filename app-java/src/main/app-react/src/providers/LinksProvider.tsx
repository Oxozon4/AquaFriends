import React, { useState, useEffect, createContext, useCallback } from 'react';

export interface LinksContextInterface {
  auth: {
    register: string;
    login: string;
    logout: string;
    authLinks: string;
    userLinks: string;
    adminLinks: string;
    isSet: boolean;
  };
  admin: {
    getAllAccessoryType: string;
    getAccessoryType: string;
    saveAccessoryType: string;
    updateAccessoryType: string;
    deleteAccessoryType: string;

    getAllAquariumTemplate: string;
    getAquariumTemplate: string;
    saveAquariumTemplate: string;
    updateAquariumTemplate: string;
    deleteAquariumTemplate: string;

    getAllDecoratorType: string;
    getDecoratorType: string;
    saveDecoratorType: string;
    updateDecoratorType: string;
    deleteDecoratorType: string;

    getAllFishType: string;
    getFishType: string;
    saveFishType: string;
    updateFishType: string;
    deleteFishType: string;

    getAllKnowledge: string;
    getKnowledge: string;
    saveKnowledge: string;
    updateKnowledge: string;
    deleteKnowledge: string;
    isSet: boolean;
  };
  user: {
    getAllAccesoryType: string;
    getAccesoryType: string;

    getAllAquarium: string;
    getAquarium: string;
    getUserAquarium: string;
    saveAquarium: string;
    updateAquarium: string;
    deleteAquarium: string;

    getAllAquariumTemplate: string;
    getAquariumTemplate: string;

    getAllDecoratorType: string;
    getDecoratorType: string;

    getAllFish: string;
    getFish: string;
    updateFish: string;
    deleteFish: string;
    getAllFishType: string;
    getFishType: string;

    getAllKnowledge: string;
    getKnowledge: string;

    getAllParametersHistory: string;
    getParametersHistory: string;
    saveParametersHistory: string;
    updateParametersHistory: string;
    deleteParametersHistory: string;

    getUser: string;
    isSet: boolean;
  };
  getAdminLinks: null | (() => void);
  getUserLinks: null | (() => void);
}

const linkNames: LinksContextInterface = {
  auth: {
    register: 'REGISTER_USER',
    login: 'LOGIN',
    logout: 'LOGOUT',
    authLinks: 'GET_AUTH_LINKS',
    userLinks: 'GET_USER_LINKS',
    adminLinks: 'GET_ADMIN_LINKS',
    isSet: false,
  },
  admin: {
    getAllAccessoryType: 'GET_ALL_ACCESSORY_TYPE',
    getAccessoryType: 'GET_ACCESSORY_TYPE',
    saveAccessoryType: 'SAVE_ACCESSORY_TYPE',
    updateAccessoryType: 'UPDATE_ACCESSORY_TYPE',
    deleteAccessoryType: 'DELETE_ACCESSORY_TYPE',

    getAllAquariumTemplate: 'GET_ALL_AQUARIUM_TEMPLATE',
    getAquariumTemplate: 'GET_AQUARIUM_TEMPLATE',
    saveAquariumTemplate: 'SAVE_AQUARIUM_TEMPLATE',
    updateAquariumTemplate: 'UPDATE_AQUARIUM_TEMPLATE',
    deleteAquariumTemplate: 'DELETE_AQUARIUM_TEMPLATE',

    getAllDecoratorType: 'GET_ALL_DECORATOR_TYPE',
    getDecoratorType: 'GET_DECORATOR_TYPE',
    saveDecoratorType: 'SAVE_DECORATOR_TYPE',
    updateDecoratorType: 'UPDATE_DECORATOR_TYPE',
    deleteDecoratorType: 'DELETE_DECORATOR_TYPE',

    getAllFishType: 'GET_ALL_FISH_TYPE',
    getFishType: 'GET_FISH_TYPE',
    saveFishType: 'SAVE_FISH_TYPE',
    updateFishType: 'UPDATE_FISH_TYPE',
    deleteFishType: 'DELETE_FISH_TYPE',

    getAllKnowledge: 'GET_ALL_KNOWLEDGE',
    getKnowledge: 'GET_KNOWLEDGE',
    saveKnowledge: 'SAVE_KNOWLEDGE',
    updateKnowledge: 'UPDATE_KNOWLEDGE',
    deleteKnowledge: 'DELETE_KNOWLEDGE',
    isSet: false,
  },
  user: {
    getAllAccesoryType: 'GET_ALL_ACCESSORY_TYPE',
    getAccesoryType: 'GET_ACCESSORY_TYPE',

    getAllAquarium: 'GET_ALL_AQUARIUM',
    getAquarium: 'GET_AQUARIUM',
    getUserAquarium: 'GET_USER_AQUARIUM',
    saveAquarium: 'SAVE_AQUARIUM',
    updateAquarium: 'UPDATE_AQUARIUM',
    deleteAquarium: 'DELETE_AQUARIUM',

    getAllAquariumTemplate: 'GET_ALL_AQUARIUM_TEMPLATE',
    getAquariumTemplate: 'GET_AQUARIUM_TEMPLATE',

    getAllDecoratorType: 'GET_ALL_DECORATOR_TYPE',
    getDecoratorType: 'GET_DECORATOR_TYPE',

    getAllFish: 'GET_ALL_FISH',
    getFish: 'GET_FISH',
    updateFish: 'UPDATE_FISH',
    deleteFish: 'DELETE_FISH',
    getAllFishType: 'GET_ALL_FISH_TYPE',
    getFishType: 'GET_FISH_TYPE',

    getAllKnowledge: 'GET_ALL_KNOWLEDGE',
    getKnowledge: 'GET_KNOWLEDGE',

    getAllParametersHistory: 'GET_ALL_PARAMETERS_HISTORY',
    getParametersHistory: 'GET_PARAMETERS_HISTORY',
    saveParametersHistory: 'SAVE_PARAMETERS_HISTORY',
    updateParametersHistory: 'UPDATE_PARAMETERS_HISTORY',
    deleteParametersHistory: 'DELETE_PARAMETERS_HISTORY',

    getUser: 'GET_USER',
    isSet: false,
  },
  getAdminLinks: null,
  getUserLinks: null,
};

const defaultLinksValue: LinksContextInterface = {
  auth: {
    register: '',
    login: '',
    logout: '',
    authLinks: '',
    userLinks: '',
    adminLinks: '',
    isSet: false,
  },
  admin: {
    getAllAccessoryType: '',
    getAccessoryType: '',
    saveAccessoryType: '',
    updateAccessoryType: '',
    deleteAccessoryType: '',
    getAllAquariumTemplate: '',
    getAquariumTemplate: '',
    saveAquariumTemplate: '',
    updateAquariumTemplate: '',
    deleteAquariumTemplate: '',
    getAllDecoratorType: '',
    getDecoratorType: '',
    saveDecoratorType: '',
    updateDecoratorType: '',
    deleteDecoratorType: '',
    getAllFishType: '',
    getFishType: '',
    saveFishType: '',
    updateFishType: '',
    deleteFishType: '',
    getAllKnowledge: '',
    getKnowledge: '',
    saveKnowledge: '',
    updateKnowledge: '',
    deleteKnowledge: '',
    isSet: false,
  },
  user: {
    getAllAccesoryType: '',
    getAccesoryType: '',
    getAllAquarium: '',
    getAquarium: '',
    getUserAquarium: '',
    saveAquarium: '',
    updateAquarium: '',
    deleteAquarium: '',
    getAllAquariumTemplate: '',
    getAquariumTemplate: '',
    getAllDecoratorType: '',
    getDecoratorType: '',
    getAllFish: '',
    getFish: '',
    updateFish: '',
    deleteFish: '',
    getAllFishType: '',
    getFishType: '',
    getAllKnowledge: '',
    getKnowledge: '',
    getAllParametersHistory: '',
    getParametersHistory: '',
    saveParametersHistory: '',
    updateParametersHistory: '',
    deleteParametersHistory: '',
    getUser: '',
    isSet: false,
  },
  getAdminLinks: null,
  getUserLinks: null,
};

export const LinksContext = createContext<LinksContextInterface | null>(
  defaultLinksValue
);

interface LinksProviderProps {
  children: React.ReactNode;
}

const LinksProvider = ({ children }: LinksProviderProps) => {
  const [links, setLinks] = useState<LinksContextInterface>(defaultLinksValue);

  const getAdminLinks = useCallback(async () => {
    const url = links.auth.adminLinks;
    if (!url) {
      return;
    }
    const response = await fetch(url);
    if (!response.ok) {
      console.error('get Admin Links error');
      return;
    }
    const data = await response.json();
    const newLinksContext: LinksContextInterface = { ...links };
    for (const link of data) {
      const { rel, href } = link;
      if (href) {
        switch (rel) {
          case linkNames.admin.getAllAccessoryType:
            newLinksContext.admin.getAllAccessoryType = href;
            break;
          case linkNames.admin.getAccessoryType:
            newLinksContext.admin.getAccessoryType = href;
            break;
          case linkNames.admin.saveAccessoryType:
            newLinksContext.admin.saveAccessoryType = href;
            break;
          case linkNames.admin.updateAccessoryType:
            newLinksContext.admin.updateAccessoryType = href;
            break;
          case linkNames.admin.deleteAccessoryType:
            newLinksContext.admin.deleteAccessoryType = href;
            break;
          case linkNames.admin.getAllAquariumTemplate:
            newLinksContext.admin.getAllAquariumTemplate = href;
            break;
          case linkNames.admin.getAquariumTemplate:
            newLinksContext.admin.getAquariumTemplate = href;
            break;
          case linkNames.admin.saveAquariumTemplate:
            newLinksContext.admin.saveAquariumTemplate = href;
            break;
          case linkNames.admin.updateAquariumTemplate:
            newLinksContext.admin.updateAquariumTemplate = href;
            break;
          case linkNames.admin.deleteAquariumTemplate:
            newLinksContext.admin.deleteAquariumTemplate = href;
            break;
          case linkNames.admin.getAllDecoratorType:
            newLinksContext.admin.getAllDecoratorType = href;
            break;
          case linkNames.admin.getDecoratorType:
            newLinksContext.admin.getDecoratorType = href;
            break;
          case linkNames.admin.saveDecoratorType:
            newLinksContext.admin.saveDecoratorType = href;
            break;
          case linkNames.admin.updateDecoratorType:
            newLinksContext.admin.updateDecoratorType = href;
            break;
          case linkNames.admin.deleteDecoratorType:
            newLinksContext.admin.deleteDecoratorType = href;
            break;
          case linkNames.admin.getAllFishType:
            newLinksContext.admin.getAllFishType = href;
            break;
          case linkNames.admin.getFishType:
            newLinksContext.admin.getFishType = href;
            break;
          case linkNames.admin.saveFishType:
            newLinksContext.admin.saveFishType = href;
            break;
          case linkNames.admin.updateFishType:
            newLinksContext.admin.updateFishType = href;
            break;
          case linkNames.admin.deleteFishType:
            newLinksContext.admin.deleteFishType = href;
            break;
          case linkNames.admin.getAllKnowledge:
            newLinksContext.admin.getAllKnowledge = href;
            break;
          case linkNames.admin.getKnowledge:
            newLinksContext.admin.getKnowledge = href;
            break;
          case linkNames.admin.saveKnowledge:
            newLinksContext.admin.saveKnowledge = href;
            break;
          case linkNames.admin.updateKnowledge:
            newLinksContext.admin.updateKnowledge = href;
            break;
          case linkNames.admin.deleteKnowledge:
            newLinksContext.admin.deleteKnowledge = href;
            break;
          default:
            break;
        }
      } else {
        console.error('Get Admin Links: Missing href param in response');
      }
      newLinksContext.admin.isSet = true;
      setLinks(newLinksContext);
    }
  }, [links]);

  const getUserLinks = useCallback(async () => {
    const url = links.auth.userLinks;
    if (!url) {
      return;
    }
    const response = await fetch(url);
    if (!response.ok) {
      console.error('get Admin Links error');
      return;
    }
    const data = await response.json();
    const newLinksContext: LinksContextInterface = { ...links };
    for (const link of data) {
      const { rel, href } = link;
      if (href) {
        switch (rel) {
          case linkNames.user.getAllAquarium:
            newLinksContext.user.getAllAquarium = href;
            break;
          case linkNames.user.getAquarium:
            newLinksContext.user.getAquarium = href;
            break;
          case linkNames.user.saveAquarium:
            newLinksContext.user.saveAquarium = href;
            break;
          case linkNames.user.updateAquarium:
            newLinksContext.user.updateAquarium = href;
            break;
          case linkNames.user.deleteAquarium:
            newLinksContext.user.deleteAquarium = href;
            break;
          case linkNames.user.getAllAquariumTemplate:
            newLinksContext.user.getAllAquariumTemplate = href;
            break;
          case linkNames.user.getAquariumTemplate:
            newLinksContext.user.getAquariumTemplate = href;
            break;
          case linkNames.user.getAllFish:
            newLinksContext.user.getAllFish = href;
            break;
          case linkNames.user.getFish:
            newLinksContext.user.getFish = href;
            break;
          case linkNames.user.updateFish:
            newLinksContext.user.updateFish = href;
            break;
          case linkNames.user.deleteFish:
            newLinksContext.user.deleteFish = href;
            break;
          case linkNames.user.getAllKnowledge:
            newLinksContext.user.getAllKnowledge = href;
            break;
          case linkNames.user.getKnowledge:
            newLinksContext.user.getKnowledge = href;
            break;
          default:
            break;
        }
      } else {
        console.error('Get User Links: Missing href param in response');
      }
      newLinksContext.user.isSet = true;
      setLinks(newLinksContext);
    }
  }, [links]);

  useEffect(() => {
    const getAuthLinks = async () => {
      const url = '/api/auth-links';
      const response = await fetch(url);
      const data = await response.json();
      const newLinksContext: LinksContextInterface = { ...links };
      for (const link of data) {
        const { rel, href } = link;
        if (href) {
          switch (rel) {
            case linkNames.auth.register:
              newLinksContext.auth.register = href;
              break;
            case linkNames.auth.login:
              newLinksContext.auth.login = href;
              break;
            case linkNames.auth.logout:
              newLinksContext.auth.logout = href;
              break;
            case linkNames.auth.authLinks:
              newLinksContext.auth.authLinks = href;
              break;
            case linkNames.auth.userLinks:
              newLinksContext.auth.userLinks = href;
              break;
            case linkNames.auth.adminLinks:
              newLinksContext.auth.adminLinks = href;
              break;
            default:
              break;
          }
        } else {
          console.error('GetLinks: Missing href param in response');
        }
      }
      newLinksContext.auth.isSet = true;
      setLinks(newLinksContext);
    };

    if (!links.auth.isSet) {
      getAuthLinks();
    }
  }, [links]);

  return (
    <LinksContext.Provider
      value={{
        ...links,
        getAdminLinks,
        getUserLinks,
      }}
    >
      {children}
    </LinksContext.Provider>
  );
};

export default LinksProvider;
