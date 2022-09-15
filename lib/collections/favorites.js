import SimpleSchema from "simpl-schema";
Favorites = new Mongo.Collection("favorites");

FavoriteSchema = new SimpleSchema({
  userId: SimpleSchema.RegEx.Id,
  product: SimpleSchema.RegEx.Id,
});

Favorites.attachSchema(FavoriteSchema);
