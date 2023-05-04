import React, { useContext } from 'react';
import MyContext from '../contexts/MyContext';

function Filters() {
  const { chooseOrdination, sortOption } = useContext(MyContext);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    console.log(name, value);
  };

  return (
    <div name="sortOptionsOrder" value={ sortOption } onChange={ handleChange }>
      <label>
        Ascendente
        <input
          defaultChecked
          type="radio"
          value="ASC"
          name="sortOptionsOrder"
          data-testid="column-sort-input-asc"
        />
      </label>

      <label>
        Descendente
        <input
          type="radio"
          value="DESC"
          name="sortOptionsOrder"
          data-testid="column-sort-input-desc"
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
