import React, { useState } from 'react';
import ViewTemplate from 'components/templates/ViewTemplate/ViewTemplate';
import { CardTemplate } from 'components/templates/CardTemplate/CardTemplate';
import { CardTitle } from 'components/atoms/CardTitle/CardTitle';
import { Wrapper } from 'components/organisms/DispositionsArchive/DispositionsArchive.style';
import { CardSubtitle } from 'components/atoms/CardSubtitle/CardSubtitle';
import InputSelect from 'components/atoms/InputSelect/InputSelect';
import { Button } from 'components/atoms/Button/Button';
import { SubmitButton } from 'components/atoms/SubmitButton/SubmitButton';
import PopupConfirm from 'components/molecules/PopupConfirm/PopupConfirm';
import { useFetchDataForGraphPage } from 'hooks/useFetchDataForGraphPage';
import GraphCreator from 'components/organisms/GraphCreator/GraphCreator';
import PropTypes from 'prop-types';
import heliosAppSdk from 'HeliosAppSdk/HeliosAppSdk';

const workdays = {
  day1: true,
  day2: true,
  day3: true,
  day4: true,
  day5: true,
  day6: true,
  day7: true,
};

const GraphsArchive = ({ isHidden, setHidden }) => {
  const { deleteGraph } = heliosAppSdk.firestore;
  const { graphs, optionsGraphs } = useFetchDataForGraphPage();
  const [isVisible, setVisibility] = useState(false);
  const [selectedGraph, setSelectedGraph] = useState('default');
  const [selectedGraphData, setSelectedGraphData] = useState({});

  const handleLoadGraph = () => {
    setHidden(true);
    const { date } = graphs[selectedGraph];
    const dispoCopy = JSON.parse(graphs[selectedGraph].dispo);
    const graphCopy = JSON.parse(graphs[selectedGraph].graph);
    const schemaCopy = JSON.parse(graphs[selectedGraph].schema);
    const usersCopy = JSON.parse(graphs[selectedGraph].users);
    const workdaysCopy = graphs[selectedGraph].workdays
      ? JSON.parse(graphs[selectedGraph].workdays)
      : workdays;
    setSelectedGraphData({ date, dispoCopy, graphCopy, schemaCopy, usersCopy, workdaysCopy });
  };

  const handleConfirm = () => {
    deleteGraph(selectedGraph).then(() => {
      setVisibility(false);
      closeGraph();
    });
  };

  const closeGraph = () => {
    setSelectedGraph('default');
    setSelectedGraphData({});
    setHidden(false);
  };

  return (
    <>
      <PopupConfirm
        isVisible={isVisible}
        handleConfirm={handleConfirm}
        handleCancel={() => setVisibility(false)}
        title="Czy napewno chcesz usunąć wybrany grafik ?"
        subtitle="Czynności nie da sie odwrócić"
      />

      <ViewTemplate>
        {!selectedGraphData.date && (
          <CardTemplate minWidth="390px">
            <CardTitle>Archiwum grafików</CardTitle>
            <Wrapper>
              <CardSubtitle fontWeight="regular" margin="0 1rem 0 0">
                Wybierz grafik
              </CardSubtitle>
              <InputSelect
                margin="1rem 0 0 0"
                value={selectedGraph}
                handleChange={setSelectedGraph}
                options={optionsGraphs}
              />
            </Wrapper>
            <Button
              width="100%"
              type="button"
              onClick={handleLoadGraph}
              margin="1rem 0 0 0"
              disabled={selectedGraph === 'default'}
            >
              Wyświetl grafik
            </Button>
            <SubmitButton
              disabled={selectedGraph === 'default'}
              onClick={() => {
                setVisibility(true);
              }}
              margin="1rem 0 0 0"
              type="button"
              isDangerous
            >
              Usuń grafik
            </SubmitButton>
          </CardTemplate>
        )}

        {selectedGraph !== 'default' && selectedGraphData.date && (
          <GraphCreator
            closeCreator={closeGraph}
            isHidden={isHidden}
            setHidden={() => setHidden(!isHidden)}
            mode="edit"
            isPreview
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
      </ViewTemplate>
    </>
  );
};

export default GraphsArchive;

GraphsArchive.propTypes = {
  isHidden: PropTypes.bool,
  setHidden: PropTypes.func,
};
