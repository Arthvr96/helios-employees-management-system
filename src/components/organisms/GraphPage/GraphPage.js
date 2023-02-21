import React, { useState } from 'react';
import GraphCreator from 'components/organisms/GraphCreator/GraphCreator';
import { CardTemplate } from 'components/templates/CardTemplate/CardTemplate';
import { CardTitle } from 'components/atoms/CardTitle/CardTitle';
import { SubmitButton } from 'components/atoms/SubmitButton/SubmitButton';
import InputSelect from 'components/atoms/InputSelect/InputSelect';
import ArrowButton from 'components/molecules/ArrowButton/ArrowButton';
import LabelError from 'components/molecules/LabelError/LabelError';
import { useFetchDataForGraphPage } from 'hooks/useFetchDataForGraphPage';
import PopupConfirm from 'components/molecules/PopupConfirm/PopupConfirm';
import PropTypes from 'prop-types';
import { Wrapper } from './GraphPage.style';

const TITLE = 'Grafik dla tego okresu już istnieje!';
const SUBTITLE = 'Czy chcesz stworzyc grafik i nadpisac ten istniejacy ?';

const workdays = {
  day1: true,
  day2: true,
  day3: true,
  day4: true,
  day5: true,
  day6: true,
  day7: true,
};

const GraphPage = ({ setHidden, isHidden }) => {
  const { graphs, dispositions, schema, optionsSchema, optionsDispositions, optionsGraphs } =
    useFetchDataForGraphPage();
  const [page, setPage] = useState('0');
  const [isVisible, setVisibility] = useState(false);
  const [selectedSchema, setSelectedSchema] = useState('default');
  const [selectedGraph, setSelectedGraph] = useState('default');
  const [selectedDispo, setSelectedDispo] = useState('default');
  const [selectedGraphData, setSelectedGraphData] = useState({});
  const [editMode, setEditMode] = useState(false);

  const initCreateGraph = () => {
    if (isVisible) {
      setVisibility(false);
    }
    setPage('3');
    setHidden(true);
  };

  const handleCreateGraph = () => {
    console.log('Create graph init');
    console.log(graphs);
    const graphsKeys = Object.keys(graphs);
    if (graphsKeys.indexOf(selectedDispo) === -1) {
      initCreateGraph();
    } else {
      setVisibility(true);
    }
  };

  const handleEditGraph = () => {
    const { date } = graphs[selectedGraph];
    const dispoCopy = JSON.parse(graphs[selectedGraph].dispo);
    const graphCopy = JSON.parse(graphs[selectedGraph].graph);
    const schemaCopy = JSON.parse(graphs[selectedGraph].schema);
    const usersCopy = JSON.parse(graphs[selectedGraph].users);
    const workdaysCopy = graphs[selectedGraph].workdays
      ? JSON.parse(graphs[selectedGraph].workdays)
      : workdays;
    setSelectedGraphData({ date, dispoCopy, graphCopy, schemaCopy, usersCopy, workdaysCopy });
    setEditMode(true);
    initCreateGraph();
  };

  const handleBack = () => {
    setPage('0');
    setVisibility(false);
    setSelectedSchema('default');
    setSelectedGraph('default');
    setSelectedDispo('default');
    setSelectedGraphData({});
    setEditMode(false);
  };

  return (
    <>
      <PopupConfirm
        isVisible={isVisible}
        title={TITLE}
        subtitle={SUBTITLE}
        handleConfirm={initCreateGraph}
        handleCancel={handleBack}
      />
      {page === '0' && (
        <CardTemplate>
          <CardTitle>Grafik</CardTitle>
          <SubmitButton onClick={() => setPage('1')} type="submit" margin="2rem 0 1rem 0">
            Stwórz nowy grafik
          </SubmitButton>
          <SubmitButton onClick={() => setPage('2')} margin="0" type="submit">
            Edytuj grafik
          </SubmitButton>
        </CardTemplate>
      )}
      {(page === '1' || page === '2') && (
        <CardTemplate position="relative" padding="2rem 8rem">
          <ArrowButton onClick={handleBack} label="cofnij" />
          <CardTitle margin="0 0 2rem 0">
            {page === '1' ? 'Stwórz nowy grafik' : 'Edytuj grafik'}
          </CardTitle>
          {page === '1' && (
            <Wrapper>
              <label htmlFor="dispositions">
                <LabelError labelName="Wybierz dyspozycje dla grafiku" />
                <InputSelect
                  margin="0.5rem 0 0 0"
                  width="100%"
                  name="disposition"
                  value={selectedDispo}
                  options={optionsDispositions}
                  handleChange={setSelectedDispo}
                  defaultOption={
                    optionsDispositions.length ? 'wybiesz dyspozycje' : 'brak dyspozycji'
                  }
                />
              </label>
              <label htmlFor="shape">
                <LabelError labelName="Wybierz schemat dla grafiku" />
                <InputSelect
                  margin="0.5rem 0 0 0"
                  width="100%"
                  name="shape"
                  value={selectedSchema}
                  options2={optionsSchema}
                  handleChange={setSelectedSchema}
                  defaultOption={optionsSchema.length ? 'wybiesz schemat' : 'brak schematow'}
                />
              </label>
              <SubmitButton
                disabled={selectedSchema === 'default' || selectedDispo === 'default'}
                onClick={handleCreateGraph}
                margin="0"
                type="button"
              >
                Stwórz grafik
              </SubmitButton>
            </Wrapper>
          )}
          {page === '2' && (
            <>
              <label htmlFor="graphs">
                <LabelError labelName="Wybierz grafik do edycji" />
                <InputSelect
                  margin="0.5rem 0 0 0"
                  width="100%"
                  name="graphs"
                  value={selectedGraph}
                  options={optionsGraphs}
                  handleChange={setSelectedGraph}
                  defaultOption={
                    optionsGraphs.length ? 'wybiesz grafik' : 'brak stworzonych grafikow'
                  }
                />
              </label>
              <SubmitButton
                disabled={selectedGraph === 'default'}
                onClick={handleEditGraph}
                margin="1.5rem 0 0 0"
                type="button"
              >
                Edytuj grafik
              </SubmitButton>
            </>
          )}
        </CardTemplate>
      )}
      {page === '3' && !editMode && (
        <GraphCreator
          closeCreator={handleBack}
          isHidden={isHidden}
          setHidden={setHidden}
          mode="create"
          date={selectedDispo}
          schema={schema[selectedSchema].schema}
          dispo={
            dispositions[selectedDispo].newType
              ? dispositions[selectedDispo].data
              : dispositions[selectedDispo]
          }
          workdays={
            dispositions[selectedDispo].newType ? dispositions[selectedDispo].workDays : workdays
          }
        />
      )}
      {page === '3' && editMode && (
        <GraphCreator
          closeCreator={handleBack}
          isHidden={isHidden}
          setHidden={setHidden}
          mode="edit"
          date={selectedGraphData.date}
          schema={selectedGraphData.schemaCopy}
          dispo={selectedGraphData.dispoCopy}
          workdays={selectedGraphData.workdaysCopy}
          graphGeneratorData={{
            usersGenerated: selectedGraphData.usersCopy,
            graphGenerated: selectedGraphData.graphCopy,
          }}
        />
      )}
    </>
  );
};

export default GraphPage;

GraphPage.propTypes = {
  isHidden: PropTypes.bool.isRequired,
  setHidden: PropTypes.func.isRequired,
};
