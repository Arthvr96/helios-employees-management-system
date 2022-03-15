import React, { useEffect, useState } from 'react';
import { useWindowSize } from 'hooks/useWindowSize';
import PropTypes from 'prop-types';
import { CardTemplate } from 'components/templates/CardTemplate/CardTemplate';
import { CardTitle } from 'components/atoms/CardTitle/CardTitle';
import { Button } from 'components/atoms/Button/Button';
import { useGlobalState } from 'providers/GlobalStateProvider/GlobalStateProvider';
import { ReactComponent as EditButton } from 'assets/editButton.svg';
import HeliosAppSdk from 'HeliosAppSdk/HeliosAppSdk';
import LoaderRing from 'components/atoms/LoaderRing/LoaderRing';
import { Wrapper, StyledList, StyledInput, StyledButton } from './SettingsPanel.style';

const SettingsPanel = ({ isVisible, handleClose }) => {
  const { settings } = useGlobalState();
  const [inProgress, setInProgress] = useState(false);
  const [editMode, setEditMode] = useState({ dispoCopy: false, errors: false });
  const [values, setValues] = useState({ ...settings });
  const { width, height } = useWindowSize();
  const { updateSettings } = HeliosAppSdk.appState;

  const handleSetEditMode = (target) => {
    setEditMode({ ...editMode, [target]: !editMode[target] });
  };

  const handleSetValues = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleOnSave = () => {
    setInProgress(true);
    if (settings.dispoCopy !== values.dispoCopy || settings.errors !== values.errors) {
      updateSettings({ ...values })
        .then(() => {
          setInProgress(false);
          handleClose();
        })
        .catch((error) => window.alert(error));
    } else {
      setTimeout(() => {
        setInProgress(false);
        handleClose();
      }, 300);
    }
  };

  useEffect(() => {
    if (isVisible) {
      setValues({ ...settings });
      setEditMode({ dispoCopy: false, errors: false });
    }
  }, [isVisible]);

  return (
    <Wrapper isVisible={isVisible} widthSize={width} heightSize={height}>
      <CardTemplate minWidth="500px" position="relative">
        <CardTitle>Ustawienia</CardTitle>
        <StyledList>
          <li>
            <StyledButton type="button" onClick={() => handleSetEditMode('dispoCopy')}>
              Kopie dyspozycji na adres: <EditButton />
            </StyledButton>
          </li>
          <li>
            {editMode.dispoCopy ? (
              <StyledInput
                type="text"
                name="dispoCopy"
                value={values.dispoCopy}
                onChange={handleSetValues}
                editMode={editMode.dispoCopy}
              />
            ) : (
              values.dispoCopy
            )}
          </li>
          <li>
            <StyledButton type="button" onClick={() => handleSetEditMode('errors')}>
              Wiadomosci o bledach na adress: <EditButton />
            </StyledButton>
          </li>
          <li>
            {editMode.errors ? (
              <StyledInput
                type="text"
                name="errors"
                value={values.errors}
                onChange={handleSetValues}
                editMode={editMode.errors}
              />
            ) : (
              values.errors
            )}
          </li>
        </StyledList>
        {inProgress ? (
          <LoaderRing colorVariant2 />
        ) : (
          <div>
            <Button onClick={handleClose} isCancel margin="2rem 0 0 0" type="button">
              Anuluj
            </Button>
            <Button onClick={handleOnSave} margin="2rem 0 0 1rem" type="button">
              Zapisz
            </Button>
          </div>
        )}
      </CardTemplate>
    </Wrapper>
  );
};

export default SettingsPanel;

SettingsPanel.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
