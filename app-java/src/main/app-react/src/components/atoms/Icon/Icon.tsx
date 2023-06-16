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
  UserIcon,
  ArrowDropDownIcon,
  WarnIcon,
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
    | 'Add'
    | 'User'
    | 'ArrowDown'
    | 'Warning';
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
      {variant === 'User' && <UserIcon size={size} withhover={withhover} />}
      {variant === 'ArrowDown' && (
        <ArrowDropDownIcon size={size} withhover={withhover} />
      )}
      {variant === 'Warning' && <WarnIcon size={size} withhover={withhover} />}
    </>
  );
};

export default Icon;
