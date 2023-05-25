import { useRef } from 'react';
import { AriaButtonProps, useButton } from 'react-aria';
import { PrimaryButton, SecondaryButton, DangerButton } from './Button-styled';

interface ButtonProps extends AriaButtonProps {
  text: string;
  onClick?: any;
  variant?: 'primary' | 'secondary' | 'danger' | 'copy';
  type?: 'button' | 'reset' | 'submit' | undefined;
  copyLink?: string;
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const { text, onClick, variant = 'primary', type } = props;

  const buttonRef = useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton(props, buttonRef);

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
    </>
  );
};

export default Button;
