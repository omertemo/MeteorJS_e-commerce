ActionCartUpdate = (productId, productPrice, type) => {
  let cond = type == "remove" ? -1 : 1;

  Carts.update(
    { userId: Meteor.userId(), "lineItems.productId": productId },
    {
      $inc: {
        quantity: cond * 1,
        "lineItems.$.quantity": cond * 1,
        totalPrice: cond * productPrice,
      },
    }
  );
};
