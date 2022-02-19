import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PopupWrapper from 'components/atoms/PopupWrapper/PopupWrapper';
import { Button } from 'components/atoms/Button/Button';
import { UserAvatar } from 'components/atoms/UserAvatar/UserAvatar';
import WorkplacesSwitchersList from 'components/molecules/WorkplacesSwitchersList/WorkplacesSwitchersList';
import { managementUsers } from 'functions/managementUsers';
import PopupConfirm from 'components/molecules/PopupConfirm/PopupConfirm';
import { useAdminContext } from 'providers/AdminStateProvider/AdminStateProvider';
import heliosAppSdk from 'HeliosAppSdk/HeliosAppSdk';
import {
  StyledCardTemplate,
  StyledTitle,
  Name,
  ListValues,
  Span,
  WrapperButtons,
  DeleteAccButton,
} from './EditUserPopup.style';

const EditUserPopup = ({
  selectedUser,
  handleEditUserMode,
  isVisible,
  triggerUpdateUsersList,
  setConfirmDeletion,
}) => {
  const [user, setUser] = useState({});
  const [popupToggle, setPopupToggle] = useState(false);
  const [workplaces, setWorkplaces] = useState({});
  const { getUserInfo } = heliosAppSdk.firestore;
  const { dispoSendInfo } = useAdminContext();
  const { updateUserInfo, deleteUser } = managementUsers();

  const getValues = (values) => {
    setWorkplaces({ ...values });
  };

  const handleUpdate = () => {
    let comparison = true;

    for (const key in user.workplaces) {
      if ({}.hasOwnProperty.call(user.workplaces, key)) {
        if (user.workplaces[key] !== workplaces[key]) {
          comparison = false;
        }
      }
    }

    if (!comparison) {
      updateUserInfo(user.id, { workplaces: { ...workplaces } })
        .then(() => {
          handleEditUserMode(false);
          const newUsersList = JSON.parse(localStorage.usersList).filter(
            (item) => item.id !== user.id,
          );
          newUsersList.push({ ...user, workplaces: { ...workplaces } });
          localStorage.setItem('usersList', JSON.stringify(newUsersList));
          triggerUpdateUsersList(false);
        })
        .catch((error) => {
          window.alert(error.code);
        });
    } else {
      triggerUpdateUsersList(false);
    }
  };

  const handleDeleteUser = () => {
    deleteUser(user.id, dispoSendInfo).then(() => {
      const newUsersList = JSON.parse(localStorage.usersList).filter((item) => item.id !== user.id);
      localStorage.setItem('usersList', JSON.stringify(newUsersList));
      triggerUpdateUsersList(false);
      handleEditUserMode(false);
      setConfirmDeletion({ id: user.id, status: true });
    });
  };

  useEffect(() => {
    if (selectedUser && isVisible) {
      getUserInfo(selectedUser).then((respond) => {
        setUser(JSON.parse(JSON.stringify(respond.data())));
      });
    }
  }, [selectedUser]);

  useEffect(() => {
    if (isVisible) {
      setWorkplaces({ ...user.workplaces });
    }
  }, [user]);

  useEffect(() => {
    if (selectedUser && isVisible) {
      const [userLocalStorage] = JSON.parse(localStorage.usersList).filter(
        (item) => item.id === user.id,
      );
      let comparison = true;
      for (const key in userLocalStorage) {
        if ({}.hasOwnProperty.call(userLocalStorage, key)) {
          if (typeof userLocalStorage[key] !== 'object') {
            if (userLocalStorage[key] !== user[key]) {
              triggerUpdateUsersList(false);
              comparison = false;
            }
          } else if (typeof userLocalStorage[key] === 'object') {
            for (const keyNested in userLocalStorage[key]) {
              if ({}.hasOwnProperty.call(userLocalStorage[key], keyNested)) {
                if (userLocalStorage[key][keyNested] !== user[key][keyNested]) {
                  triggerUpdateUsersList(false);
                  comparison = false;
                }
              }
            }
          }
        }
      }
      if (!comparison) {
        const newUsersList = JSON.parse(localStorage.usersList).filter(
          (item) => item.id !== user.id,
        );
        newUsersList.push({ ...user });
        localStorage.setItem('usersList', JSON.stringify(newUsersList));
      }
    }
  }, [user]);

  return (
    <PopupWrapper isVisible={isVisible}>
      <PopupConfirm
        isVisible={popupToggle}
        handleConfirm={handleDeleteUser}
        handleCancel={() => setPopupToggle(false)}
        title="Usuwanie użytkownika"
        subtitle={`Czy napewno chcesz usunąc użytkownika : ${user.firstName} ${user.lastName}`}
      />
      <StyledCardTemplate>
        <StyledTitle fontSize="l">Profil użytkownika</StyledTitle>
        <UserAvatar bgColor="#002047" size="xl">
          <span>{user.firstName && user.firstName.slice(0, 3)}</span>
          <span>{user.lastName && user.lastName.slice(0, 3)}</span>
        </UserAvatar>
        <Name>{`${user.firstName} ${user.lastName}`}</Name>
        <ListValues>
          <li>
            Email <Span>{user.email}</Span>
          </li>
          <li>
            Alias
            <Span isCapitalize>{user.alias}</Span>
          </li>
          <li>Uprawnienia </li>
        </ListValues>
        <WorkplacesSwitchersList initState={user.workplaces} getValues={getValues} />
        <DeleteAccButton type="click" onClick={() => setPopupToggle(true)}>
          usuń użytkownika
        </DeleteAccButton>
        <WrapperButtons>
          <Button type="button" onClick={handleUpdate}>
            Zapisz
          </Button>
          <Button type="button" isCancel onClick={() => handleEditUserMode(false)}>
            Anuluj
          </Button>
        </WrapperButtons>
      </StyledCardTemplate>
    </PopupWrapper>
  );
};

export default EditUserPopup;

EditUserPopup.propTypes = {
  selectedUser: PropTypes.string,
  handleEditUserMode: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
  triggerUpdateUsersList: PropTypes.func.isRequired,
  setConfirmDeletion: PropTypes.func.isRequired,
};
