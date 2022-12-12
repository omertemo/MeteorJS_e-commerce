Template.publicPagesProduct.onCreated(function () {
  this.state = new ReactiveDict(null, {
    categories: [],
    products: [],
  });
});

Template.publicPagesProduct.onRendered(function () {
  const self = this;

  this.autorun(function () {
    Meteor.call("app.categories.list", {}, function (error, result) {
      if (error) {
        console.log("error", error);
        return;
      }
      self.state.set("categories", result.categories);
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

Template.publicPagesProduct.helpers({
  counter: function () {
    Template.instance().i++;
    return Template.instance().i;
  },
});

Template.publicPagesProduct.events({
  "click .productDel": function (event, template) {
    event.preventDefault();
    const product = this;

    Meteor.call(
      "app.product.delete",
      {
        _id: product._id,
      },
      function (error, result) {
        if (error) {
          console.log("error", error);
          return;
        }
        AppUtil.refreshTokens.set("refreshShopProduct", Random.id());
      }
    );
  },
  "submit form#brdProductCreateForm": function (event, template) {
    event.preventDefault();
    const title = event.target.productNameInput.value;
    const categoryId = event.target.productCategorySelect.value;
    const imageUrl = event.target.productImageLink.value;
    const price = parseInt(event.target.productPriceInput.value);
    const obj = {
      product: {
        title: title,
        categoryId: categoryId,
        imageUrl: imageUrl,
        price: price,
      },
    };
    Meteor.call("app.product.create", obj, function (error, result) {
      if (error) {
        console.log("error", error);
        return;
      }
      AppUtil.refreshTokens.set("refreshShopProduct", Random.id());
      event.target.reset();
    });
  },
});
