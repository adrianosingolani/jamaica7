import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import Layout from './layout/Layout';

function App() {
  return (
    <div className="App">
      <Layout>
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
      </Layout>
    </div>
  );
}

export default App;
