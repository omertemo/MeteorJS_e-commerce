import SimpleSchema from "simpl-schema";

Products = new Mongo.Collection("products");

// ProductImageURlSchema = new SimpleSchema({
//   url: String,
// });

OptionSchema = new SimpleSchema({
  key: {
    type: String,
    allowedValues: [
      "expiration-date",
      "quantity",
      "image-url",
      "color",
      "gender",
    ],
  }, //
  value: SimpleSchema.oneOf(
    String,
    Number,
    Date,
    Boolean,
    SimpleSchema.RegEx.Url
    // Array
  ), //
  // "value.$": SimpleSchema.oneOf(String, ProductImageURlSchema),
});

ProductSchema = new SimpleSchema({
  title: String,
  price: Number,
  discountPrice: {
    type: Number,
    optional: true,
  },
  description: {
    type: String,
    optional: true,
  },
  options: {
    type: Array,
    optional: true,
  },
  "options.$": OptionSchema,
  categories: Array,
  "categories.$": SimpleSchema.RegEx.Id,
});

Products.attachSchema(ProductSchema);

// backend'e yazarken allowedValues'ların birer kere tanımlanabilecek şekilde yaz
