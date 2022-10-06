import SimpleSchema from "simpl-schema";

new ValidatedMethod({
  name: "app.category.delete",
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
  }).validator(),
  run: async function (data) {
    this.unblock();

    // parentId'si _id'ye eşit olan tüm docların parentId'sini silinen category'nin parentId'si olarak setle
    // Tüm ancestorIds kısımlarından bu _id'yi pull et
    // Product'ların categories'kısımında varsa yine  pull et
    const { _id } = data;
    let currentCategory = Categories.findOne({ _id: _id });
    const currentsParent = currentCategory.parentCategoryId;

    if (currentCategory.name == "All") {
      throw new Meteor.Error("Root category cannot be deleted");
    }

    Categories.update(
      { parentCategoryId: currentCategory._id },
      {
        $set: {
          parentCategoryId: currentsParent,
        },
      },
      { multi: true }
    );

    // Categori'leri arasında currentCategory._id var olan productlardan bu currentCategory._id'yi pull et

    // Products.update(
    //   { categories: currentCategory._id },
    //   {
    //     $pull: {
    //       categories: currentCategory._id,
    //     },
    //   }
    // );

    // ancestorIds'leri arasında currentCategory._id var olan category'lerden bu currentCategory._id'yi pull et
    Categories.update(
      { ancestorIds: currentCategory._id },
      { $pull: { ancestorIds: currentCategory._id } },
      { multi: true }
    );

    // currentCategory'i sil
    Categories.remove({ _id: currentCategory._id });
  },
});
