import React, { useState } from 'react';
import ViewTemplate from 'components/templates/ViewTemplate/ViewTemplate';
import { CardTemplate } from 'components/templates/CardTemplate/CardTemplate';
import LoginPanelForm from 'components/organisms/LoginPanelForm/LoginPanelForm';
import { CardSubtitle } from 'components/atoms/CardSubtitle/CardSubtitle';
import BasicForm from 'components/organisms/BasicForm/BasicForm';
import PopupInfo from 'components/molecules/PopupInfo/PopupInfo';
import { StyledTitle, Version, Copyrights } from './LoginPanel.style';

const LoginPanel = () => {
  const [isVisibile, setIsVisible] = useState(false);
  const [basicForm, setBasicForm] = useState(false);
  const [isResetPassword, setResetPassword] = useState(false);

  const handleChangePage = () => {
    setResetPassword(!isResetPassword);
  };

  const handleConfirm = () => {
    setIsVisible(false);
    setBasicForm(false);
  };

  return (
    <ViewTemplate navMargin="0" alignItems="center">
      {!basicForm ? (
        <CardTemplate>
          <StyledTitle>{isResetPassword ? 'Zresetuj hasło' : 'Logowanie'}</StyledTitle>
          <LoginPanelForm
            isResetPassword={isResetPassword}
            handleChangePage={handleChangePage}
            handleBasicForm={() => setBasicForm(true)}
          />
          <Version>v0.3</Version>
        </CardTemplate>
      ) : null}
      {basicForm ? (
        <CardTemplate>
          <StyledTitle>Zgłoś swój email i dane</StyledTitle>
          <CardSubtitle>
            Na podstawie tych danych bedą tworzone konta, Prosze o poprawne wypełnienie formularza
            bez śmieszków 💩
          </CardSubtitle>
          <BasicForm
            handleBasicForm={setBasicForm}
            setIsVisible={setIsVisible}
            handleConfirm={handleConfirm}
          />
        </CardTemplate>
      ) : null}
      <Copyrights>
        © All rights reserved | <span>Created by Artur Chmielewski</span>
      </Copyrights>
      <PopupInfo
        isVisible={isVisibile}
        handleConfirm={handleConfirm}
        title="Dane zostały wysłane"
        subtitle="W przyszłosci za pomocą maila będziesz logować sie do systemu, wczesniej będzie trzeba zresetować hasło"
      />
    </ViewTemplate>
  );
};

export default LoginPanel;
