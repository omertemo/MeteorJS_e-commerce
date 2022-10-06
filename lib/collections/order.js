import SimpleSchema from "simpl-schema";

Orders = new Mongo.Collection("orders");

LineItemsSchema = new SimpleSchema({
  //Cart içinde de tanımladım. Bir daha tanımlamama gerek var mı?
  productId: SimpleSchema.RegEx.Id,
  quantity: Number,
});

OrderSchema = new SimpleSchema({
  userId: SimpleSchema.RegEx.Id,
  totalPrice: Number,
  quantity: Number,
  lineItems: Array,
  "lineItems.$": LineItemsSchema,
  status: {
    type: String,
    allowedValues: [
      "pending",
      "preparing",
      "completed",
      "transported",
      "cancelled",
    ],
  },
});

Orders.attachSchema(OrderSchema);

// Client tarafından gelen status verisine göre bir method yeterli olabilir.
