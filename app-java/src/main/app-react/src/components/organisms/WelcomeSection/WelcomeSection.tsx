import {
  SectionWrapper,
  SectionTitle,
  SectionContent,
} from './WelcomeSection-styled';

const WelcomeSection = () => {
  return (
    <SectionWrapper>
      <SectionTitle>
        Proste, zoptymalizowane formularze gotowe na zawołanie!
      </SectionTitle>
      <SectionContent>
        Rewolucyjne rozwiązanie dzięki któremu tworzenie formularzy
        internetowych jeszcze nigdy nie było takie proste.
      </SectionContent>
    </SectionWrapper>
  );
};

export default WelcomeSection;
