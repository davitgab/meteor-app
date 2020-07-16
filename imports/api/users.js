import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Users = new Mongo.Collection('users');

Meteor.methods({
    'users.getAll': () => {
        Users.find({}).fetch();
    },
    'users.insert'(text) {
        Users.insert({
            text,
            createdAt: new Date(),
        });
    },
    'users.remove'(taskId) {
        Users.remove(taskId);
    }
});
