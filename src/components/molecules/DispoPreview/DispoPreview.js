import React from 'react';
import HeliosAppSdk from 'HeliosAppSdk/HeliosAppSdk';
import PropTypes from 'prop-types';
import { List, Message, Wrapper, StyledTitle } from './DispoPreview.style';

const DispoPreview = ({ isVisible, days, dispo }) => {
  const { getShiftMark, getDayShortName, convertFormatDate } = HeliosAppSdk.__helpers__;
  return (
    <Wrapper isVisible={isVisible}>
      <List>
        {days &&
          days.map((el, i) => (
            <li key={el[0]}>
              {`${getDayShortName(el[0])} ${convertFormatDate(el[1])}`}
              <span>{getShiftMark(dispo.dispo[i])}</span>
            </li>
          ))}
      </List>
      <StyledTitle as="p">Wiadomość:</StyledTitle>
      <Message>{dispo.message || 'Brak wiadomości'}</Message>
    </Wrapper>
  );
};

export default DispoPreview;

DispoPreview.propTypes = {
  isVisible: PropTypes.bool,
  days: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  dispo: PropTypes.shape({
    dispo: PropTypes.arrayOf(
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool])),
    ),
    message: PropTypes.string,
  }),
};
