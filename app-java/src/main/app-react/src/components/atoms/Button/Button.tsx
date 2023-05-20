import { useState, useEffect, useRef } from 'react';
import { AriaButtonProps, useButton } from 'react-aria';
import {
  PrimaryButton,
  SecondaryButton,
  DangerButton,
  CopyButton,
} from './Button-styled';
import Icon from '../Icon/Icon';

interface ButtonProps extends AriaButtonProps {
  text: string;
  onClick?: any;
  variant?: 'primary' | 'secondary' | 'danger' | 'copy';
  type?: 'button' | 'reset' | 'submit' | undefined;
  copyLink?: string;
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const { text, onClick, variant = 'primary', type, copyLink } = props;

  const [copyText, setCopyText] = useState<string>('Skopiuj link');

  const buttonRef = useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton(props, buttonRef);

  const onCopyClickHandler = () => {
    if (!copyLink) {
      return;
    }
    navigator.clipboard.writeText(copyLink);
    setCopyText('Skopiowano!');
    if (onClick) {
      onClick();
    }
  };

  return (
    <>
      {variant === 'primary' && (
        <PrimaryButton
          {...buttonProps}
          variant={variant}
          onClick={onClick}
          type={type}
          ref={buttonRef}
        >
          {text}
        </PrimaryButton>
      )}
      {variant === 'secondary' && (
        <SecondaryButton
          {...buttonProps}
          variant={variant}
          onClick={onClick}
          type={type}
          ref={buttonRef}
        >
          {text}
        </SecondaryButton>
      )}
      {variant === 'danger' && (
        <DangerButton
          {...buttonProps}
          variant={variant}
          onClick={onClick}
          type={type}
          ref={buttonRef}
        >
          {text}
        </DangerButton>
      )}
      {variant === 'copy' && (
        <CopyButton
          {...buttonProps}
          variant={variant}
          onClick={onCopyClickHandler}
          onBlur={() => setCopyText('Skopiuj link')}
          type={type}
          ref={buttonRef}
        >
          <Icon variant="ContentCopy" withhover="false" size="20px" />
          {copyText}
        </CopyButton>
      )}
    </>
  );
};

export default Button;
