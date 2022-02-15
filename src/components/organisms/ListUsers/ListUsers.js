import React, { useEffect, useState } from 'react';
import { useListUsers } from 'hooks/useListUsers';
import { UserAvatar } from 'components/atoms/UserAvatar/UserAvatar';
import SearchBar from 'components/organisms/SearchBar/SearchBar';
import EditUserPopup from 'components/organisms/EditUserPopup/EditUserPopup';
import PopupInfo from 'components/molecules/PopupInfo/PopupInfo';
import { Wrapper, List, StyledTitle } from './ListUsers.style';

const initState = {
  obs1: false,
  obs2: false,
  bar1: false,
  bar2: false,
  coffee: false,
  tickets: false,
  night: false,
};

const ListUsers = () => {
  const respond = useListUsers();
  const [usersList, setUsersList] = useState([]);
  const [selectValue, setSelectValue] = useState('-');
  const [searchValue, setSearchValue] = useState('');
  const [filterBox, setFilterBox] = useState(false);
  const [filterOptions, setFilterOptions] = useState({ ...initState });
  const [editUserMode, setMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  const [triggerUpdateUsersList, setTriggerUpdateUsersList] = useState(true);
  const [confirmDeletion, setConfirmDeletion] = useState({ id: '', status: false });

  const handleEditUserMode = (mode, id) => {
    if (mode) {
      setSelectedUser(id);
      setMode(true);
    } else if (!mode) {
      setMode(false);
      setSelectedUser('');
    }
  };

  useEffect(() => {
    if (respond.length > 0) {
      setUsersList(JSON.parse(JSON.stringify(respond)));
    }
  }, [respond]);

  useEffect(() => {
    if (!triggerUpdateUsersList) {
      setUsersList(JSON.parse(localStorage.usersList));
      setTriggerUpdateUsersList(true);
    }
  }, [triggerUpdateUsersList]);

  return (
    <>
      <EditUserPopup
        selectedUser={selectedUser}
        handleEditUserMode={handleEditUserMode}
        isVisible={editUserMode}
        triggerUpdateUsersList={setTriggerUpdateUsersList}
        setConfirmDeletion={setConfirmDeletion}
      />
      <PopupInfo
        isVisible={confirmDeletion.status}
        handleConfirm={() => setConfirmDeletion({ id: '', status: false })}
        title="Użytkownik usunięty"
        subtitle={`Pamietaj aby usunąć użytkownika ręcznie z bazy danych firebase! id: ${confirmDeletion.id}`}
      />
      <Wrapper>
        <StyledTitle>{`Lista użytkowników (${usersList.length})`}</StyledTitle>
        <SearchBar
          respond={respond}
          usersList={usersList}
          setUsersList={setUsersList}
          filterBox={filterBox}
          setFilterOptions={setFilterOptions}
          setSearchValue={setSearchValue}
          selectValue={selectValue}
          filterOptions={filterOptions}
          setFilterBox={setFilterBox}
          searchValue={searchValue}
          setSelectValue={setSelectValue}
        />
        <List>
          {usersList.map((user) => (
            <li key={user.id}>
              <button type="button" onClick={() => handleEditUserMode(true, user.id)}>
                <UserAvatar size="xl" bgColor="#002047">
                  <span>{user.lastName.slice(0, 3)}</span>
                  <span>{user.firstName.slice(0, 3)}</span>
                </UserAvatar>
                <p>{`${user.lastName} ${user.firstName}`}</p>
              </button>
            </li>
          ))}
        </List>
      </Wrapper>
    </>
  );
};

export default ListUsers;
