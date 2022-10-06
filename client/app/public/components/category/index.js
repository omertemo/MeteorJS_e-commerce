import Swal from "sweetalert2";

Template.publicComponentsCategory.onCreated(function () {
  this.state = new ReactiveDict(null, {
    categories: null,
  });
});

Template.publicComponentsCategory.events({
  "click .brd-delete": function (event, template) {
    const currentCategory = this.category; //self misali, this'i category'a setliyoruz
    console.log(currentCategory);

    Swal.fire({
      //Swal kütüphanesini kullanarak güzel bir ekranın gelmesini sağlıyoruz
      title: "Silmek istiyor musunuz?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--bs-danger)",
      cancelButtonColor: "var(--bs-dark)",
      cancelButtonText: "Hayır",
      confirmButtonText: "Evet",
    }).then((result) => {
      if (result.value) {
        Meteor.call(
          "app.category.delete",
          { _id: currentCategory._id },
          function (error, result) {
            console.log(currentCategory._id);
            if (error) {
              console.log("error", error);
              return;
            }

            AppUtil.refreshTokens.set("categories", Random.id());
          }
        );
      }
    });
  },
  "click .brd-update": function (event, template) {
    const category = this; //self misali, this'i student'a setliyoruz

    AppUtil.temp.set("category", this);

    console.log("this--------------");
    console.log(this);
  },
});
