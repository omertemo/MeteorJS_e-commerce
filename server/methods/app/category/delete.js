import SimpleSchema from "simpl-schema";

new ValidatedMethod({
  name: "app.category.delete",
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
  }).validator(),
  run: async function (data) {
    this.unblock();
    
    const { _id } = data;
    const currentCategory = Categories.findOne({ _id: _id });
    const currentsParent = currentCategory.parentCategoryId;

    if (currentCategory.parentCategoryId == null) {
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

    Categories.update(
      { ancestorIds: currentCategory._id },
      { $pull: { ancestorIds: currentCategory._id } },
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

    // currentCategory'i sil
    Categories.remove({ _id: currentCategory._id });
  },
});
