import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'category.list.navbar',
  validate: new SimpleSchema({}).validator(),
  run: async function (data) {
    this.unblock();
    return Categories.find().fetch();
  }
});


