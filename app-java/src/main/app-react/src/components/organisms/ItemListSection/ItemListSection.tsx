import { useState, useEffect } from 'react';
import Button from '../../atoms/Button/Button';
// import ListItem from '../../molecules/ListItem/ListItem';
import Link from '../../atoms/Link/Link';
import Icon from '../../atoms/Icon/Icon';
import {
  ItemListSectionWrapper,
  ItemListSectionHeader,
  ItemListSectionHeaderTitle,
  ItemListSectionContent,
} from './ItemListSection-styled';

interface ItemListSectionProps {
  onEditHandler: any;
  onCreateNewHandler: any;
  data: any;
}

const ItemListSection = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onEditHandler,
  onCreateNewHandler,
  data,
}: ItemListSectionProps) => {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 576);

  const isDataEmpty = !data || !data.length;

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
    <ItemListSectionWrapper>
      <ItemListSectionHeader>
        <ItemListSectionHeaderTitle>
          {isDataEmpty ? 'Brak rekordów' : 'Lista rekordów'}
        </ItemListSectionHeaderTitle>
        {isMobileView ? (
          <Link onClick={onCreateNewHandler}>
            <Icon variant="Add" size="64px" withhover="false" />
          </Link>
        ) : (
          <Button onClick={onCreateNewHandler} text="Stwórz nowy" />
        )}
      </ItemListSectionHeader>
      <ItemListSectionContent>
        {!isDataEmpty && 'Rekord istnieje! Zmapuj mnie!'}
      </ItemListSectionContent>
    </ItemListSectionWrapper>
  );
};

export default ItemListSection;
