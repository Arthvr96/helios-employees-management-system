import React from 'react';
import { CardTitle } from 'components/atoms/CardTitle/CardTitle';
import { CardTemplate } from 'components/templates/CardTemplate/CardTemplate';
import { Separator, StyledList } from './SchemaCreatorTutorial.style';

const SchemaCreatorTutorial = () => {
  return (
    <CardTemplate margin="2rem 0 0 0" padding="2rem 4rem">
      <CardTitle margin="0 0 2rem 0">Skróty klawiszowe</CardTitle>
      <StyledList>
        <Separator>*Żaden dzien nie jest zaznaczony*</Separator>
        <li>
          <span>Shift + →</span> - ostatni dzien z listy
        </li>
        <li>
          <span>Shift + ←</span> - pierwszy dzien z listy
        </li>
        <Separator>*Jakis dzien jest zaznaczony*</Separator>
        <li>
          <span>Shift + →</span> - następny dzien
        </li>
        <li>
          <span>Shift + ←</span> - poprzedni dzien
        </li>
        <li>
          <span>Shift + 1-7</span> - stanowiska pracy
        </li>
        <Separator>*Stanowisko pracy wybrane*</Separator>
        <li>
          <span>t</span> - włącz lub wyłącz stanowisko pracy
        </li>
        <Separator>*Stanowisko pracy wybrane i włączone*</Separator>
        <li>
          <span>n</span> - stwórz nową zmiane
        </li>
        <Separator>*Podczas tworzenia zmiany*</Separator>
        <li>
          <span>enter</span> - zatwierdza zmiane
        </li>
        <li>
          <span>esc</span> - anuluje tworzenie zmiany
        </li>
      </StyledList>
    </CardTemplate>
  );
};

export default SchemaCreatorTutorial;
