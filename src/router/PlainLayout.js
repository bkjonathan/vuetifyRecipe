export default [
  {
    path: "",
    component: () => import("./../Layout/PlainLayout"),
    children: [
      {
        path: "/Login",
        name: "login",
        component: () => import("./../views/Auth/Login.vue")
      }
    ]
  }
];
