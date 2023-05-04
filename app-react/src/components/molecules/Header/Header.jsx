import React from 'react';
import { Wrapper, Logo, IconStyleWrapper } from './Header-styled';
import { AccountCircle } from '@styled-icons/material/AccountCircle';

const Header = ({ title }) => {
  return (
    <>
      <Wrapper>
        <Logo>{title}</Logo>
        <IconStyleWrapper>
          <AccountCircle size="60" />
        </IconStyleWrapper>
      </Wrapper>
    </>
  );
};

export default Header;
