// @flow
import { lazy } from "react";
import authRoutes from "modules/auth/routes";


export default [
  {
    path: "/",
    exact: true,
    auth: false,
    roles: ["admin"],
    component: lazy(() => import("modules/dashboard")),
  },
  {
    path: "/home",
    exact: true,
    auth: false,
    roles: ["admin"],
    component: lazy(() => import("modules/dashboard/authDashboard")),
  },
  {
    path: "/product/:productCode",
    exact: true,
    auth: false,
    roles: ["admin"],
    component: lazy(() => import("modules/singleProduct")),
  },
  {
    path: "/checkout",
    exact: true,
    auth: false,
    roles: ["admin"],
    component: lazy(() => import("modules/checkoutPage")),
  },
  {
    path: "/wishlist",
    exact: true,
    auth: false,
    roles: ["admin"],
    component: lazy(() => import("modules/wishListPage")),
  },

  {
    path: "/signin",
    exact: true,
    auth: false,
    roles: ["admin"],
    component: lazy(() => import("components/User.Components/UserLogin")),
  },

  {
    path: "/signup",
    exact: true,
    auth: false,
    roles: ["admin"],
    component: lazy(() => import("components/User.Components/UserSignUp")),
  },

  {
    path: "/userprofile",
    exact: true,
    auth: false,
    roles: ["admin"],
    component: lazy(() => import("components/User.Components/UserProfile")),
  },

  {
    path: "/logout",
    exact: true,
    auth: false,
    roles: ["admin"],
    component: lazy(() => import("components/User.Components/UserLogout")),
  },

  
  ...authRoutes,
];
