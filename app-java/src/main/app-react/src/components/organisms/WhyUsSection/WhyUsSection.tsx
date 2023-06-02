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
          description="Nasza aplikacja nie tylko pozwala na szybkie i łatwe tworzenie akwarium, ale również jest szybka w działaniu!"
        />
        <Card
          image="Efficient"
          title="Sprawnie"
          description="Zarządzanie akwarium nigdy nie było tak proste!"
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
