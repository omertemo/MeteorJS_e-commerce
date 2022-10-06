import SimpleSchema from "simpl-schema";

new ValidatedMethod({
  // Metod çağrılırken status pending olarak ayarlanacak
  name: "app.order.create",
  validate: new SimpleSchema({
    order: OrderSchema,
  }).validator(),
  run: function (data) {
    this.unblock();

    const { order } = data;

    const id = Orders.insert(order);

    Carts.remove({ userId: order.userId });
    //cart'ı boşalt
    return Orders.findOne({ _id: id });
  },
});
