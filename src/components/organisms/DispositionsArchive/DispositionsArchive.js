import React, { useState } from 'react';
import { CardTemplate } from 'components/templates/CardTemplate/CardTemplate';
import { CardTitle } from 'components/atoms/CardTitle/CardTitle';
import InputSelect from 'components/atoms/InputSelect/InputSelect';
import { CardSubtitle } from 'components/atoms/CardSubtitle/CardSubtitle';
import { Button } from 'components/atoms/Button/Button';
import { Wrapper } from './DispositionsArchive.style';

const values = ['Aktualny-01-02-2022-07-02-2022', '08-02-2022-15-02-2022', '16-02-2022-23-02-2022'];

const DispositionsArchive = () => {
  const [selectedCycle, setSelectedCycle] = useState('selectCycle');

  const handleGetDisposition = () => {
    console.log(selectedCycle);
  };

  return (
    <CardTemplate>
      <CardTitle>Archiwum wysłanych dyspozycji</CardTitle>
      <Wrapper>
        <CardSubtitle fontWeight="regular" margin="0 1rem 0 0">
          Wybierz dyspozycje z okresu:
        </CardSubtitle>
        <InputSelect
          margin="1rem 0 0 0"
          values={values}
          value={selectedCycle}
          handleChange={setSelectedCycle}
        />
      </Wrapper>
      <Button
        onClick={handleGetDisposition}
        margin="1rem 0 0 0"
        disabled={selectedCycle === 'selectCycle'}
      >
        Wyświetl dyspozycje
      </Button>
    </CardTemplate>
  );
};

export default DispositionsArchive;
