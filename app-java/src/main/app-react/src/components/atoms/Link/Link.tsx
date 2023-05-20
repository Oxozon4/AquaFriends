import { useLink } from 'react-aria';
import { useRef } from 'react';
import { StyledLink } from './Link-styled';

interface LinkProps {
  children: React.ReactNode;
  href?: string;
  target?: string;
  title?: string;
  onClick?: () => void;
}

const Link = ({ href, target, title, onClick, children }: LinkProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const { linkProps } = useLink({}, linkRef);

  return (
    <StyledLink
      {...linkProps}
      ref={linkRef}
      href={href}
      target={target}
      title={title}
      onClick={onClick}
    >
      {children}
    </StyledLink>
  );
};

export default Link;
