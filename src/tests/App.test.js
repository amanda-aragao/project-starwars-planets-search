import React from 'react';
import { render, screen, waitFor, getByText, findByRole, act  } from '@testing-library/react';
import Provider from '../contexts/MyProvider';
import mockData from '../helpers/mockData'
import App from '../App';
import Table from '../components/Table';
import userEvent from '@testing-library/user-event';

describe('Teste a aplicação', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => Promise.resolve(mockData)
    });
    render(
      <Provider>
        <App />
      </Provider>
    )
  });

test('Teste os elementos na tela e seus filtros', async () => {
  const loadingMessage = screen.getByText(/carregando.../i);
  expect(loadingMessage).toBeInTheDocument();

  await waitFor(() => {
    expect(loadingMessage).not.toBeInTheDocument();
  })
  const nameInput = screen.getByTestId('name-filter');
  expect(screen.getByTestId('name-filter')).toBeInTheDocument();

  const column = await screen.getByTestId('column-filter');
  expect(column).toBeInTheDocument();  
  const size = await screen.getByTestId('comparison-filter')
  expect(size).toBeInTheDocument();
  
  const value = await screen.getByTestId('value-filter')
  expect(value).toBeInTheDocument();
  
 const buttonOrder = await screen.getByTestId('column-sort-button');
  expect(buttonOrder).toBeInTheDocument();

  const buttonApplyFilter = await  screen.getByTestId('button-filter');
  expect(buttonApplyFilter).toBeInTheDocument();

  const buttonRemoveAllFilters = await screen.getByTestId('button-remove-filters');
  expect(buttonRemoveAllFilters).toBeInTheDocument();

  const buttonRemFilter = await screen.getByRole('button', {
    name: /excluir/i});
  expect(buttonRemFilter).toBeInTheDocument();
  
  const table = await screen.getByRole('columnheader', {name: /name/i})
  expect(table).toBeInTheDocument();

});

test('Teste se o ao digitar no input name o nome do planeta é filtrado', async () => {
  render(
    <Provider>
      <Table />
    </Provider>
  )
  const nameInput = screen.getByTestId('name-filter');
  expect(screen.getByTestId('name-filter')).toBeInTheDocument();
  expect(await screen.findAllByRole('cell')).toHaveLength(130);

  userEvent.type(nameInput, 'Tat');
  expect(nameInput).toHaveValue('Tat');
})

test('Teste os filtros de ordenagem Ascendente e Descendente ',() => {
  render(
    <Provider>
      <Table />
    </Provider>
  )
const columOrdene = screen.getByTestId('column-sort');
expect(columOrdene).toBeInTheDocument();
const buttonOrdene = screen.getByRole('button', {name: /ordernar/i});
expect(buttonOrdene).toBeInTheDocument();

const optionAsc = screen.getByTestId('column-sort-input-asc');
expect(optionAsc).toBeInTheDocument();

userEvent.selectOptions(columOrdene, 'orbital_period')
userEvent.click(optionAsc);
userEvent.click(buttonOrdene);

const optionDesc = screen.getByTestId('column-sort-input-desc');
expect(optionDesc).toBeInTheDocument();

userEvent.selectOptions(columOrdene, 'population')
userEvent.click(optionDesc);
userEvent.click(buttonOrdene);

});

test('Teste se os filtros estão sendo aplicados e removidos corretamente', async () => {
  render(
    <Provider>
      <Table />
    </Provider>
  )
  const nameInput = screen.getByTestId('name-filter');
  expect(screen.getByTestId('name-filter')).toBeInTheDocument();

  const column = await screen.getByTestId('column-filter');
  expect(column).toBeInTheDocument();  
  const size = await screen.getByTestId('comparison-filter')
  expect(size).toBeInTheDocument();
  
  const value = await screen.getByTestId('value-filter')
  expect(value).toBeInTheDocument();
  
 const buttonOrder = await screen.getByTestId('column-sort-button');
  expect(buttonOrder).toBeInTheDocument();

  const buttonApplyFilter = await  screen.getByTestId('button-filter');
  expect(buttonApplyFilter).toBeInTheDocument();

  const buttonRemoveAllFilters = await screen.getByTestId('button-remove-filters');
  expect(buttonRemoveAllFilters).toBeInTheDocument();

  const buttonRemFilter = await screen.getByRole('button', {
    name: /excluir/i});
  
  const table = await screen.getByRole('columnheader', {name: /name/i})
  expect(table).toBeInTheDocument();

  userEvent.selectOptions(column, 'population');
  expect(column).toHaveValue('population');
  userEvent.selectOptions(size, 'maior que');
  expect(size).toHaveValue('maior que');
  userEvent.clear(value);
  userEvent.type(value, '1000000');
  expect(value).toHaveValue(1000000);
  userEvent.click(buttonApplyFilter);
  expect(column).not.toHaveValue('population')

  const planetName1 = screen.getAllByTestId('planet-name');
  expect(planetName1.length).toEqual(7);
  const filterApplicaded = screen.getAllByTestId('filter');
  expect(filterApplicaded.length).toEqual(1)


  userEvent.selectOptions(column, 'rotation_period');
  expect(column).toHaveValue('rotation_period');
  userEvent.selectOptions(size, 'igual a');
  expect(size).toHaveValue('igual a');
  userEvent.clear(value);
  userEvent.type(value, '18');
  expect(value).toHaveValue(18);
  userEvent.click(buttonApplyFilter);
  expect(column).not.toHaveValue('rotation_period');

  userEvent.selectOptions(column, 'orbital_period');
  expect(column).toHaveValue('orbital_period');
  userEvent.selectOptions(size, 'menor que');
  expect(size).toHaveValue('menor que');
  userEvent.clear(value);
  userEvent.type(value, '400');
  expect(value).toHaveValue(400);
  userEvent.click(buttonApplyFilter);
  expect(column).not.toHaveValue('orbital_period');

  // const planetName3 = screen.getAllByTestId('planet-name');
  // expect(planetName3.length).toEqual(7);
  // const filterApplicaded = screen.getAllByTestId('filter');
  // expect(filterApplicaded.length).toEqual(1)
 
  const filter1= screen.getByText(/population maior que 1000000/i)
  const filter2 = screen.getByText(/orbital_period menor que 400/i);
  const filter3 = screen.getByText(/rotation_period igual a 18/i);

  expect(filter1).toBeInTheDocument();
  expect(filter2).toBeInTheDocument();
  expect(filter3).toBeInTheDocument();
  
      userEvent.click(buttonRemoveAllFilters);
    expect(filter1).not.toBeInTheDocument();

  // expect(filter2).not.toBeInTheDocument()
});

test('',() => {

})

});


