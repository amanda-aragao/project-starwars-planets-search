import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputName, setInputName] = useState('');
  const [columFilter, setColumFilter] = useState('population');
  const [sizeFilter, setSizeFilter] = useState('maior que');
  const [number, setNumber] = useState(0);
  const [filters, setFilters] = useState([]);
  const [optionsSelect, setOptionSelect] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);

  useEffect(() => {
    setColumFilter(optionsSelect[0]);
  }, [optionsSelect]);

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
    setInputName,
    columFilter,
    setColumFilter,
    sizeFilter,
    setSizeFilter,
    number,
    setNumber,
    filters,
    setFilters,
    optionsSelect,
    setOptionSelect,
  };
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
