Template.publicPagesHome.onCreated(function () {
  this.state = new ReactiveDict(null, {
    categories: [],
    products: [],
  });
});

Template.publicPagesHome.onRendered(function () {
  const self = this;
  this.autorun(function () {
    AppUtil.refreshTokens.get("categories");

    Meteor.call("app.categories.list", {}, function (error, result) {
      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      if (result) {
        const createCategoryObject = (c, categories) => {
          const childrens = [];
          categories.forEach((category) => {
            if (category.parentCategoryId === c._id) {
              const children = createCategoryObject(category, categories);
              childrens.push(children);
            }
          });
          c.childrens = childrens;
          return c;
        };

        const mainCategory = result.categories.find(
          (element) => element.parentCategoryId == null
        );

        const formattedCategory = createCategoryObject(
          mainCategory,
          result.categories
        );

        console.log(formattedCategory.childrens);

        self.state.set("categories", formattedCategory);
      }
    });
  });

  this.autorun(function () {
    AppUtil.refreshTokens.get("refreshShopProduct");
    Meteor.call("app.product.list", {}, function (error, result) {
      if (error) {
        console.log("error", error);
        return;
      }
      self.state.set("products", result.products);
    });
  });
});
