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
  onClick: any;
  onFormPreviewHandler: any;
}

const ListItem = ({ onClick, onFormPreviewHandler }: ListItemProps) => {
  return (
    <ListItemWrapper>
      <ListItemContent>
        <ListItemContentTitle>Tytuł</ListItemContentTitle>
        <ListItemContentDescription>
          <ListItemContentDescriptionItem>
            Formularz nie został jeszcze wypełniony
          </ListItemContentDescriptionItem>
        </ListItemContentDescription>
      </ListItemContent>
      <ListItemActions>
        <ListItemActionsDescriptionWrapper>
          <ListItemActionsDescription>
            Ostatnia edycja
          </ListItemActionsDescription>
          <ListItemActionsDescription>data</ListItemActionsDescription>
        </ListItemActionsDescriptionWrapper>

        <ListItemActionsButtonWrapper>
          <Button text="Edytuj" onClick={() => onClick()} />
          <Button
            text="Podgląd"
            variant="secondary"
            onClick={() => onFormPreviewHandler()}
            type="button"
          />
        </ListItemActionsButtonWrapper>
        <ListItemActionsButtonWrapper
          style={{ paddingTop: '5px' }}
        ></ListItemActionsButtonWrapper>
      </ListItemActions>
    </ListItemWrapper>
  );
};

export default ListItem;
