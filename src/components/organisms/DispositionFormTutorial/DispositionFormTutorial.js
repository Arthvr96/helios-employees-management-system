import React, { useEffect, useState } from 'react';
import { useWindowSize } from 'hooks/useWindowSize';
import { Button } from 'components/atoms/Button/Button';
import PropTypes from 'prop-types';
import { Wrapper, Title, Paragraph, Navigation, Content } from './DispositionFormTutorial.style';

const Page0 = ({ pageNumber }) => {
  return (
    <>
      <Title>{`Wysyłanie dyspozycji (${pageNumber + 1}/6)`}</Title>
      <Paragraph margin="0.5rem 0 0 0">Tutorial wysyłania dyspozycji.</Paragraph>
      <Paragraph margin="0.5rem 0 0 0">
        Formularz składa się z kafelek. <br /> Każdy kafelek to inny dzień (patrz: data i nazwa
        dnia).
      </Paragraph>
      <center>
        <Paragraph margin="0.5rem 0 0 0">
          W każdym kafelku do wyboru są 3 opcje : <br />
          <br />
          <strong>Wolne / C / Zakres</strong>
        </Paragraph>
      </center>
    </>
  );
};

Page0.propTypes = {
  pageNumber: PropTypes.number.isRequired,
};

const Page1 = ({ pageNumber }) => {
  return (
    <>
      <Title>{`Opcja Wolne (${pageNumber + 1}/6)`}</Title>
      <Paragraph margin="0.5rem 0 0 0">
        Domyślnie wybrana opcja oznaczająca dzień wolny od pracy.
      </Paragraph>
    </>
  );
};

Page1.propTypes = {
  pageNumber: PropTypes.number.isRequired,
};
const Page2 = ({ pageNumber }) => {
  return (
    <>
      <Title>{`Opcja C (${pageNumber + 1}/6)`}</Title>
      <Paragraph margin="1rem 0 0 0">
        Opcja oznaczająca dyspozycję przez cały dzień (czyli zwykle C). <br /> Po wybraniu tej opcji
        pojawią się 2 pola które dodatkowo można zaznaczyć.
      </Paragraph>
      <Paragraph margin="1rem 0 0 0">
        Pierwsze pole do zaznaczenia to całka/total/C+ <br /> <br />
        Drugie to maraton.
      </Paragraph>
      <Paragraph margin="1rem 0 0 0">
        Drugie pole jest możliwe do zaznaczenia tylko wtedy gdy kierownik je odblokuje.
      </Paragraph>
      <Paragraph margin="1rem 0 0 0">
        <strong>Przyklady</strong>
      </Paragraph>
      <ul>
        <li>
          <Paragraph margin="0.5rem 0 0 0">
            {`Wybrana opcja "C" -> kierownik dostaje ‘C’`}
          </Paragraph>
          <Paragraph margin="0.5rem 0 0 0">
            {`Wybrana opcja "C" + pole 'calka/total/C+"  ->  ‘C+’`}
          </Paragraph>
          <Paragraph margin="0.5rem 0 0 0">
            {`Wybrana opcja "C" + pole 'maraton"  ->  ‘M’`}
          </Paragraph>
          <Paragraph margin="0.5rem 0 0 0">
            {`Wybrana opcja "C" + oba pola zaznaczone  ->  ‘M+’`}
          </Paragraph>
        </li>
      </ul>
    </>
  );
};

Page2.propTypes = {
  pageNumber: PropTypes.number.isRequired,
};
const Page3 = ({ pageNumber }) => {
  return (
    <>
      <Title>{`Opcja Zakres (${pageNumber + 1}/6)`}</Title>
      <Paragraph margin="0.5rem 0 0 0">
        Opcja oznaczająca dyspozycje w określonych godzinach. <br /> Z 2 rozwijanych list (lista OD
        i lista DO) możesz wybrać zakres od ktorej do ktorej mozesz pracowac.
      </Paragraph>
      <Paragraph margin="0.5rem 0 0 0">
        Jedna z wartości może zostać określona jako ‘obojętnie’. Dzięki czemu ograniczasz tylko OD
        lub DO ktorej mozesz pracowac.
      </Paragraph>
      <Paragraph margin="1rem 0 0 0">
        <strong>Przyklady</strong>
      </Paragraph>
      <ul>
        <li>
          <Paragraph margin="0.5rem 0 0 0">
            {`OD : ‘8’’ | DO: ‘20:00’ -> kierownik dostaje : ‘8-20’`}
          </Paragraph>
          <Paragraph margin="0.5rem 0 0 0">{`OD : ‘obojetnie’ | DO: ‘16:00’ -> ‘do 16’`}</Paragraph>
          <Paragraph margin="0.5rem 0 0 0">{`OD : 14 | DO: ‘obojetnie’ -> ‘od 14’`}</Paragraph>
        </li>
      </ul>
    </>
  );
};

Page3.propTypes = {
  pageNumber: PropTypes.number.isRequired,
};

const Page4 = ({ pageNumber }) => {
  return (
    <>
      <Title>{`Wiadomosc do dyspozycji (${pageNumber + 1}/6)`}</Title>
      <Paragraph margin="0.5rem 0 0 0">
        Na samym dole formularza znajduje sie pole tekstowe w którym można zostawić wiadomość dla
        kierownika.
      </Paragraph>
      <Paragraph margin="0.5rem 0 0 0">Max długość wiadomości to 500 znaków.</Paragraph>
    </>
  );
};

Page4.propTypes = {
  pageNumber: PropTypes.number.isRequired,
};

const Page5 = ({ pageNumber }) => {
  return (
    <>
      <Title>{`Koniec (${pageNumber + 1}/6)`}</Title>
      <Paragraph margin="0.5rem 0 0 0">
        To już wszystko. To okno juz sie wiecej nie wyświetli po jego zamknięciu chyba że zalogujesz
        się do aplikacji z innego urządzenia albo wyczyścisz w przeglądarce cookies.
      </Paragraph>
    </>
  );
};

Page5.propTypes = {
  pageNumber: PropTypes.number.isRequired,
};

const DispositionFormTutorial = ({ handleClose }) => {
  const [page, setPage] = useState(0);
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (page === 4) {
      const msgButton = document.querySelector('.msgButton');
      window.scrollTo(0, msgButton.getBoundingClientRect().top);
    } else if (window.scrollY > 0) {
      window.scrollTo(0, 0);
    }
  }, [page]);

  return (
    <Wrapper widthSize={width} heightSize={height}>
      <Content>
        {page === 0 ? <Page0 pageNumber={page} /> : null}
        {page === 1 ? <Page1 pageNumber={page} /> : null}
        {page === 2 ? <Page2 pageNumber={page} /> : null}
        {page === 3 ? <Page3 pageNumber={page} /> : null}
        {page === 4 ? <Page4 pageNumber={page} /> : null}
        {page === 5 ? <Page5 pageNumber={page} /> : null}
        <Navigation>
          <Button disabled={page === 0} onClick={() => setPage(page - 1)} isCancel type="button">
            cofnij
          </Button>
          <Button disabled={page === 5} type="button" onClick={() => setPage(page + 1)}>
            dalej
          </Button>
        </Navigation>
        <Button margin="3rem 0" type="button" onClick={handleClose}>
          Wszystko wiem. Zamknij tutorial
        </Button>
      </Content>
    </Wrapper>
  );
};

export default DispositionFormTutorial;

DispositionFormTutorial.propTypes = {
  handleClose: PropTypes.func.isRequired,
};
