import React, { useEffect, useState } from 'react';
import { CardTemplate } from 'components/templates/CardTemplate/CardTemplate';
import { CardTitle } from 'components/atoms/CardTitle/CardTitle';
import PopupWrapper from 'components/atoms/PopupWrapper/PopupWrapper';
import { Button } from 'components/atoms/Button/Button';
import { getCookie, setCookie } from 'utliltes/cookies';
import { useGlobalState } from 'providers/GlobalStateProvider/GlobalStateProvider';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CardSubtitle } from 'components/atoms/CardSubtitle/CardSubtitle';

const Wrapper = styled.div`
  width: 100%;
`;

const StyledCardTemplate = styled(CardTemplate)`
  width: 50vw;
  max-height: 80vh;
  overflow-y: scroll;
`;

const RestUpdates = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

const StyledSubTitle = styled(CardSubtitle)`
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.black};
  width: 100%;
  margin-bottom: 1rem;
  text-align: left;
`;

const Paragraph = styled.p`
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  color: ${({ theme }) => theme.colors.text.black};
  width: 100%;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.decors.grey};
  margin-bottom: 1rem;
`;

const UpdateInfoPopup = ({ info }) => {
  const { appState } = useGlobalState();
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const actualUpdate = info[0];
  const restUpdates = [...info];
  restUpdates.shift();

  const handleClose = () => {
    setIsVisible(false);
    setCookie('lastUpdate', appState.lastUpdate, 9999);
  };

  const handleOpenRestChanges = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const lastUpdate = getCookie('lastUpdate');
    if (lastUpdate !== appState.lastUpdate) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [appState.lastUpdate]);

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
  info: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
      ]),
    ),
  ),
};
