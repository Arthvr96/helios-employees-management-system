import React, { useEffect, useState } from 'react';
import { CardTitle } from 'components/atoms/CardTitle/CardTitle';
import PopupWrapper from 'components/atoms/PopupWrapper/PopupWrapper';
import { Button } from 'components/atoms/Button/Button';
import { getCookie, setCookie } from 'utliltes/cookies';
import PropTypes from 'prop-types';
import { CardSubtitle } from 'components/atoms/CardSubtitle/CardSubtitle';
import {
  StyledSubTitle,
  StyledCardTemplate,
  Wrapper,
  RestUpdates,
  Paragraph,
} from './UpdateinfoPopup.style';

const UpdateInfoPopup = ({ info, cookieName, lastUpdate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const actualUpdate = info[0];
  const restUpdates = [...info];
  restUpdates.shift();

  const handleClose = () => {
    setIsVisible(false);
    setCookie(cookieName, lastUpdate, 9999);
  };

  const handleOpenRestChanges = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const cookieValue = getCookie(cookieName);
    if (lastUpdate && cookieValue !== lastUpdate) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [lastUpdate]);

  return (
    <PopupWrapper isVisible={isVisible}>
      <StyledCardTemplate>
        <CardTitle>{`Zmiany z dnia ${actualUpdate.date}`}</CardTitle>
        <CardSubtitle fontSize="s">{`ver app: ${actualUpdate.ver}`}</CardSubtitle>
        {actualUpdate.changeLog.map(({ description, title }, i) => (
          <Wrapper key={title}>
            <StyledSubTitle key={title} fontSize="s">{`${i + 1}) ${title}`}</StyledSubTitle>
            <Paragraph key={description}>{description}</Paragraph>
          </Wrapper>
        ))}
        <RestUpdates isOpen={isOpen}>
          {restUpdates.map((el) => (
            <Wrapper key={el.date}>
              <CardTitle>{`Zmiany z dnia ${el.date}`}</CardTitle>
              <CardSubtitle fontSize="s">{`ver app: ${el.ver}`}</CardSubtitle>
              {el.changeLog.map(({ description, title }, i) => (
                <Wrapper key={title}>
                  <StyledSubTitle fontSize="s">{`${i + 1}) ${title}`}</StyledSubTitle>
                  <Paragraph>{description}</Paragraph>
                </Wrapper>
              ))}
            </Wrapper>
          ))}
        </RestUpdates>
        {restUpdates.length ? (
          <Button margin="2rem 0 0 0" onClick={handleOpenRestChanges}>
            {!isOpen ? 'Pokaz wczesniejsze zmiany' : 'Ukryj wczesniejsze zmiany'}
          </Button>
        ) : null}

        <Button margin="2rem 0 0 0" onClick={handleClose}>
          Zamknij
        </Button>
      </StyledCardTemplate>
    </PopupWrapper>
  );
};

export default UpdateInfoPopup;

UpdateInfoPopup.propTypes = {
  cookieName: PropTypes.string.isRequired,
  lastUpdate: PropTypes.string,
  info: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
      ]),
    ),
  ),
};
