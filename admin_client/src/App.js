import * as React from "react";
// import jsonServerProvider from 'ra-data-json-server';
import { Admin, Resource } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
// this will import the users' component
import { UserList } from './employees';
// const dataProvider = [{ "name": "zaher" }]
// const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');
// -const App = () => <Admin dataProvider={dataProvider} />;
const App = () => (
  <Admin dataProvider={simpleRestProvider('http://localhost:4000')}>
    <Resource name="employees" list={UserList} />
  </Admin>
);
// const App = () => <Admin dataProvider={dataProvider} />;

// export default App;
export default App;
