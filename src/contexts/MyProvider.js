import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputName, setInputName] = useState('');

  useEffect(() => {
    const fetchAPI = async () => {
      setLoading(true);
      const response = await fetch('https://swapi.dev/api/planets');
      const dataApi = await response.json();
      const newData = dataApi.results;
      setData(newData);
    };
    fetchAPI();
    setLoading(false);
  }, []);
  const ContextValues = { data,
    loading,
    inputName,
    setInputName };
  return (
    <MyContext.Provider value={ ContextValues }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
