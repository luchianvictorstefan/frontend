import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/_index.tsx"),
    route("travel/:tripId", "routes/travel-detail.tsx"),
    route("create-travel", "routes/create-travel.tsx"),
    route("api/logto/:action", "routes/api.logto.$action.ts"),
] satisfies RouteConfig;
