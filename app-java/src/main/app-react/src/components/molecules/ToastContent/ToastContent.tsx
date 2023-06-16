/* eslint-disable no-case-declarations */
import { useState, useEffect } from 'react';
import Button from '../../atoms/Button/Button';
import Icon from '../../atoms/Icon/Icon';
import {
  ToastContentWrapper,
  ToatContentIconWrapper,
  ToastContentMainWrapper,
  ToastContentTitle,
  ToastContentFooter,
  ToastContentRemaining,
} from './ToastContent-styled';

interface ToastContentProps {
  onFinish: () => void;
  warnings: {
    message: string;
    target?: string;
    action?: string;
  }[];
  setFocus: any;
  setValue: any;
  watch: any;
}

const ToastContent = ({
  onFinish,
  warnings,
  setFocus,
  setValue,
  watch,
}: ToastContentProps) => {
  const [messageIndex, setMessageIndex] = useState<number>(0);

  const onNextMessageClickHandler = () => {
    if (messageIndex === warnings.length - 1) {
      onFinish();
      return;
    }
    setMessageIndex((prev) => prev + 1);
  };

  const onFixClickHandler = () => {
    console.log('fix');
    setMessageIndex((prev) => prev + 1);
    if (!warnings[messageIndex].target) {
      return;
    }
    const activeElement = document.getElementById(
      warnings[messageIndex].target!
    );
    if (activeElement && warnings[messageIndex].action) {
      switch (warnings[messageIndex].action) {
        case 'maxLength35':
          const activeValue = watch(warnings[messageIndex].target);
          const reducedValue = activeValue.slice(0, 35);
          setValue(warnings[messageIndex].target, reducedValue);
          break;
        case 'deleteOptions':
          const activeOptions = watch(warnings[messageIndex].target);
          if (activeOptions.length > 5) {
            setValue(warnings[messageIndex].target, activeOptions.slice(0, 5));
          }
          console.log(activeOptions);
          break;
        default:
          break;
      }
      activeElement.style.outline = 'none';
    }
  };

  useEffect(() => {
    if (
      !warnings ||
      !warnings[messageIndex] ||
      !warnings[messageIndex].target
    ) {
      return;
    }
    if (warnings[messageIndex].target) {
      setFocus(warnings[messageIndex].target);
      const activeElement = document.getElementById(
        warnings[messageIndex].target!
      );
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
        activeElement.focus();
        activeElement.style.outlineOffset = '10px';
        activeElement.style.outline = '2px solid #FFC107';
        activeElement.style.transition = 'outline 0.5s ease-in-out';
      }
    }
  }, [messageIndex, setFocus, warnings]);

  return (
    <ToastContentWrapper>
      <ToatContentIconWrapper>
        <Icon variant="Warning" withhover="false" size="40" />
      </ToatContentIconWrapper>
      <ToastContentMainWrapper>
        <ToastContentTitle>{warnings[messageIndex]?.message}</ToastContentTitle>
        <ToastContentFooter>
          <ToastContentRemaining>{`${messageIndex + 1} z ${
            warnings.length
          }`}</ToastContentRemaining>
          {warnings[messageIndex]?.target && (
            <Button
              text="Popraw"
              onClick={onFixClickHandler}
              variant="secondary"
            />
          )}
          <Button
            text={messageIndex + 1 === warnings.length ? 'Zakończ' : 'Dalej'}
            onClick={onNextMessageClickHandler}
          />
        </ToastContentFooter>
      </ToastContentMainWrapper>
    </ToastContentWrapper>
  );
};

export default ToastContent;
