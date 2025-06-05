import { type RouteConfig, index, layout, route, prefix } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  layout("./components/layout/admin/index.tsx", prefix("admin", [route("dashboard", "./routes/admin/dashboard.tsx")])),
] satisfies RouteConfig;
