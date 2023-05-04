import React, { useContext, useEffect } from 'react';
import MyContext from '../contexts/MyContext';

function Filters() {
  const { chooseOrdination, sortOption, handleChange,
    setSortOption, columFilter, optionsSelect, setColumFilter } = useContext(MyContext);

  useEffect(() => {
    setColumFilter(optionsSelect[0]);
  }, [optionsSelect, setColumFilter]);

  return (
    <>
      <label>
        Ordene:
        <select
          data-testid="column-sort"
          name="columSort"
          onChange={ handleChange }
          value={ columFilter }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>
      <div name="sortOptionsOrder" value={ sortOption } onChange={ handleChange }>
        <label>
          Ascendente
          <input
            type="radio"
            value="ASC"
            name="sortOptionsOrder"
            data-testid="column-sort-input-asc"
            onChange={ ({ target }) => setSortOption(target.value) }
          />
        </label>

        <label>
          Descendente
          <input
            type="radio"
            value="DESC"
            name="sortOptionsOrder"
            data-testid="column-sort-input-desc"
            onChange={ ({ target }) => setSortOption(target.value) }
          />
        </label>
        <button
          type="button"
          onClick={ chooseOrdination }
          data-testid="column-sort-button"
        >
          Ordernar
        </button>
      </div>
    </>
  );
}
export default Filters;
