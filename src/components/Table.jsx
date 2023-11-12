import React, { useContext, useState, useEffect, useCallback } from 'react';
import MyContext from '../contexts/MyContext';
import Filters from './Filters';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  FormContainer,
  StyledForm,
  StyledButton,
  StyledInput,
  StyledSelect,
} from '../style/FormStyle';

import {
  StyledTable,
  StyledTh,
  StyledTd } from '../style/TableStyle';

function Table() {
  const { data, inputName, sizeFilter,
    columFilter, number, setColumFilter, optionsSelect,
    setOptionSelect, handleChange } = useContext(MyContext);

  const [initialStateApi, setInitialApi] = useState([]);
  const [filtersApplied, setFiltersApplied] = useState([]);

  useEffect(() => {
    setInitialApi([...data]);
  }, [data, setInitialApi]);

  useEffect(() => {
    setColumFilter(optionsSelect[0]);
  }, [optionsSelect, setColumFilter]);

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
          .filter((item) => Number(item[filter.columFilter]) > Number(filter.number));
      }

      if (filter.sizeFilter === 'menor que') {
        newApi = newApi
          .filter((item) => Number(item[filter.columFilter]) < Number(filter.number));
      }

      if (filter.sizeFilter === 'igual a') {
        newApi = newApi
          .filter((item) => Number(item[filter.columFilter]) === Number(filter.number));
      }
    });

    setInitialApi([...newApi]);
  }, [optionsSelect, filtersApplied, data, setInitialApi, setFiltersApplied]);

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
    <FormContainer>
      <StyledForm>
        <label htmlFor="inputName" className="title">
          Planeta
          <StyledInput
            type="text"
            name="inputName"
            value={ inputName }
            data-testid="name-filter"
            onChange={ handleChange }
            className="form-control"
          />
        </label>
        {' '}
        <label className="title">
          Coluna
          <StyledSelect
            data-testid="column-filter"
            name="columFilter"
            onChange={ handleChange }
            value={ columFilter }
            className="form-control"
          >
            {optionsSelect.map((e) => (
              <option key={ e } value={ e }>
                {e}
              </option>
            ))}
          </StyledSelect>
        </label>
        {' '}
        <label htmlFor="sizeFilter" className="title">
          Operador
          <StyledSelect
            name="sizeFilter"
            data-testid="comparison-filter"
            onChange={ handleChange }
            value={ sizeFilter }
            className="form-control"
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </StyledSelect>
        </label>
        <label htmlFor="number" className="title">
          Valor
          <StyledInput
            type="number"
            name="number"
            value={ number }
            data-testid="value-filter"
            onChange={ handleChange }
            className="form-control"
          />
        </label>
        <Filters />

        <div
          style={ { display: 'flex',
            justifyContent: 'center',
            marginTop: '10px',
            gap: '15px' } }
        >
          <StyledButton
            type="button"
            data-testid="button-filter"
            onClick={ toggleFilter }
            className="btn btn-primary"
          >
            Aplicar filtro
          </StyledButton>

          <StyledButton
            type="button"
            data-testid="button-remove-filters"
            onClick={ deleteOption }
            className="btn btn-danger"
          >
            Excluir filtros
          </StyledButton>
        </div>
        {filtersApplied.length > 0
          && filtersApplied.map((e) => (
            <div data-testid="filter" key={ e.columFilter }>
              <p>{`${e.columFilter} ${e.sizeFilter} ${e.number}`}</p>
              <StyledButton
                type="button"
                onClick={ () => {
                  deleteOptionSelection(e.columFilter);
                } }
                className="btn btn-secondary"
              >
                Excluir
              </StyledButton>
            </div>

          ))}
      </StyledForm>
      <StyledTable className="table">
        <thead className="thead-dark">
          <tr>
            <StyledTh>Name</StyledTh>
            <StyledTh>Rotacion Period</StyledTh>
            <StyledTh>Orbital Period</StyledTh>
            <StyledTh>Diameter</StyledTh>
            <StyledTh>Climate</StyledTh>
            <StyledTh>Gravity</StyledTh>
            <StyledTh>Terrain</StyledTh>
            <StyledTh>Surface Water</StyledTh>
            <StyledTh>Population</StyledTh>
            <StyledTh>Films</StyledTh>
            <StyledTh>Created</StyledTh>
            <StyledTh>Edited</StyledTh>
            <StyledTh>Url</StyledTh>
          </tr>
        </thead>
        <tbody>
          {initialStateApi.map((e) => (
            <tr key={ e.name }>
              <StyledTd data-testid="planet-name">{e.name}</StyledTd>
              <StyledTd>{e.rotation_period}</StyledTd>
              <StyledTd>{e.orbital_period}</StyledTd>
              <StyledTd>{e.diameter}</StyledTd>
              <StyledTd>{e.climate}</StyledTd>
              <StyledTd>{e.gravity}</StyledTd>
              <StyledTd>{e.terrain}</StyledTd>
              <StyledTd>{e.surface_water}</StyledTd>
              <StyledTd>{e.population}</StyledTd>
              <StyledTd>{e.films}</StyledTd>
              <StyledTd>{e.created}</StyledTd>
              <StyledTd>{e.edited}</StyledTd>
              <StyledTd>{e.url}</StyledTd>

            </tr>
          ))}
        </tbody>
      </StyledTable>
    </FormContainer>
  );
}
export default Table;
