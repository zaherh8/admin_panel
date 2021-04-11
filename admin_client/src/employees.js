import * as React from "react";
import { List, Datagrid, TextField, EmailField } from 'react-admin';

export const UserList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="metadata.title" label="Title" />
            <TextField source="metadata.department" label="Department" />
            {/* <TextField source="username" /> */}
            <EmailField source="email" />
            {/* <TextField source="address.street" /> */}
            <TextField source="address.city" label="City" />
        </Datagrid>
    </List>
);