import SimpleSchema from "simpl-schema";
Favorites = new Mongo.Collection("favorites");

FavoriteSchema = new SimpleSchema({
  userId: SimpleSchema.RegEx.Id,
  productId: SimpleSchema.RegEx.Id,
});

Favorites.attachSchema(FavoriteSchema);
