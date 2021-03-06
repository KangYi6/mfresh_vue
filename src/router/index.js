import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/Index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/contact",
    name: "Contact",
    component: () =>
      import(/* webpackChunkName: "contact" */ "../views/Contact.vue"),
  },
  {
    path: "/news",
    name: "News",
    component: () => import(/* webpackChunkName: "news" */ "../views/News.vue"),
  },
  {
    path: "/news_details/:nid",
    name: "NewsDetails",
    component: () =>
      import(/* webpackChunkName: "news_details" */ "../views/NewsDetails.vue"),
  },
  {
    path: "/product/:type",
    name: "Product",
    component: () =>
      import(/* webpackChunkName: "Product" */ "../views/Product.vue"),
  },
  {
    path: "/product_details/:pid",
    name: "ProductDetails",
    component: () =>
      import(
        /* webpackChunkName: "ProductDetails" */ "../views/ProductDetails.vue"
      ),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(
        /* webpackChunkName: "Login" */ "../views/Login.vue"
      ),
  },
  {
    path: "/cart",
    name: "Cart",
    component: () =>
      import(
        /* webpackChunkName: "Cart" */ "../views/Cart.vue"
      ),
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(
        /* webpackChunkName: "Register" */ "../views/Register.vue"
      ),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
