import React, { useContext, useState, useEffect, useCallback } from 'react';
import MyContext from '../contexts/MyContext';

function Table() {
  const { data, inputName, setInputName, sizeFilter,
    columFilter, number, setNumber, setSizeFilter,
    setColumFilter, optionsSelect, setOptionSelect } = useContext(MyContext);

  const [initialStateApi, setInitialApi] = useState([]);
  const [filtersApplied, setFiltersApplied] = useState([]);

  useEffect(() => {
    setInitialApi([...data]);
  }, [data, setInitialApi]);

  useEffect(() => {
    console.log(initialStateApi);
    setColumFilter(optionsSelect[0]);
  }, [optionsSelect, setColumFilter]);

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
    default:
    }
  };

  const deleteOption = () => {
    setOptionSelect(['population', 'orbital_period',
      'diameter', 'rotation_period', 'surface_water']);
    setInitialApi([...data]);
    setFiltersApplied([]);
  };

  const deleteOptionSelection = useCallback((column) => {
    const filterApi = [...filtersApplied
      .filter((filter) => filter.columFilter !== column)];
    setFiltersApplied([...filterApi]);
    optionsSelect.push(column);

    let newApi = [...data];

    filterApi.forEach((filter) => {
      if (filter.sizeFilter === 'maior que') {
        newApi = newApi
          .filter((item) => Number(item[filter.columFilter])
          > Number(filter.number));
      }

      if (filter.sizeFilter === 'menor que') {
        newApi = newApi
          .filter((item) => Number(item[filter.columFilter])
          < Number(filter.number));
      }

      if (filter.sizeFilter === 'igual a') {
        newApi = newApi
          .filter((item) => Number(item[filter.columFilter])
          === Number(filter.number));
      }
    });

    setInitialApi([...newApi]);
  }, [optionsSelect, filtersApplied, data, setInitialApi]);

  const toggleFilter = () => {
    setOptionSelect(optionsSelect.filter((option) => option !== columFilter));
    switch (sizeFilter) {
    case 'maior que':
      return (
        setInitialApi(initialStateApi
          .filter((e) => Number(e[columFilter]) > Number(number))),
        setFiltersApplied([...filtersApplied, { columFilter, sizeFilter, number }])
      );
    case 'menor que':
      return (
        setInitialApi(initialStateApi
          .filter((e) => Number(e[columFilter]) < Number(number))),
        setFiltersApplied([...filtersApplied, { columFilter, sizeFilter, number }])
      );
    case 'igual a':
      return (
        setInitialApi(initialStateApi
          .filter((e) => Number(e[columFilter]) === Number(number))),
        setFiltersApplied([...filtersApplied, { columFilter, sizeFilter, number }])
      );
    default:
    }
  };

  return (
    <div>
      <form>
        <label htmlFor="inputName">
          Nome Planeta
          <input
            type="text"
            name="inputName"
            value={ inputName }
            data-testid="name-filter"
            onChange={ handleChange }
          />
        </label>
        <label>
          Column:
          <select
            data-testid="column-filter"
            name="columFilter"
            onChange={ handleChange }
            value={ columFilter }
          >
            {
              optionsSelect.map((e) => (
                <option key={ e } value={ e }>{e}</option>
              ))
            }
          </select>
        </label>

        <label>
          Operador:
          <select
            name="sizeFilter"
            data-testid="comparison-filter"
            onChange={ handleChange }
            value={ sizeFilter }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label>
          Value:
          <input
            type="number"
            name="number"
            value={ number }
            data-testid="value-filter"
            onChange={ handleChange }
          />
        </label>

        <button
          type="button"
          data-testid="button-filter"
          onClick={ toggleFilter }
        >
          Aplicar filtro
        </button>
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ deleteOption }
        >
          Excluir filtros
        </button>
        {
          filtersApplied.length > 0 && filtersApplied.map((e) => (
            <div data-testid="filter" key={ e.columFilter }>

              <p>
                {`${e.columFilter} ${e.sizeFilter} ${e.number}`}
              </p>
              <button
                type="button"
                onClick={ () => { deleteOptionSelection(e.columFilter); } }
              >
                Excluir
              </button>
            </div>
          ))
        }
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotacion Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {
            initialStateApi
              .filter((item) => item.name.toLowerCase().includes(inputName))
              .map((e) => (
                <tr key={ e.name }>
                  <td>{ e.name }</td>
                  <td>{ e.rotation_period }</td>
                  <td>{ e.orbital_period }</td>
                  <td>{ e.diameter }</td>
                  <td>{ e.climate }</td>
                  <td>{ e.gravity }</td>
                  <td>{ e.terrain }</td>
                  <td>{ e.surface_water }</td>
                  <td>{ e.population }</td>
                  <td>{ e.films }</td>
                  <td>{ e.created }</td>
                  <td>{ e.edited }</td>
                  <td>{ e.url }</td>
                </tr>
              ))
          }

        </tbody>

      </table>
    </div>
  );
}
export default Table;
