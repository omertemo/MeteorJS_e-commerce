import SimpleSchema from "simpl-schema";
Categories = new Mongo.Collection("categories");

AncestorSchema = new SimpleSchema({
  categoryId: SimpleSchema.RegEx.Id,
});

CategorySchema = new SimpleSchema({
  name: String,
  parentCategory: {
    type: SimpleSchema.RegEx.Id,
    defaultValue: null,
  },
  ancestors: Array,
  "ancestors.$": AncestorSchema,
});

Categories.attachSchema(CategorySchema);
