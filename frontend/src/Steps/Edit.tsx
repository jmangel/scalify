import React from 'react';
import { MdAddCircle, MdRemoveCircle } from 'react-icons/md';
import { Button, Col, Row } from "reactstrap";
import ChordRow, { ChordRowObject } from '../ChordRow';
import { MonochromaticPossibleRootScale } from '../ScaleColorer';

const Edit: React.FC<{
  chordRowObjects: ChordRowObject[],
  handleRowChange: (rowIndex: number, newValue: string, key: keyof ChordRowObject) => void,
  addRows: (numNewRows: number) => void,
  monochromaticSchemes: { [key in MonochromaticPossibleRootScale]: string }[],
  navigateToNextStep: () => void,
}> = ({
  chordRowObjects,
  handleRowChange,
  addRows,
  monochromaticSchemes,
  navigateToNextStep,
}) => {
  return (
    <div>
      {chordRowObjects.map((chordRowObject, rowIndex) => <ChordRow
        chordRowObject={chordRowObject}
        onRowChange={(newValue: string, key: keyof ChordRowObject) => handleRowChange(rowIndex, newValue, key)}
        monochromaticSchemes={monochromaticSchemes}
      />)}
      <Row className='pt-2 flex-row justify-content-center align-items-center'>
        <MdAddCircle color="#EF532B" size="3em" onClick={() => addRows(1)} />
        { chordRowObjects.length > 1 && <MdRemoveCircle color="#EF532B" size="3em" onClick={() => addRows(-1)} />}
      </Row>
      <Row>
        <Col>
          <Button
            onClick={() => navigateToNextStep()}
          >
            Continue
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default Edit;
