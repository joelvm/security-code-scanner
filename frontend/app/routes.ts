import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("./layout.tsx", [
        index("routes/home.tsx"),
        route("settings", "routes/settings/index.tsx"),
        route("settings/:id", "routes/settings/edit.tsx"),
    ])] satisfies RouteConfig;
