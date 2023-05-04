import React, { useContext } from 'react';
import MyContext from '../contexts/MyContext';

function Filters() {
  const { chooseOrdination, sortOption, handleChange,
    setSortOption } = useContext(MyContext);

  return (
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
  );
}
export default Filters;
