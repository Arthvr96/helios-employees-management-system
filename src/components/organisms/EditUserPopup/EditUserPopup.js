import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PopupWrapper from 'components/atoms/PopupWrapper/PopupWrapper';
import { Button } from 'components/atoms/Button/Button';
import { useAuth } from 'providers/AuthProvider/AuthProvider';
import { UserAvatar } from 'components/atoms/UserAvatar/UserAvatar';
import WorkplacesSwitchersList from 'components/molecules/WorkplacesSwitchersList/WorkplacesSwitchersList';
import { managementUsers } from 'functions/managementUsers';
import {
  StyledCardTemplate,
  StyledTitle,
  Name,
  ListValues,
  Span,
  WrapperButtons,
} from './EditUserPopup.style';

const EditUserPopup = ({ selectedUser, handleEditUserMode, isVisible, setComparisonObj }) => {
  const [user, setUser] = useState({});
  const [workplaces, setWorkplaces] = useState({});
  const { getUserInfo } = useAuth();
  const { updateUserInfo } = managementUsers();

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
          setComparisonObj(false);
        })
        .catch((error) => {
          window.alert(error.code);
        });
    } else {
      setComparisonObj(false);
    }
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
              setComparisonObj(false);
              comparison = false;
            }
          } else if (typeof userLocalStorage[key] === 'object') {
            for (const keyNested in userLocalStorage[key]) {
              if ({}.hasOwnProperty.call(userLocalStorage[key], keyNested)) {
                if (userLocalStorage[key][keyNested] !== user[key][keyNested]) {
                  setComparisonObj(false);
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
  setComparisonObj: PropTypes.func.isRequired,
};
