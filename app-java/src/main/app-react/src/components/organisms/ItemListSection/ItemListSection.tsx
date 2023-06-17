/* eslint-disable @typescript-eslint/no-empty-function */
import { useState, useEffect } from 'react';
import Button from '../../atoms/Button/Button';
import ListItem from '../../molecules/ListItem/ListItem';
import Link from '../../atoms/Link/Link';
import Icon from '../../atoms/Icon/Icon';
import {
  ItemListSectionWrapper,
  ItemListSectionHeader,
  ItemListSectionHeaderTitle,
  ItemListSectionContent,
} from './ItemListSection-styled';

interface ItemListSectionProps {
  onEditHandler: (arg0: number) => void;
  onCreateNewHandler: () => void;
  onDeleteHandler: (arg0: number) => void;
  onResumeHandler: any;
  onMonitorHandler: any;
  itemVariant:
    | 'aquariumTemplate'
    | 'knowledgeBase'
    | 'fishType'
    | 'accessoryType'
    | 'decoratorType'
    | 'aquarium';
  data: any;
}

const ItemListSection = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onEditHandler,
  onCreateNewHandler,
  itemVariant,
  data,
  onDeleteHandler,
  onMonitorHandler,
  onResumeHandler,
}: ItemListSectionProps) => {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 576);

  const isDataEmpty = !data || !data.length;
  const isUserView = itemVariant === 'aquarium';

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
          {isDataEmpty
            ? 'Brak rekordów'
            : isUserView
            ? 'Twoje akwaria'
            : 'Lista rekordów'}
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
        {data &&
          data.map((item: any) => {
            return (
              <ListItem
                key={item.id}
                variant={itemVariant}
                data={item}
                onEditClick={() => {
                  onEditHandler(item.id);
                }}
                onDeleteHandler={() => onDeleteHandler(item.id)}
                onMonitorHandler={() => onMonitorHandler(item)}
                onResumeHandler={() => onResumeHandler(item.id)}
              />
            );
          })}
      </ItemListSectionContent>
    </ItemListSectionWrapper>
  );
};

export default ItemListSection;
