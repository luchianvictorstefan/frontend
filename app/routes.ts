import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/travel-list.tsx"),
    route("travel/:tripId", "routes/travel-detail.tsx"),
    route("create-travel", "routes/create-travel.tsx"),
] satisfies RouteConfig;
