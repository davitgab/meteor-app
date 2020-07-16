import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Posts } from '../api/posts';

export default {
    getList: (resource, params) => {
        const collection = Meteor.connection._stores[resource]._getCollection();
        let result = collection.find().fetch();
        let total = collection.find().count();
        return Promise.resolve({
            data: result.map(record => {
                return { ...record, id: record._id };
            }),
            total
        });
    },
    getMany: (resource, params) => {
        const collection = Meteor.connection._stores[resource]._getCollection();
        let result = collection.find({ _id: { $in: params.ids } }).fetch();
        return Promise.resolve({
            data: result.map(record => {
                return { ...record, id: record.id };
            })
        });
    },
    getOne: (resource, params) => {
        const collection = Meteor.connection._stores[resource]._getCollection();
        let result = collection.findOne(params.id);
        return Promise.resolve({
            data: result
        });
    },
    update: (resource, params) => {
        const collection = Meteor.connection._stores[resource]._getCollection();
        let result = collection.update(
            { _id: params.id },
            { $set: {
                body: params.data.body,
                title: params.data.title
            }
        });
        console.log('collection: ', collection);
        console.log('params: ', params);
        console.log('result: ', result);
        return Promise.resolve({
            data: params.data
        });
    }
};
