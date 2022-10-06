import SimpleSchema from "simpl-schema";

new ValidatedMethod({
  name: "orders.status",
  mixins: [SignedInMixin, RoleMixin],
  roles: ["roles.admin"],
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
    status: String,
  }).validator(),
  run: function (data) {
    this.unblock();

    Orders.update(
      { _id: data._id },
      {
        $set: {
          status: data.status,
        },
      }
    );
  },
});
