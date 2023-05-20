import { useState, useEffect } from 'react';
import Link from '../../../atoms/Link/Link';
// import Icon from '../../../atoms/Icon/Icon';
import {
  HeaderWrapper,
  HeaderLogo,
  HeaderButtonsWrapper,
  HeaderButton,
  HeaderWrapperOuter,
} from './Header-styled';

interface HeaderProps {
  onClickHandler: () => void;
  text: string;
  logoHref?: string;
}

const Header = ({ onClickHandler, logoHref = '/', text }: HeaderProps) => {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 576);

  const handleResize = () => {
    setIsMobileView(window.innerWidth < 576);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.addEventListener('resize', handleResize);
    };
  }, []);

  return (
    <HeaderWrapperOuter>
      <HeaderWrapper>
        <HeaderLogo href={logoHref}>AquaFriends</HeaderLogo>
        <HeaderButtonsWrapper>
          {isMobileView ? (
            <Link onClick={onClickHandler}>
              {/* <Icon variant="Logout" size="64px" withhover="false" /> */}
            </Link>
          ) : (
            <HeaderButton onClick={onClickHandler}>{text}</HeaderButton>
          )}
        </HeaderButtonsWrapper>
      </HeaderWrapper>
    </HeaderWrapperOuter>
  );
};

export default Header;
