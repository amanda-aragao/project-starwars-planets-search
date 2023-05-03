import React, { useContext, useState, useEffect } from 'react';
import MyContext from '../contexts/MyContext';

function Table() {
  const { data, inputName, setInputName, sizeFilter,
    columFilter, number, setNumber, setSizeFilter,
    setColumFilter, optionsSelect, setOptionSelect } = useContext(MyContext);

  const [initialStateApi, setInitialApi] = useState([]);
  const [filtersApplied, setFiltersApplied] = useState([]);

  useEffect(() => {
    setInitialApi([...data]);
  }, [data]);

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
  // const deleteAllFilters = () => {
  //   setOptionSelect(['population', 'orbital_period',
  //     'diameter', 'rotation_period', 'surface_water']);
  //   setInitialApi(initialStateApi);
  //   setFiltersApplied([]);
  // };
  // const deleteOptionFilters = ((colum) => { // função para retornar as opções no select.
  //   const newApi = [...data];
  //   const removeOptionFilters = filtersApplied.map((map) => map)
  //     .filter((filter) => filter.columFilter !== colum); // dentro do meu array de filtros eu quero filtrar o que está diferente colum.
  //   setFiltersApplied([...removeOptionFilters]);
  //   optionsSelect.push(colum);

  //   removeOptionFilters.forEach((filter) => {
  //     if (filter.columFilter === 'maior que') {
  //       newAPi = newApi
  //         .filter((item) => Number(item[filter.columFilter]) > Number(filter.number));
  //     }
  //     if (filter.columFilter === 'menor que') {
  //       newAPi = newApi
  //         .filter((item) => Number(item[filter.columFilter]) < Number(filter.number));
  //     }
  //     if (filter.columFilter === 'igual a') {
  //       newAPi = newApi
  //         .filter((item) => Number(item[filter.columFilter]) === Number(filter.number));
  //     }
  //   });
  // });

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
              optionsSelect.map((option) => (
                <option key={ option } value={ option }>{option}</option>
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
            <option value="igual a"> igual a</option>
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
          data-testid="button-filter"
          onClick={ toggleFilter }

        >
          Aplicar filtro
        </button>
        <button
          type="button"
          data-testid="button-remove-filters"
          // onClick={ deleteAllFilters }
        >
          Excluir filtros
        </button>
        {
          filtersApplied.length > 0 && filtersApplied.map((e) => (
            <p data-testid="filter" key={ e.columnFilter }>
              {`${e.columnFilter} ${e.sizeFilter} ${e.number}`}
              <button
                type="button"
                // onClick={ () => { deleteOptionFilters(filtersApplied.columFilter); } }
              >
                Excluir.
              </button>
            </p>
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
