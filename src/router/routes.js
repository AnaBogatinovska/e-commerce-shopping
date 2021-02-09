const routes = [
  {
    path: "/",
    name: "LandingLayout",
    meta: {
      requiresAuth: false,
    },
    component: () => import("layouts/LandingLayout.vue"),
    children: [
      {
        path: "",
        name: "LandingPage",
        component: () => import("pages/LandingPage.vue")
      },
      {
        path: "auth/login",
        name: "Login",
        component: () => import("pages/auth/Login.vue")
      },
      {
        path: "auth/register",
        name: "Register",
        component: () => import("pages/auth/Register.vue")
      }
    ]
  },

  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    name: "Main",
    children: [
      {
        path: "/products",
        name: "Products",
        meta: {
          requiresAuth: true
        },
        component: () => import("pages/public/Products.vue")
      },
      {
        path: "/cart",
        name: "CartProducts",
        meta: {
          requiresAuth: true
        },
        component: () => import("pages/public/CartProducts.vue")
      }
    ]
  },

  {
    path: "/admin/products/",
    component: () => import("layouts/AdminLayout.vue"),
    name: "Admin",
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: "",
        name: "AdminProducts",
        component: () => import("pages/admin/Products.vue"),
        children: [
          {
            path: ":id",
            name: "AdminItem",
            component: () => import("components/AdminItem.vue")
          }
        ]
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
