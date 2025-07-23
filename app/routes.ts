import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/travel-list.tsx"),
    route("travel/:tripId", "routes/travel-detail.tsx"),
    route("create-travel", "routes/create-travel.tsx"),
    route("sign-in", "routes/sign-in.tsx"),
    route("sign-out", "routes/sign-out.tsx"),
    route("callback", "routes/callback.tsx"),
] satisfies RouteConfig;
