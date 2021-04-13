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
// This module contains helper functions to be used across the project
const axios = require('axios');

const { REACT_APP_SERVER_URL } = process.env;
const checkEmailIsUnique = (email) => {
    return axios.get(REACT_APP_SERVER_URL + `/employees/check_email?email=${email}`)
        .then(res => {
            return res.data.email_unique
        })
        .catch(err => {
            return false
        });
};
const EmployeeFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="search" alwaysOn />
    </Filter>
);

export const UserList = props => (
    <List filters={<EmployeeFilter />} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="age" />
            <TextField source="title" label="Title" />
            <TextField source="department" label="Department" />
            {/* <TextField source="username" /> */}
            <EmailField source="email" />
            {/* <TextField source="address.street" /> */}
            <TextField source="city" label="City" />
            <EditButton ></EditButton>
        </Datagrid>
    </List>
);
export const EmployeeEdit = props => (
    <Edit title={<title />} {...props} >
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="name" />
            <NumberInput step={1} source="age" label="Age" min={18} max={64} validate={[required(), minValue(18, 'You should be at least 18'), maxValue(64, 'You cannot be older than 64')]} />
            < SelectInput label="Departments" validate={[required()]} source="department" choices={
                [
                    { id: 'management', name: 'Management Department' },
                    { id: 'technical', name: 'Technical Department' }
                ]} />
            <TextInput source="title" label="Title" />
            <TextInput source="city" label="City" />
            <TextInput source="email" type="email" resettable validate={[required(), email()]} />
        </SimpleForm>
    </Edit>
);
const validateUserCreation = async (values) => {
    const errors = {};
    const isEmailUnique = await checkEmailIsUnique(values.email);
    if (!isEmailUnique) {
        // Return a message directly
        errors.email = 'Email already used';
    }
    return errors
};
export const EmployeeCreate = props => {
    return (<Create {...props} >
        <SimpleForm validate={validateUserCreation}>
            <TextInput source="name" validate={[required()]} />
            <TextInput source="title" label="Title" validate={[required()]} />
            <NumberInput step={1} source="age" label="Age" min={18} max={64} validate={[required(), minValue(18, 'You should be at least 18'), maxValue(64, 'You cannot be older than 64')]} />
            < SelectInput label="Departments" validate={[required()]} source="department" choices={
                [
                    { id: 'management', name: 'Management Department' },
                    { id: 'technical', name: 'Technical Department' }
                ]} />
            <TextInput source="city" label="City" />
            <TextInput source="email" type="email" resettable />

        </SimpleForm>
    </Create >);
};
