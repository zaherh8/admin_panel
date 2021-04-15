import * as React from "react";
// import { useCallback } from 'react';
import {
    Create,
    Datagrid,
    Edit,
    EditButton,
    EmailField,
    email,
    Filter,
    List,
    minValue,
    maxValue,
    NumberInput,
    required,
    SelectInput,
    SimpleForm,
    TextField,
    TextInput
} from 'react-admin';
// TODO: LOADING SCREEN SHOULD BE ADDED 
const axios = require('axios');

const { REACT_APP_SERVER_URL } = process.env;

// TODO: Move this to a module containing helper functions
const checkEmailIsUnique = (email) => {
    return axios.get(REACT_APP_SERVER_URL + `/employees/check_email?email=${email}`)
        .then(res => {
            return res.data.email_unique
        })
        .catch(err => {
            return false
        });
};
// TODO same as above
const validateUserUnique = async (values) => {
    const errors = {};
    const isEmailUnique = await checkEmailIsUnique(values.email);
    if (!isEmailUnique) {
        // Return a message directly
        errors.email = 'Email already used';
    }
    return errors
};

const EmployeeFilter = (props) => (
    <Filter id="search_input" {...props}>
        <TextInput label="Search" source="search" alwaysOn />
    </Filter>
);

export const UserList = props => (
    <List filters={<EmployeeFilter />} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <EmailField source="email" />
            <TextField source="title" label="Title" />
            <TextField source="age" />
            <TextField source="department" label="Department" />
            {/* <TextField source="username" /> */}
            {/* <TextField source="address.street" /> */}
            <TextField source="city" label="City" />
            <EditButton ></EditButton>
        </Datagrid>
    </List>
);

export const EmployeeEdit = props => (
    <Edit title={<title />} {...props} >
        <SimpleForm validate={validateUserUnique}>
            <TextInput disabled source="id" />
            <TextInput source="name" validate={[required()]} />
            <TextInput source="email" type="email" resettable validate={[required(), email()]} />
            <TextInput source="title" label="Title" />
            <NumberInput step={1} source="age" label="Age" min={18} max={64} validate={[required(), minValue(18, 'You should be at least 18'), maxValue(64, 'You cannot be older than 64')]} />
            < SelectInput label="Departments" validate={[required()]} source="department" choices={
                [
                    { id: 'management', name: 'Management Department' },
                    { id: 'technical', name: 'Technical Department' }
                ]} />
            <TextInput source="city" label="City" />
        </SimpleForm>
    </Edit>
);

export const EmployeeCreate = props => {
    return (<Create {...props} >
        <SimpleForm validate={validateUserUnique}>
            <TextInput source="name" validate={[required()]} />
            <TextInput source="email" validate={[required(), email()]} type="email" resettable />
            <TextInput source="title" label="Title" validate={[required()]} />
            <NumberInput step={1} source="age" label="Age" min={18} max={64} validate={[required(), minValue(18, 'You should be at least 18'), maxValue(64, 'You cannot be older than 64')]} />
            < SelectInput label="Departments" validate={[required()]} source="department" choices={
                [
                    { id: 'management', name: 'Management Department' },
                    { id: 'technical', name: 'Technical Department' }
                ]} />
            <TextInput source="city" label="City" />

        </SimpleForm>
    </Create >);
};
