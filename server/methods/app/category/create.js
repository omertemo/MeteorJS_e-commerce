import SimpleSchema from "simpl-schema";

new ValidatedMethod({
  name: "app.category.create",
  validate: new SimpleSchema({
    category: CategorySchema.omit("ancestorIds"),
  }).validator(),
  run: function (data) {
    this.unblock();
    if (Meteor.userId() == null) {
      console.log(Meteor.userId());
      throw new Meteor.Error("Kullanıcı girişi yapınız.");
    }

    const { category } = data;
    if (category.parentCategoryId == null) {
      category.ancestorIds = [];
    } else {
      const parentAncestorIds = Categories.findOne({
        _id: category.parentCategoryId,
      }).ancestorIds;

      category.ancestorIds = parentAncestorIds.push(category.parentCategoryId);
    }

    const id = Categories.insert(category);
    return Categories.findOne({ _id: id });
  },
});
