import { Meteor } from 'meteor/meteor';
import '../imports/api/users';
import '../imports/api/posts';
import { Posts } from '../imports/api/posts';

let a = {
    title: 'grdon',
    body: 'grdoni body',
    userId: 'grdoni user id'
};

// EXAMPLE OF VALIDATION OF SCHEMA

try {
    Posts.schema.validate(a);
    Posts.insert(a);
} catch(e) {
    console.log('\n\n error during validation: ', e)
}

Meteor.startup(() => {
    // If the Links collection is empty, add some data.
});
