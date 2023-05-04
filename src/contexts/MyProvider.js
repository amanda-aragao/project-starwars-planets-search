import { useState, useEffect, useMemo, useCallback } from 'react';
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
  const [sortOption, setSortOption] = useState('ASC');
  const [orderFilter, setOrderFilter] = useState('population');
  const [filtersApplied, setFiltersApplied] = useState([]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    switch (name) {
    case 'inputName':
      return setInputName(value);
    case 'columFilter':
      return setColumFilter(value);
    case 'sizeFilter':
      return setSizeFilter(value);
    case 'number':
      return setNumber(value);
    case 'orderFilter':
      return setOrderFilter(value);
    default:
    }
  };

  const chooseOrdination = useCallback(() => {
    if (sortOption.includes('ASC')) {
      const notExist = data.filter((e) => e[orderFilter] === 'unknown');
      const exist = data.filter((e) => e[orderFilter] !== 'unknown');
      const arrayAsyc = exist
        .sort((a, b) => Number(a[orderFilter] - Number(b[orderFilter])));
      setData([...arrayAsyc, ...notExist]);
      setFilters([...filtersApplied, { orderFilter, sortOption }]);
    } else if (sortOption.includes('DESC')) {
      const notExist = data.filter((e) => e[orderFilter] === 'unknown');
      const exist = data.filter((e) => e[orderFilter] !== 'unknown');
      const arrayAsync = exist.sort((a, b) => Number(b[orderFilter] - a[orderFilter]));
      setData([...arrayAsync, ...notExist]);
      setFilters([...filtersApplied, { orderFilter, sortOption }]);
    }
  }, [data, orderFilter, sortOption, filtersApplied]);

  useEffect(() => {
    const fetchAPI = async () => {
      setLoading(true);
      const response = await fetch('https://swapi.dev/api/planets');
      const dataApi = await response.json();
      const newData = dataApi.results;
      setData(newData);
      setLoading(false);
    };
    fetchAPI();
  }, []);

  const ContextValues = useMemo(() => (
    { data,
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
      sortOption,
      setSortOption,
      chooseOrdination,
      setFiltersApplied,
      handleChange,
      orderFilter,
      setOrderFilter,
    }
  ), [data,
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
    sortOption,
    setSortOption,
    chooseOrdination,
    orderFilter,
    setOrderFilter,
  ]);
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
