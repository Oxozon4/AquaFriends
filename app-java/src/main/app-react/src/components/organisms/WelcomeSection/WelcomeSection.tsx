import {
  SectionWrapper,
  SectionTitle,
  SectionContent,
} from './WelcomeSection-styled';

const WelcomeSection = () => {
  return (
    <SectionWrapper>
      <SectionTitle>
        Proste, zoptymalizowane narzędzie do obsługi akwarium do Twojej dyspozycji!
      </SectionTitle>
      <SectionContent>
        Rewolucyjne rozwiązanie, dzięki któremu zarządzanie akwarium jeszcze nigdy nie było takie proste.
      </SectionContent>
    </SectionWrapper>
  );
};

export default WelcomeSection;
