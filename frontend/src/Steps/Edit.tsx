import React, { useState } from 'react';
import { MdAddCircle, MdCheck, MdKeyboardArrowLeft, MdRemoveCircle } from 'react-icons/md';
import { Alert, Button, Col, Row } from "reactstrap";
import ChordRow, { ChordRowObject } from '../ChordRow';
import { MonochromaticPossibleRootScale } from '../ScaleColorer';
import ContinueButton from './ContinueButton';

const Edit: React.FC<{
  chordRowObjects: ChordRowObject[],
  handleRowChange: (rowIndex: number, newValue: string, key: keyof ChordRowObject) => void,
  addRows: (numNewRows: number) => void,
  monochromaticSchemes: { [key in MonochromaticPossibleRootScale]: string }[],
  navigateToNextStep: () => void,
  fillWithKey: (keyNote: string, keyScale: string) => void,
  navigateToPreviousStep: () => void,
}> = ({
  chordRowObjects,
  handleRowChange,
  addRows,
  monochromaticSchemes,
  navigateToNextStep,
  fillWithKey,
  navigateToPreviousStep,
}) => {
  const [alertVisible, setAlertVisible] = useState(false);

  const onDismiss = () => setAlertVisible(false);

  return (
    <div>
      <Alert isOpen={alertVisible} toggle={onDismiss}>
        Key filled!
      </Alert>
      {chordRowObjects.map((chordRowObject, rowIndex) => <ChordRow
        chordRowObject={chordRowObject}
        onRowChange={(newValue: string, key: keyof ChordRowObject) => handleRowChange(rowIndex, newValue, key)}
        monochromaticSchemes={monochromaticSchemes}
        fillWithKey={(keyNote: string, keyScale: string) => { fillWithKey(keyNote, keyScale); setAlertVisible(true); setTimeout(onDismiss, 3000); } }
      />)}
      <Row className='py-2 flex-row justify-content-center align-items-center'>
        <MdAddCircle color="#EF532B" size="3em" onClick={() => addRows(1)} />
        { chordRowObjects.length > 1 && <MdRemoveCircle color="#EF532B" size="3em" onClick={() => addRows(-1)} />}
      </Row>
      <Row className="App-footer flex-row justify-content-center">
        <MdKeyboardArrowLeft className="mx-2" onClick={() => navigateToPreviousStep()} />
        <span className="mx-auto">
          <div className="py-2">
            Edit the keys
          </div>
        </span>
        <MdCheck className="mx-2" onClick={() => navigateToNextStep()} />
      </Row>
    </div>
  );
}

export default Edit;
