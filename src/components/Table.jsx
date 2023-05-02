import React, { useContext } from 'react';
import MyContext from '../contexts/MyContext';

function Table() {
  const { data, inputName, setInputName } = useContext(MyContext);
  const handleChange = ({ target }) => {
    const { name, value } = target;
    switch (name) {
    case 'inputName':
      return setInputName(value);
    default:
    }
  };

  return (
    <div>
      <label htmlFor="inputName">
        Name
        <input
          type="text"
          name="inputName"
          value={ inputName }
          data-testid="name-filter"
          onChange={ handleChange }
        />
      </label>
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
            data
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
