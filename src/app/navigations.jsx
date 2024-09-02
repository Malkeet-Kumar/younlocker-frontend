export const navigations = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: "dashboard"
  },
  {
    name: "Users",
    icon: "people",
    path: "/users"
  },
  {
    name: "Tools",
    icon: "build_circle",
    path: "/tools"
  },
  {
    name: "Tool Types",
    icon: "build",
    path: "/tooltypes"
  },
  {
    name: "Price Plans",
    icon: "wallet",
    path: "/priceplans"
  },
  {
    name: "Credits",
    icon: "savings",
    path: "/credits"
  },
  {
    name: "Rent Tool",
    icon: "build_circle",
    path: "/shop"
  },
  {
    name: "Cart",
    icon: "shopping_cart",
    path: "/cart"
  },
  {
    name: "Orders",
    icon: "inventory",
    path: "/orders"
  },
];

const generateAccessArray = (navigations) => {
  const paths = new Set();
  const extractPaths = (items) => {
    items.forEach((item) => {
      if (item.path) {
        paths.add(item.path);
      }
      if (item.children) {
        extractPaths(item.children);
      }
    });
  };

  extractPaths(navigations);
  return Array.from(paths).map((path) => ({ path, access: true }));
};

// const accessArray = generateAccessArray(navigations);
