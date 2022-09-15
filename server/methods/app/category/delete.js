import { each } from "jquery";
import SimpleSchema from "simpl-schema";

new ValidatedMethod({
  name: "app.category.delete",
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
  }).validator(),
  run: async function (data) {
    this.unblock();
    if (Meteor.userId() == null) {
      console.log(Meteor.userId());
      throw new Meteor.Error("Kullanıcı girişi yapınız.");
    }

    const { _id } = data;
    let obj = Categories.findOne({ _id: _id });
    let obj2 = Object;
    if (obj.ancestorIds.length == 2) {
      Categories.remove({ _id: obj._id });
    } else if (obj.ancestorIds.length == 1) {
      Categories.remove({ _id: obj._id });
      Categories.remove({ parentCategoryId: obj._id });
    } else if (obj.ancestorIds.length == 0) {
      obj2 = Categories.find({ parentCategoryId: obj._id });
      obj2.forEach(function (data1) {
        Categories.remove({ parentCategoryId: data1._id });
        Categories.remove({ _id: data1._id });
      });
      Categories.remove({ _id: obj._id });
    }
  },
});

//Burada sadece else if (obj.ancestorIds.length == 0) bu kısmı kullansak ne olur
