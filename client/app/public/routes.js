import { FlowRouter } from "meteor/ostrio:flow-router-extra";

FlowRouter.route("/", {
  name: "public.home",
  action: function (params, queryParams) {
    this.render("publicLayoutsDefault", { page: "publicPagesHome" });
  },
});

FlowRouter.route("/category", {
  name: "public.category",
  action: function (params, queryParams) {
    this.render("publicLayoutsDefault", { page: "publicPagesCategory" });
  },
});
