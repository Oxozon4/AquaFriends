/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ListItemWrapper,
  ListItemContent,
  ListItemContentTitle,
  ListItemContentDescription,
  ListItemContentDescriptionItem,
  ListItemActions,
  ListItemActionsButtonWrapper,
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
  onDeleteHandler: any;
  onMonitorHandler: any;
  data: any;
}

const ListItem = ({
  variant,
  onEditClick,
  onDeleteHandler,
  onMonitorHandler,
  data,
}: ListItemProps) => {
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
        {variant === 'aquarium' && (
          <ListItemActionsButtonWrapper
            style={{
              marginBottom: '10px',
            }}
          >
            <Button
              text="Monitor"
              variant="secondary"
              onClick={onMonitorHandler}
            />
          </ListItemActionsButtonWrapper>
        )}

        <ListItemActionsButtonWrapper>
          <Button text="Usuń" onClick={onDeleteHandler} variant="danger" />
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
