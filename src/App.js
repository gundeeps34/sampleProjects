import React from 'react';
import './App.css';
import Tooltip from './ToolTip.jsx';

function App() {
  return (
    <div className="App">
      <div style={{display: 'flex',justifyContent: 'flex-start'}}>
      <Tooltip content="This is where the content goes.">
        <button>Hover me</button>
      </Tooltip>
      </div>
      <div style={{display: 'flex',justifyContent: 'center'}}>
      <Tooltip content="This is where the content goes.">
        <button>Hover me</button>        
      </Tooltip>
      </div>
      <div style={{display: 'flex',justifyContent: 'flex-end'}}>
      <Tooltip content="This is where the content goes.">
        <button>Hover me</button>        
      </Tooltip>
      </div>
      <div style={{display: 'flex',justifyContent: 'flex-start', alignItems:'flex-end', height: '100vh'}}>
      <Tooltip content="This is where the content goes.">
        <button>Hover me</button>
      </Tooltip>
      </div>
      <div style={{display: 'flex',justifyContent: 'flex-end'}}>
      <Tooltip content="This is where the content goes.">
        <button>Hover me</button>
      </Tooltip>
      </div>
      <div style={{display: 'flex',justifyContent: 'center'}}>
      <Tooltip content="This is where the content goes.">
        <button>Hover me</button>        
      </Tooltip>
      </div>
    </div>
  );
}

export default App;
