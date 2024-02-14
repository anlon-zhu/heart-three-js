// App.js
import React, {useState} from 'react';
import HeartScene from './HeartScene'; // Adjust the path based on your file structure
import ValentineMessage from './ValentineMessage';
import YesButton from './YesButton';

function App() {
  const [explode, setExplode] = useState(false);


  return (
  <div style={{position: 'relative', display: 'inline-block', height: '100vh', width: '100vw'}}>
      <ValentineMessage explode={explode}/>
      <HeartScene explode={explode}/>
      {!explode && <YesButton onClick={() => setExplode(true)} />}
    </div>
  );
}

export default App;
