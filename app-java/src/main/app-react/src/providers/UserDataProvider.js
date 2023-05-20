import React, { useState, useEffect } from 'react';

/**
 * @desc get Object with today's and tomorrow's date formatted with yyyy-mm-dd format
 * @returns {Object} formattedDate - Object with today's and tomorrow's day
 */
const getFormatedDates = () => {
  const formattedDates = {};
  const today = new Date();
  const yyyy = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();
  if (day < 10) day = '0' + day;
  if (month < 10) month = '0' + month;
  formattedDates.today = `${yyyy}-${month}-${day}`;
  if (+day < 10) {
    day = '0' + (+day + 1);
  } else if (+day >= 10) {
    day = +day + 1;
  }
  formattedDates.tomorrow = `${yyyy}-${month}-${day}`;
  return formattedDates;
};

const setInitialUserData = () => {
  const formattedDates = getFormatedDates();

  return {
    active: true,
    startDate: formattedDates.today,
    endDate: formattedDates.tomorrow,
    totalPrice: 0,
    paid: false,
    customerData: {
      email: '',
      name: '',
      surname: '',
    },
    guestData: {
      email: '',
      name: '',
      surname: '',
    },
    invoiceData: {
      companyName: '',
      nip: '',
      street: '',
      postalCode: '',
      city: '',
      country: '',
    },
    room: {},
    offers: {},
  };
};

export const UserDataContext = React.createContext({
  ...setInitialUserData(),
});

const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    setUserData(setInitialUserData());
  }, []);

  useEffect(() => {
    if (userData) {
      console.log(userData);
    }
  }, [userData]);

  return (
    <UserDataContext.Provider
      value={{
        ...userData,
        setUserData,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataProvider;
