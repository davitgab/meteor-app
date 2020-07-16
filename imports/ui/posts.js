import * as React from "react";
import { List, Edit, Datagrid, SimpleForm, TextField, ReferenceField, ReferenceInput, EditButton, TextInput, SelectInput } from 'react-admin';

export const PostList = props => {
    return (
        <List {...props}>
            <Datagrid rowClick="edit">
                <TextField source="userId" />
                <TextField source="_id" />
                <TextField source="title" />
                <TextField source="body" />
                <EditButton />
            </Datagrid>
        </List>
    );
};

export const PostEdit = props => {
    return (
        <Edit {...props}>
            <SimpleForm>
                <TextInput disabled source="id" />
                <ReferenceInput source="userId" reference="users">
                    <SelectInput optionText="name" />
                </ReferenceInput>
                <TextInput source="title" />
                <TextInput source="body" />
            </SimpleForm>
        </Edit>
    );
}