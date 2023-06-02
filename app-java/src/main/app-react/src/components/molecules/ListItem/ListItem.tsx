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
    | 'decoratorType';
  onEditClick: any;
  data: any;
}

const ListItem = ({ variant, onEditClick, data }: ListItemProps) => {
  return (
    <ListItemWrapper>
      <ListItemContent>
        <ListItemContentTitle>{data.name}</ListItemContentTitle>
        {/* <ListItemContentDescription>
          <ListItemContentDescriptionItem>
            Formularz nie został jeszcze wypełniony
          </ListItemContentDescriptionItem>
        </ListItemContentDescription> */}
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
