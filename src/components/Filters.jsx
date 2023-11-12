import React, { useContext, useEffect } from 'react';
import MyContext from '../contexts/MyContext';
import { StyledButton, StyledSelect } from '../style/FormStyle';

function Filters() {
  const {
    chooseOrdination,
    // sortOption,
    handleChange,
    setSortOption,
    optionsSelect,
    setColumFilter,
    orderFilter,
  } = useContext(MyContext);

  useEffect(() => {
    setColumFilter(optionsSelect[0]);
  }, [optionsSelect, setColumFilter]);

  return (
    <div style={ { marginTop: '10px', display: 'flex', alignItems: 'center' } }>
      <label style={ { marginRight: '10px' } } className="title">
        Ordene:
        <StyledSelect
          data-testid="column-sort"
          name="orderFilter"
          onChange={ handleChange }
          value={ orderFilter }
        >
          {optionsSelect.map((value) => (
            <option key={ value } value={ value }>
              {value}
            </option>
          ))}
        </StyledSelect>
      </label>

      <div style={ { display: 'flex', alignItems: 'center' } }>
        <label style={ { marginRight: '10px' } } className="title">
          Ascendente
          {' '}
          <input
            type="radio"
            value="ASC"
            name="sortOptionsOrder"
            data-testid="column-sort-input-asc"
            onChange={ ({ target }) => setSortOption(target.value) }
          />
        </label>

        <label style={ { marginRight: '10px' } } className="title">
          Descendente
          {' '}
          <input
            type="radio"
            value="DESC"
            name="sortOptionsOrder"
            data-testid="column-sort-input-desc"
            onChange={ ({ target }) => setSortOption(target.value) }
          />
        </label>

        <StyledButton
          type="button"
          onClick={ chooseOrdination }
          data-testid="column-sort-button"
          className="btn btn-primary"
        >
          Ordenar
        </StyledButton>
      </div>
    </div>
  );
}

export default Filters;
