import logo from './logo.svg';
import './App.css';
import { useRef } from 'react';
import { Animation } from 'Animation';

function App() {
  const canvas = useRef(null);

  return (
    <div className="App">
     <Animation />
    </div>
  );
}

export default App;
