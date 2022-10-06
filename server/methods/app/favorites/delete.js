import SimpleSchema from "simpl-schema";

new ValidatedMethod({
  name: "app.favorites.delete",
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
  }).validator(),
  run: function (data) {
    this.unblock();

    Favorites.remove({ _id: data._id }); // ?????????????
  },
});
