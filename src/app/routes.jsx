import { lazy } from "react";

import AuthGuard from "./auth/AuthGuard";

import Loadable from "./components/Loadable";
import MatxLayout from "./components/MatxLayout/MatxLayout";
import { authRoles } from "./auth/authRoles";

const NotFound = Loadable(lazy(() => import("./pages/sessions/NotFound")));
const Login = Loadable(lazy(() => import("./pages/sessions/Login")));
const Register = Loadable(lazy(() => import("./pages/sessions/Register")));
const ForgotPassword = Loadable(lazy(() => import("./pages/sessions/ForgotPassword")));
const Dashboard = Loadable(lazy(() => import("./pages/dashboard/Dashbord")));
const AccessRestricted = Loadable(lazy(() => import("./pages/sessions/accessRestricted")));
const Users = Loadable(lazy(() => import("./pages/users")));
const Tools = Loadable(lazy(() => import("./pages/tools")));
const ToolType = Loadable(lazy(() => import("./pages/toolTypes")));
const PricePlan = Loadable(lazy(() => import("./pages/pricingPlans")));
const Credits = Loadable(lazy(() => import("./pages/credits")));
const Cart = Loadable(lazy(() => import("./pages/cart")));
const Shop = Loadable(lazy(() => import("./pages/shop")));
const Orders = Loadable(lazy(() => import("./pages/orders")));
const Profile = Loadable(lazy(() => import("./pages/profile")));
const ChangePassword = Loadable(lazy(() => import("./pages/profile/components/changePassword")));
const ProfileDetails = Loadable(lazy(() => import("./pages/profile/components/profileDetails")));

const LandingPage = Loadable(lazy(() => import("./pages/landing")));

const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
      { path: "/users", element: <Users /> },
      { path: "/tools", element: <Tools /> },
      { path: "/tooltypes", element: <ToolType /> },
      { path: "/pricePlans", element: <PricePlan /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/credits", element: <Credits /> },
      { path: "/shop", element: <Shop /> },
      { path: "/cart", element: <Cart /> },
      { path: "/orders", element: <Orders /> },
      {
        path: "/profile",
        element: <Profile />,
        children: [
          { path: "", element: <ProfileDetails /> },
          { path: "changepassword", element: <ChangePassword /> },
        ]
      }
    ]
  },

  // session pages route
  { path: "/404", element: <NotFound /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/forgotPassword", element: <ForgotPassword /> },
  { path: "/accessRestricted", element: <AccessRestricted /> },

  { path: "/", element: <LandingPage /> },
  { path: "/home", element: <LandingPage /> },
  { path: "*", element: <NotFound /> }
];

export default routes;
