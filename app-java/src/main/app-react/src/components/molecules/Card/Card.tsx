import { CardWrapper, CardTitle, CardDescription } from './Card-styled';
import Icon from '../../atoms/Icon/Icon';

interface CardProps {
  image: 'Fast' | 'Efficient' | 'Free';
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({
  image,
  title,
  description,
}: CardProps) => {
  return (
    <CardWrapper data-aos="fade-up">
      {image === 'Fast' && <Icon variant={image} />}
      {image === 'Efficient' && <Icon variant={image} />}
      {image === 'Free' && <Icon variant={image} />}
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardWrapper>
  );
};

export default Card;
