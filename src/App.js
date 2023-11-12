import React, { useContext } from 'react';
import './App.css';
import Table from './components/Table';
import MyContext from './contexts/MyContext';

function App() {
  const { loading } = useContext(MyContext);
  return (
    <div>
      { loading ? <p className="loading"> Carregando...</p> : (
        <Table />
      ) }

    </div>
  );
}

export default App;
