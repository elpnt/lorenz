import { Hono } from "hono";
import { auth } from "../lib/auth";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.on(["POST", "GET"], "*", (c) => auth.handler(c.req.raw));

export default app;
