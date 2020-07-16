import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Posts = new Mongo.Collection('posts');

Posts.schema = new SimpleSchema({
    title: { type: String },
    body: { type: String },
    userId: { type: String }
});

// if (Meteor.isServer) {
//     Meteor.publish('posts', function tasksPublication() {
//         return Tasks.find();
//     });
// }

Meteor.methods({
    'posts.insert'(text) {
        Posts.insert({
            text,
            createdAt: new Date(),
        });
    },
    'posts.remove'(taskId) {
        Posts.remove(taskId);
    }
});

Posts.allow({
    insert: function (userId, doc) {
        return true;
    },
    update: function (userId, doc, fieldNames, modifier) {
        return true;
    },
    remove: function (userId, doc) {
        return true;
    }
});
