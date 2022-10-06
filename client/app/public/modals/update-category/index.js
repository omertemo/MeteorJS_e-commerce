import bootstrap from "bootstrap";

Template.publicModalsUpdateCategory.onCreated(function () {
  this.state = new ReactiveDict(null, {
    categories: [],
  });
});

Template.publicModalsUpdateCategory.onRendered(function () {
  const self = this;

  const modalElement = document.getElementById(
    "brdPublicModalsUpdateCategoryModal"
  );
  this.modal = new bootstrap.Modal(modalElement);

  modalElement.addEventListener("hidden.bs.modal", function (event) {
    AppUtil.temp.set("category", null);
    self.$("form#brdPublicModalsUpdateCategoryForm").trigger("reset");
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

Template.publicModalsUpdateCategory.events({
  "submit form#brdPublicModalsUpdateCategoryForm": function (event, template) {
    event.preventDefault(); //

    const category = AppUtil.temp.get("category");
    const currentId = category.category._id;
    //category Formuna event ataması yapıyoruz(submit)

    const name = event.target.name.value;
    const parentCategoryId = event.target.parentCategoryId.value; //Collection ile eşlemek için değişkenler oluşturuyoruz
    console.log(event.target);

    const obj = {
      _id: currentId,
      category: {
        //category objesinin oluşturup içeriğini dolduruyoruz
        name: name,
        parentCategoryId: parentCategoryId,
      },
    };

    console.log("obj");
    console.log(obj);
    console.log("obj-end");

    Meteor.call("app.category.update", obj, function (error, result) {
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
