import SimpleSchema from "simpl-schema";

Carts = new Mongo.Collection("carts");

LineItemsSchema = new SimpleSchema({
  productId: SimpleSchema.RegEx.Id,
  quantity: Number,
});

CartSchema = new SimpleSchema({
  ownerId: SimpleSchema.RegEx.Id, //userId sıkınyı çıkarmazsa onu kullanalım
  totalPrice: Number,
  quantity: Number,
  lineItems: Array,
  "lineItems.$": LineItemsSchema,
});

Carts.attachSchema(CartSchema);
