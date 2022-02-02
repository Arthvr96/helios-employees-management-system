import React from 'react';
import PropTypes from 'prop-types';
import ViewTemplate from 'components/templates/ViewTemplate/ViewTemplate';
import { CardTemplate } from 'components/templates/CardTemplate/CardTemplate';
import { CardTitle } from 'components/atoms/CardTitle/CardTitle';
import { CardSubtitle } from 'components/atoms/CardSubtitle/CardSubtitle';
import { SubmitButton } from 'components/atoms/SubmitButton/SubmitButton';

const Site404 = ({ reDirect }) => {
  return (
    <ViewTemplate>
      <CardTemplate>
        <CardTitle>Strona 404</CardTitle>
        <CardSubtitle> Zgubiłeś się ? Guzik poniżej uratuje Cię</CardSubtitle>
        <SubmitButton type="button" onClick={reDirect}>
          Wróc w na bezpieczne wody:
        </SubmitButton>
      </CardTemplate>
    </ViewTemplate>
  );
};

export default Site404;

Site404.propTypes = {
  reDirect: PropTypes.func.isRequired,
};
