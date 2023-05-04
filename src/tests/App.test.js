import React from 'react';
import { render, screen, waitFor, getByText, findByRole, act  } from '@testing-library/react';
import Provider from '../contexts/MyProvider';
import mockData from '../helpers/mockData'
import App from '../App';
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
  const loadingMesage = screen.getByText(/carregando.../i);
  expect(loadingMesage).toBeInTheDocument();

  await waitFor(() => {
    expect(loadingMesage).not.toBeInTheDocument();
  })
  const nameInput = screen.getByTestId('name-filter');
  expect(screen.getByTestId('name-filter')).toBeInTheDocument();

  const column = await screen.getByTestId('column-filter')
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


  userEvent.selectOptions(column, 'orbital_period');
  expect(column).toHaveValue('orbital_period');
  userEvent.selectOptions(size, 'menor que');
  expect(size).toHaveValue('menor que');
  userEvent.clear(value);
  userEvent.type(value, '400');
  expect(value).toHaveValue(400);
  userEvent.click(buttonApplyFilter);
  expect(column).not.toHaveValue('orbital_period');


  const filter1= screen.getByText(/population maior que 1000000/i)
  const filter2 = screen.getByText(/orbital_period menor que 400/i);
  expect(filter1).toBeInTheDocument();
  expect(filter2).toBeInTheDocument();

    userEvent.click(buttonRemFilter);

  expect(filter1).not.toBeInTheDocument();
  // expect(filter2).not.toBeInTheDocument();

  
});

});


