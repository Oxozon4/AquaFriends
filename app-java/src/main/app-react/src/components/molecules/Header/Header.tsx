import { Wrapper, Logo, IconStyleWrapper } from './Header-styled';
// import { AccountCircle } from '@styled-icons/material/AccountCircle';

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <Wrapper>
      <Logo>{title}</Logo>
      <IconStyleWrapper>{/* <AccountCircle size="60" /> */}</IconStyleWrapper>
    </Wrapper>
  );
};

export default Header;
