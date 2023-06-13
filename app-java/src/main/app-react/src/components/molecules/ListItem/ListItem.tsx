/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ListItemWrapper,
  ListItemContent,
  ListItemContentTitle,
  ListItemContentDescription,
  ListItemContentDescriptionItem,
  ListItemActions,
  ListItemActionsDescription,
  ListItemActionsButtonWrapper,
  ListItemActionsDescriptionWrapper,
} from './ListItem-styled';
import Button from '../../atoms/Button/Button';

interface ListItemProps {
  variant:
    | 'aquariumTemplate'
    | 'knowledgeBase'
    | 'fishType'
    | 'accessoryType'
    | 'decoratorType'
    | 'aquarium';
  onEditClick: any;
  data: any;
}

const ListItem = ({ variant, onEditClick, data }: ListItemProps) => {
  return (
    <ListItemWrapper>
      <ListItemContent>
        <ListItemContentTitle>
          {data.name || `${data.problemType}`}
        </ListItemContentTitle>
        <ListItemContentDescription>
          {data.info && (
            <ListItemContentDescriptionItem>
              {data.info}
            </ListItemContentDescriptionItem>
          )}
          {!!(data.accessories && data.accessories.length) && (
            <ListItemContentDescriptionItem>
              Liczba akcesoriów: {data.accessories.length}
            </ListItemContentDescriptionItem>
          )}
          {!!(data.decorators && data.decorators.length) && (
            <ListItemContentDescriptionItem>
              Liczba dekoracji: {data.decorators.length}
            </ListItemContentDescriptionItem>
          )}
          {!!(data.fishes && data.fishes.length) && (
            <ListItemContentDescriptionItem>
              Liczba ryb: {data.fishes.length}
            </ListItemContentDescriptionItem>
          )}
        </ListItemContentDescription>
      </ListItemContent>
      <ListItemActions>
        {/* <ListItemActionsDescriptionWrapper>
          <ListItemActionsDescription>
            Ostatnia edycja
          </ListItemActionsDescription>
          <ListItemActionsDescription>data</ListItemActionsDescription>
        </ListItemActionsDescriptionWrapper> */}

        <ListItemActionsButtonWrapper>
          <Button text="Edytuj" onClick={onEditClick} />
        </ListItemActionsButtonWrapper>
        <ListItemActionsButtonWrapper
          style={{ paddingTop: '5px' }}
        ></ListItemActionsButtonWrapper>
      </ListItemActions>
    </ListItemWrapper>
  );
};

export default ListItem;
