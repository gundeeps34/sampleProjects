import React from 'react';
import Image from './Image';

function Matrix({ numRows, numCols }) {

    const gridStyle ={
        display: 'flex',
        flexDirection: 'column',
        margin: '0 2% 0 0',
    };

  const createRow = (countRow) => {
    let row = [];
    for (let countCol = 0; countCol < numCols; countCol++) {
      row.push(
        <Image key={`cell-${countRow}-${countCol}`} flag={1} size={"250px"} title="DR TAMANTHA STUTCHBURY" designation={`cell-${countRow}-${countCol}`} />
      );
    }
    return row;
  };

  let matrix = [];
  for (let countRow = 0; countRow < numRows; countRow++) {
    matrix.push(
      <div style={gridStyle} key={`row-${countRow}`}>
        {createRow(countRow)}
      </div>
    );
  }

  return (
    <>
      {matrix}
    </>
  );
}

export default Matrix;
