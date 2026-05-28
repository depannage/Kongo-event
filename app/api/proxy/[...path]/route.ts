import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
const API_BASE_URL = (
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://kongo-event-api.onrender.com"
).replace(/\/+$/, "");

function buildUpstreamUrl(path: string[] | undefined, search: string) {
    const pathString = path?.length ? path.join("/") : "";
    return `${API_BASE_URL}/${pathString}${search || ""}`;
}

function buildHeaders(req: NextRequest) {
    const headers = new Headers();
    const ct = req.headers.get("content-type");
    if (ct) headers.set("content-type", ct);
    const accept = req.headers.get("accept");
    if (accept) headers.set("accept", accept);
    const auth = req.headers.get("authorization");
    if (auth) headers.set("authorization", auth);
    const cookie = req.headers.get("cookie");
    if (cookie) headers.set("cookie", cookie);
    return headers;
}

type ProxyCtx =
    | { params: { path: string[] } }
    | { params: Promise<{ path: string[] }> };

async function proxy(method: string, req: NextRequest, ctx: ProxyCtx) {
    const { path } = await Promise.resolve(ctx.params);

    const url = buildUpstreamUrl(path, req.nextUrl.search);
    const headers = buildHeaders(req);

    const init: RequestInit = { method, headers };

    if (method !== "GET" && method !== "HEAD") {
        init.body = await req.arrayBuffer();
    }

    const upstream = await fetch(url, init);

    const body = await upstream.arrayBuffer();

    const res = new NextResponse(body, {
        status: upstream.status,
        headers: {
            "content-type":
                upstream.headers.get("content-type") || "application/json",
            "cache-control": "no-store",
        },
    });
    const setCookie = upstream.headers.get("set-cookie");
    if (setCookie) {
        setCookie.split(/,(?=\s*[^;]+?=)/).forEach((c) => {
            res.headers.append("set-cookie", c.trim());
        });
    }
    return res;
}

export async function GET(req: NextRequest, ctx: ProxyCtx) {
    return proxy("GET", req, ctx);
}
export async function POST(req: NextRequest, ctx: ProxyCtx) {
    return proxy("POST", req, ctx);
}
export async function PUT(req: NextRequest, ctx: ProxyCtx) {
    return proxy("PUT", req, ctx);
}
export async function DELETE(req: NextRequest, ctx: ProxyCtx) {
    return proxy("DELETE", req, ctx);
}
export async function PATCH(req: NextRequest, ctx: ProxyCtx) {
    return proxy("PATCH", req, ctx);
}
export async function OPTIONS() {
    return new NextResponse(null, { status: 204 });
}
