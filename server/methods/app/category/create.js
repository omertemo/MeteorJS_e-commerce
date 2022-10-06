import SimpleSchema from "simpl-schema";

new ValidatedMethod({
  name: "app.category.create",

  // mixins: [SignedInMixin, RoleMixin],
  // roles: ["roles.admin"],
  validate: new SimpleSchema({
    category: CategorySchema.omit("ancestorIds"),
  }).validator(),
  run: function (data) {
    this.unblock();

    const { category } = data;
    console.log(data);
    let parentAncestorIds;
    if (category.parentCategoryId == null) {
      category.ancestorIds = [];
      console.log("deneme");
    } else {
      console.log("denemealttaki");

      const parentCategory = Categories.findOne({
        _id: category.parentCategoryId,
      });
      parentAncestorIds = parentCategory.ancestorIds;

      parentAncestorIds.push(category.parentCategoryId);
      console.log(parentAncestorIds);
    }

    Categories.insert({
      name: category.name,
      parentCategoryId: category.parentCategoryId,
      ancestorIds: parentAncestorIds,
    });
  },
});
