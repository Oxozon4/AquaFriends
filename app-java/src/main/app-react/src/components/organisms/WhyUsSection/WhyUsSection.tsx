import {
  WhyUsSectionWrapper,
  WhyUsSectionTitle,
  WhyUsSectionCardWrapper,
} from './WhyUsSections-styled';
import Card from '../../molecules/Card/Card';

const WhyUsSection: React.FC = () => {
  return (
    <WhyUsSectionWrapper>
      <WhyUsSectionTitle>Dlaczego my?</WhyUsSectionTitle>
      <WhyUsSectionCardWrapper>
        <Card
          image="Fast"
          title="Szybko"
          description="Nasza aplikacja nie tylko pozawala na szybkie i łatwe tworzenie formularzy, ale również jest szybka w działaniu!"
        />
        <Card
          image="Efficient"
          title="Sprawnie"
          description="Stworzenie formularza nigdy nie było tak proste! Wystarczy kilka kliknięć, aby stworzyć formularz i udostępnić go innym."
        />
        <Card
          image="Free"
          title="Bezpłatnie"
          description="Jednym z najważniejszych aspektów naszej aplikacji jest to, że jest ona całkowicie darmowa!"
        />
      </WhyUsSectionCardWrapper>
    </WhyUsSectionWrapper>
  );
};

export default WhyUsSection;
