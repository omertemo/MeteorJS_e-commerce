import bootstrap from "bootstrap";

Template.publicModalsAddCategory.onCreated(function () {
  this.state = new ReactiveDict(null, {
    categories: [],
  });
});

Template.publicModalsAddCategory.onRendered(function () {
  const self = this;

  const modalElement = document.getElementById(
    "brdPublicModalsAddCategoryModal"
  );
  this.modal = new bootstrap.Modal(modalElement);

  modalElement.addEventListener("hidden.bs.modal", function (event) {
    self.$("form#brdPublicModalsAddCategoryForm").trigger("reset");
  });

  this.autorun(function () {
    AppUtil.refreshTokens.get("categories");

    Meteor.call("app.categories.list", {}, function (error, result) {
      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      if (result) {
        self.state.set("categories", result.categories);
      }
    });
  });
});

Template.publicModalsAddCategory.events({
  "submit form#brdPublicModalsAddCategoryForm": function (event, template) {
    event.preventDefault();

    const name = event.target.name.value;
    const parentCategoryId = event.target.parentCategoryId.value;

    const rootCategory = Categories.find({ name: "All" });

    const obj = {
      category: {
        name: name,
        parentCategoryId: parentCategoryId,
      },
    };
    console.log(obj);

    Meteor.call("app.category.create", obj, function (error, result) {
      if (error) {
        console.log("error", error);
      }

      console.log(result); //hata gelmeyecekse istediğimiz sonucu bu şekilde görebiliriz
      AppUtil.refreshTokens.set("categories", Random.id()); //içerisnde birden fazla reaktif değişken buluna bir obje
      event.target.reset(); // işlem bittikten sonra formu temizler
      template.modal.hide(); //
    });
  },
});
