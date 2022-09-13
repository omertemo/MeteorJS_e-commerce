import SimpleSchema from "simpl-schema";

Products = new Mongo.Collection("products");

OptionSchema = new SimpleSchema({
  name: String,
});

CateogryArraySchema = new SimpleSchema({
  categoryId: SimpleSchema.RegEx.Id,
});

likedBySchema = new SimpleSchema({
  ownerId: SimpleSchema.RegEx.Id, //userId sıkıntı değilse kullanırırz
});

ProductSchema = new SimpleSchema({
  title: String,
  price: Number,
  distancePrice: {
    type: Number,
    optional: true,
  },
  description: String,
  quantity: Number,
  options: Array,
  categories: Array,
  likedBy: Array,
  "options.$": OptionSchema,
  "categories.$": CateogryArraySchema,
  "likedBy.$": likedBySchema,
});

Products.attachSchema(ProductSchema);
