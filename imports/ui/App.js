import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Admin, Resource, EditGuesser } from 'react-admin';
import { withTracker } from 'meteor/react-meteor-data';

import dataProvider from './dataProvider';
import authProvider from './authProvider';
import { Posts } from '../api/posts';
import { Users } from '../api/users';
import { UserList } from './users';
import { PostList, PostEdit } from './posts';

const App = () => {
    return (
        <Admin
            dataProvider={dataProvider}
        >
            <Resource
                name="users"
                list={UserList}
            />
            <Resource
                name="posts"
                list={PostList}
                edit={PostEdit}
            />
        </Admin>
    );
}

export default withTracker(() => {
    // Meteor.subscribe("tasks");
    // return {
    //     tasks: Meteor.call('tasks.getAll', (error, result) => {
    //         return result;
    //     }),
    //     incompleteCount: Meteor.call('tasks.getIncompleteCount', (error, result) => {
    //         return result;
    //     })
    // };
    return {
        posts: Posts.find({}, { sort: { createdAt: -1 } }).fetch(),
        users: Users.find({}, { sort: { createdAt: -1 } }).fetch()
    };
})(App);
