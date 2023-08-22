import Image from "../components/Image.jsx";
import Matrix from "../components/MatrixLayout.jsx";

function LayoutGrid() {
    const parentDivStyle = {
      width: '100vw',
      minHeight: '100vh',
      backgroundColor: '#EDEDED',
      position: 'relative',
      display: 'flex', 
      justifyContent: 'center',
      flexDirection: 'column',
      padding:'20px',
    };
  
    const childDivStyle = {
      width: '90%',
      backgroundColor: 'white',
      margin: '0 auto',
      position: 'relative',
      display:'flex',
      justifyContent: 'center',
      maxHeight: 'calc(100vh - 100px)',
    };

    const headingDivStyle = {
      margin: '0 auto',
      padding: '6% 4% 8% 0',
    };


    const itemsDivStyle = {
      itemsAlign: 'center',
      margin:"5% 2% 0% 2%", 
      flexDirection:'row', 
      display: 'flex',
    };  

    const headingsStyle ={
      fontFamily: 'sans-serif',
      whiteSpace: 'nowrap',
      fontSize: '40px',
      margin:'0 auto',
    };
    

     const gridStyle ={
        padding: '5% 0 5% 0',
        width: '90%',
        backgroundColor: 'white',
        margin: '0 auto',
        position: 'relative',
        display:'flex',
        minHeight: 'auto',
        justifyContent: 'center',
        overflow: 'auto',
    };
    

  return (
    <>
    <div style={parentDivStyle}>
      <div style={childDivStyle}>
        <div style={itemsDivStyle}>
        <div style={headingDivStyle}>
          <h1 style={headingsStyle}>
            Our Leaders
          </h1>
        </div>
          <Image flag={1} size={"300px"} title="DR TAMANTHA STUTCHBURY" designation="Director, iAccelerate" />
          <Image flag={2} size={"300px"} title="DR PAUL DI PIETRO" designation="Dean of Research Knowledge Exchange and Transition" />
        </div>
      </div>
      <div style={gridStyle}>
        <Matrix numRows='3' numCols='3' />
      </div>
     </div>
    </>
  );
}

export default LayoutGrid;
