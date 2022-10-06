import SimpleSchema from "simpl-schema";

new ValidatedMethod({
  name: "app.favorites.create",
  mixins: [SignedInMixin],
  validate: new SimpleSchema({
    favorite: FavoriteSchema,
  }).validator(),
  run: function (data) {
    this.unblock();

    Favorites.insert(favorite);

    // return News.findOne({ _id: _id });
  },
});
