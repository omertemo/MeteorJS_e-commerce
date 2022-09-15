import SimpleSchema from "simpl-schema";

new ValidatedMethod({
  name: "carts.removeProduct",
  validate: new SimpleSchema({
    productId: SimpleSchema.RegEx.Id,
  }).validator(),
  run: function (data) {
    this.unblock();

    const product = Products.findOne({ _id: data.productId });
    const productPrice = product.price;

    Carts.update(
      { userId: Meteor.userId(), "lineItems.productId": data.productId },
      {
        $inc: {
          quantity: -1,
          "lineItems.$.quantity": -1,
          totalPrice: -productPrice,
        },
      }
    );
  },
});
