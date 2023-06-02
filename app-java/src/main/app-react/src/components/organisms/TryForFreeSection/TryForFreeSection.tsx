import {
  TryForFreeSectionWrapper,
  TryForFreeSectionHeader,
  TryForFreeSectionParagraph,
} from './TryForFreeSection-styled';
import Button from '../../atoms/Button/Button';

interface TryForFreeSectionProps {
  onButtonClickHandler: () => void;
}

const TryForFreeSection = ({
  onButtonClickHandler,
}: TryForFreeSectionProps) => {
  return (
    <TryForFreeSectionWrapper>
      <TryForFreeSectionHeader data-aos="fade-up">
        Spróbuj za darmo
      </TryForFreeSectionHeader>
      <TryForFreeSectionParagraph data-aos="fade-up">
        Stworzenie konta w AquaFriends nic nie kosztuje! Naszej aplikacji
        zaufało już wiele użytkowników.
      </TryForFreeSectionParagraph>
      <Button
        text="Zarejestruj się teraz!"
        onClick={onButtonClickHandler}
        data-aos="fade-up"
      />
    </TryForFreeSectionWrapper>
  );
};

export default TryForFreeSection;
