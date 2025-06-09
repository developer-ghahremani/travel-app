import { type RouteConfig, index, layout, route, prefix } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("admin/auth", "./routes/admin/auth.tsx"),
  layout(
    "./components/layout/admin/index.tsx",
    prefix("admin", [
      route("dashboard", "./routes/admin/dashboard.tsx"),
      ...prefix("api", [route("create-trip", "./routes/admin/api/create-trip.tsx")]),
      route("users", "./routes/admin/users.tsx"),
      ...prefix("trips", [
        route("list", "./routes/admin/trips/list.tsx"),
        route("add", "./routes/admin/trips/add.tsx"),
      ]),
    ])
  ),
] satisfies RouteConfig;
