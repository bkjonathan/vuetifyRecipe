export default [
  {
    path: "/",
    component: () => import("./../Layout/MainLayout"),
    children: [
      {
        path: "",
        component: () => import("./../views/Home"),
        name: "home"
      }
    ]
  }
];
