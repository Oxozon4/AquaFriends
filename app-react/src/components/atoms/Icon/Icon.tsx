import { CloseIcon, GoogleIcon, FacebookIcon, GithubIcon } from './Icon-styled';

interface IconProps {
  variant: 'Close' | 'Google' | 'Facebook' | 'Github';
  size?: string;
  withhover?: 'true' | 'false';
}

const Icon = ({ variant, size = '128px', withhover = 'true' }: IconProps) => {
  return (
    <>
      {variant === 'Close' && <CloseIcon size={size} withhover={withhover} />}
      {variant === 'Google' && <GoogleIcon size={size} withhover={withhover} />}
      {variant === 'Facebook' && (
        <FacebookIcon size={size} withhover={withhover} />
      )}
      {variant === 'Github' && <GithubIcon size={size} withhover={withhover} />}
    </>
  );
};

export default Icon;
