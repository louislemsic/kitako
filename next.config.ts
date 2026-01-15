import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";

const nextConfig: NextConfig = {
  turbopack: {},
  /* config options here */
};

/** DO NOT TOUCH */
const withSerwist = withSerwistInit({
  swSrc: "src/lib/sw.ts",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV !== "production",
});

export default withSerwist(nextConfig);