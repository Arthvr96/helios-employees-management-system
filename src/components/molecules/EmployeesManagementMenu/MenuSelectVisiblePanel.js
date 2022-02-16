import React from 'react';
import PropTypes from 'prop-types';
import { CardTemplate } from 'components/templates/CardTemplate/CardTemplate';
import { CardNav, CardNavButton } from './MenuSelectVisiblePanel.style';

const MenuSelectVisiblePanel = ({ state, handleClick, links }) => {
  return (
    <CardTemplate margin="0 0 2rem 0">
      <CardNav>
        {links.map((el) => (
          <li>
            <CardNavButton
              key={el[0]}
              onClick={() => {
                handleClick(el[0]);
              }}
              isSelected={state === el[0]}
            >
              {el[1]}
            </CardNavButton>
          </li>
        ))}
      </CardNav>
    </CardTemplate>
  );
};

export default MenuSelectVisiblePanel;

MenuSelectVisiblePanel.propTypes = {
  state: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  links: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
};
