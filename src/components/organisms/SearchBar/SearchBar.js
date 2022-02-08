import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Wrapper, FilterBox, FilterButton } from './SearchBar.style';

const SELECTOPTIONS = [
  ['bar1', 'bar1'],
  ['bar2', 'bar2'],
  ['obs1', 'obs1'],
  ['obs2', 'obs2'],
  ['coffee', 'kawiarnia'],
  ['tickets', 'kasa'],
  ['night', 'zamkniecia'],
];

const SearchBar = ({
  respond,
  usersList,
  setUsersList,
  selectValue,
  setSelectValue,
  searchValue,
  setSearchValue,
  filterBox,
  setFilterBox,
  filterOptions,
  setFilterOptions,
}) => {
  const handleSetFilter = (name) => {
    setFilterOptions({ ...filterOptions, [name]: !filterOptions[name] });
  };

  const onSort = (type) => {
    const arr = [...usersList];
    if (type === 'a-z') {
      arr.sort((a, b) => a.lastName.localeCompare(b.lastName));
    }
    if (type === 'z-a') {
      arr.sort((a, b) => b.lastName.localeCompare(a.lastName));
    }
    setUsersList([...arr]);
  };

  useEffect(() => {
    if (respond) {
      setUsersList(JSON.parse(JSON.stringify(respond)));
    }

    const { obs1, obs2, bar1, bar2, coffee, tickets, night } = filterOptions;
    const options = [obs1, obs2, bar1, bar2, coffee, tickets, night];
    let optionState = false;
    options.forEach((option) => {
      if (option) {
        optionState = true;
      }
    });
    if (searchValue !== '' || optionState) {
      const arr = JSON.parse(localStorage.usersList);
      const filter = arr.filter((value) => {
        const fullName = `${value.lastName}${value.firstName}`;
        const search = searchValue.toLowerCase().trim();

        if (searchValue !== '' && !optionState) {
          if (fullName.includes(search)) {
            return true;
          }
        }

        const checkOptions = () => {
          if (obs1 && value.workplaces.obs1) {
            return true;
          }
          if (obs2 && value.workplaces.obs2) {
            return true;
          }
          if (bar1 && value.workplaces.bar1) {
            return true;
          }
          if (bar2 && value.workplaces.bar2) {
            return true;
          }
          if (coffee && value.workplaces.coffee) {
            return true;
          }
          if (tickets && value.workplaces.tickets) {
            return true;
          }
          return !!(night && value.workplaces.night);
        };

        if (searchValue === '' && optionState) {
          return checkOptions();
        }

        if (searchValue !== '' && optionState) {
          if (fullName.includes(search)) {
            return checkOptions();
          }
        }

        return null;
      });
      setUsersList(filter);
    }
  }, [searchValue, filterOptions]);

  useEffect(() => {
    if (selectValue !== '-') {
      onSort(selectValue);
    }
  }, [selectValue]);

  return (
    <Wrapper>
      <label htmlFor="sort">
        Sortowanie:
        <select name="sort" value={selectValue} onChange={(e) => setSelectValue(e.target.value)}>
          <option disabled value="-">
            -
          </option>
          <option value="a-z">Alfabetycznie A-Z</option>
          <option value="z-a">Alfabetycznie Z-A</option>
        </select>
      </label>
      <label htmlFor="search">
        Wyszukaj:
        <input
          name="search"
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </label>
      <label htmlFor="filter" className="filter">
        <FilterButton isOpen={filterBox} type="button" onClick={() => setFilterBox(!filterBox)}>
          {' '}
          {filterBox ? 'Filtruj ↓' : 'Filtruj ↑'}
        </FilterButton>
        <FilterBox isOpen={filterBox}>
          {SELECTOPTIONS.map((option) => (
            <label key={option[0]} htmlFor={option[0]}>
              {`${option[1]} `}
              <input
                checked={filterOptions[option[0]]}
                onChange={(e) => handleSetFilter(e.target.name)}
                name={option[0]}
                type="checkbox"
              />
            </label>
          ))}
        </FilterBox>
      </label>
    </Wrapper>
  );
};

export default SearchBar;

SearchBar.propTypes = {
  respond: PropTypes.arrayOf(
    PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      email: PropTypes.string,
      alias: PropTypes.string,
      id: PropTypes.string,
      workplaces: PropTypes.objectOf(PropTypes.bool),
    }),
  ),
  usersList: PropTypes.arrayOf(
    PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      email: PropTypes.string,
      alias: PropTypes.string,
      id: PropTypes.string,
      workplaces: PropTypes.objectOf(PropTypes.bool),
    }),
  ),
  setUsersList: PropTypes.func.isRequired,
  selectValue: PropTypes.string.isRequired,
  setSelectValue: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
  setSearchValue: PropTypes.func.isRequired,
  filterBox: PropTypes.bool.isRequired,
  setFilterBox: PropTypes.func.isRequired,
  filterOptions: PropTypes.objectOf(PropTypes.bool),
  setFilterOptions: PropTypes.func.isRequired,
};
