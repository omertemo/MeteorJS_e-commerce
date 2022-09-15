import SimpleSchema from "simpl-schema";

Carts = new Mongo.Collection("carts");

LineItemsSchema = new SimpleSchema({
  productId: SimpleSchema.RegEx.Id,
  quantity: Number,
});

CartSchema = new SimpleSchema({
  userId: SimpleSchema.RegEx.Id,
  totalPrice: Number,
  quantity: Number,
  lineItems: Array,
  "lineItems.$": LineItemsSchema,
});

Carts.attachSchema(CartSchema);
