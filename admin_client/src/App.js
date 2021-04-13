import * as React from "react";
import { Admin, Resource } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
// this will import the employees' component
import { UserList, EmployeeEdit, EmployeeCreate } from './employees';
const { REACT_APP_SERVER_URL } = process.env;
const App = () => (
  <Admin dataProvider={simpleRestProvider(REACT_APP_SERVER_URL)}>
    <Resource name="employees" list={UserList} edit={EmployeeEdit} create={EmployeeCreate} />
  </Admin>
);
export default App;
