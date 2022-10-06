Migrations.add({
  version: 2,
  name: "Root category is creating.",
  up: function () {
    Categories.insert({
      name: "All",
      parentCategoryId: null,
      ancestorIds: [],
    });
  },
});
