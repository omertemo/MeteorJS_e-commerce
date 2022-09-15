import SimpleSchema from "simpl-schema";

new ValidatedMethod({
  name: "app.favorites.removeFromFavorites",
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
  }).validator(),
  run: function (data) {
    this.unblock();
    if (Meteor.userId() == null) {
      console.log(Meteor.userId());
      throw new Meteor.Error("Kullanıcı girişi yapınız.");
    }

    Favorites.remove({ _id: data._id }); // ?????????????
  },
});
