import SimpleSchema from "simpl-schema";

new ValidatedMethod({
  name: "app.product.show",
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
  }).validator(),
  run: async function (data) {
    this.unblock();
    const { _id } = data;

    return Products.findOne({
      _id: _id,
    });
  },
});
