import SimpleSchema from "simpl-schema";
Categories = new Mongo.Collection("categories");

CategorySchema = new SimpleSchema({
  name: String,
  parentCategoryId: {
    type: SimpleSchema.RegEx.Id,
    optional: true,
  },
  ancestorIds: Array,
  "ancestorIds.$": SimpleSchema.RegEx.Id,
});

Categories.attachSchema(CategorySchema);
