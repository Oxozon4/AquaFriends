import { useState, useEffect } from 'react';
import Button from '../../atoms/Button/Button';
import ListItem from '../../molecules/ListItem/ListItem';
import Link from '../../atoms/Link/Link';
import Icon from '../../atoms/Icon/Icon';
import {
  FormsListSectionWrapper,
  FormsListSectionHeader,
  FormsListSectionHeaderTitle,
  FormsListSectionContent,
} from './FormsListSection-styled';

interface FormsListSectionProps {
  onEditHandler: any;
  onCreateNewHandler: any;
}

const FormsListSection = ({
  onEditHandler,
  onCreateNewHandler,
}: FormsListSectionProps) => {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 576);

  const handleResize = () => {
    setIsMobileView(window.innerWidth < 576);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.addEventListener('resize', handleResize);
    };
  }, []);

  return (
    <FormsListSectionWrapper>
      <FormsListSectionHeader>
        <FormsListSectionHeaderTitle>
          Nie masz obecnie żadnych stworzonych akwariów.
        </FormsListSectionHeaderTitle>
        {isMobileView ? (
          <Link onClick={onCreateNewHandler}>
            <Icon variant="Add" size="64px" withhover="false" />
          </Link>
        ) : (
          <Button onClick={onCreateNewHandler} text="Stwórz nowy" />
        )}
      </FormsListSectionHeader>
      <FormsListSectionContent>content</FormsListSectionContent>
    </FormsListSectionWrapper>
  );
};

export default FormsListSection;
