import {
  FastForwardIcon,
  LightbulbIcon,
  MoneyOffIcon,
  SearchIcon,
  CloseIcon,
  GoogleIcon,
  FacebookIcon,
  GithubIcon,
  AddIcon,
} from './Icon-styled';

interface IconProps {
  variant:
    | 'Fast'
    | 'Efficient'
    | 'Free'
    | 'Search'
    | 'Close'
    | 'Google'
    | 'Facebook'
    | 'Github'
    | 'Add';
  size?: string;
  withhover?: 'true' | 'false';
}

const Icon = ({ variant, size = '128px', withhover = 'true' }: IconProps) => {
  return (
    <>
      {variant === 'Fast' && (
        <FastForwardIcon size={size} withhover={withhover} />
      )}
      {variant === 'Efficient' && (
        <LightbulbIcon size={size} withhover={withhover} />
      )}
      {variant === 'Free' && <MoneyOffIcon size={size} withhover={withhover} />}
      {variant === 'Search' && <SearchIcon size={size} withhover={withhover} />}
      {variant === 'Close' && <CloseIcon size={size} withhover={withhover} />}
      {variant === 'Google' && <GoogleIcon size={size} withhover={withhover} />}
      {variant === 'Facebook' && (
        <FacebookIcon size={size} withhover={withhover} />
      )}
      {variant === 'Github' && <GithubIcon size={size} withhover={withhover} />}
      {variant === 'Add' && <AddIcon size={size} withhover={withhover} />}
    </>
  );
};

export default Icon;
