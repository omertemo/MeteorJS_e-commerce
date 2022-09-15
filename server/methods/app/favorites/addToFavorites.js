import SimpleSchema from "simpl-schema";

new ValidatedMethod({
  name: "app.favorites.addToFavorites",
  validate: new SimpleSchema({
    productId: SimpleSchema.RegEx.Id,
  }).validator(),
  run: function (data) {
    this.unblock();
    if (Meteor.userId() == null) {
      console.log(Meteor.userId());
      throw new Meteor.Error("Kullanıcı girişi yapınız.");
    }

    Favorites.insert({
      userId: Meteor.userId(),
      productId: data.productId,
    });
  },
});
