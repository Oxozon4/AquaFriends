import { useState, useEffect } from 'react';
import Link from '../Link/Link';
import styled from 'styled-components';
import { MdArrowUpward } from 'react-icons/md';

interface StyledBackToTopIconProps {
  isshown: string;
}

const StyledBackToTopIcon = styled(MdArrowUpward)<StyledBackToTopIconProps>`
  display: ${({ isshown }) => (isshown === 'true' ? 'block' : 'none')};
  width: 40px;
  height: 40px;
  position: fixed;
  bottom: 85px;
  right: 30px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.primary};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  opacity: 0.75;
  transition: all 0.3s;

  &:hover {
    opacity: 1;
  }
`;

const BackToTopIcon: React.FC = () => {
  const [isShown, setIsShown] = useState('false');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsShown('true');
      } else {
        setIsShown('false');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const onBackToTopClickHandler = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Link onClick={onBackToTopClickHandler}>
      <StyledBackToTopIcon isshown={isShown} />
    </Link>
  );
};

export default BackToTopIcon;
