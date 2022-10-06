import SimpleSchema from "simpl-schema";

new ValidatedMethod({
  name: "carts.update",
  validate: new SimpleSchema({
    productId: SimpleSchema.RegEx.Id,
    type: {
      type: String,
      allowedValues: ["add", "remove", "delete"],
    },
  }).validator(),
  run: function (data) {
    this.unblock();

    const product = Products.findOne({ _id: data.productId });
    const productPrice = product.price;

    let cond = data.type == "remove" ? -1 : 1;
    //ürün seppete var mı (find ile ara)
    //undefned ise quantitiy'leri 1 arttır price'ı arttır. lineItems'a push et
    //var ise sayısını kontrol et. Varsa işlemi uygula. azalma durumunda quantity 2'den fazla ise
    //( lineItem'ı verip quantity'i hesaplayacak bir util yazılabilir. )

    Carts.upsert(
      { userId: Meteor.userId(), "lineItems.productId": data.productId },
      {
        $inc: {
          quantity: cond * 1,
          "lineItems.$.quantity": cond * 1,
          totalPrice: cond * productPrice,
        },
      }
    );
    // Carts.update(
    //   { userId: Meteor.userId(), "lineItems.productId": data.productId },
    //   {
    //     $pull: { lineItems: { quantity: { $lt: 1 } } },
    //   }
    // );
  },
});
