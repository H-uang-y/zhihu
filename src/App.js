import React from 'react';
import './App.css';

import Router from './router/public'
import Route from './router/route'
function App() {
  return (
    <div className="App">
      <Router routes={Route}/>
    </div>
  );
}

export default App;
