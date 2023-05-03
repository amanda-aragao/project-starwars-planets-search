// import React, { useContext, useState, useEffect, useCallback } from 'react';
// import MyContext from '../contexts/MyContext';

// const Filters = (() => {
//   const { ascOption,
//     setAscOption, columFilter, data, setData } = useContext(MyContext);

//   const chooseOrdination = useCallback(() => {
//     if (ascOption.includes('ASC')) {
//       const notExist = data.filter((e) => e[columFilter] === null);
//       const exist = data.filter((e) => e[columFilter] !== null);
//       const arrayAsyc = exist
//         .sort((a, b) => Number(a[columFilter] - Number(b[columFilter])));
//         setData([...arrayAsyc]);

//     }
//   });
// });
// export default Filters;
