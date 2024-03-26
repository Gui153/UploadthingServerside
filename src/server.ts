import { Elysia, t } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import { renderToReadableStream } from "react-dom/server";
import { swagger } from "@elysiajs/swagger";
import { createElement } from "react";

import { createRouteHandler } from "uploadthing/server";

import { uploadRouter } from "./handlers/uploadthingRouter";


import UploadButtonTest from "./pages/UploadButtonTest";

const host = Bun.env.HOST || "localhost";
const port = Bun.env.PORT || 3000;

const { GET, POST } = createRouteHandler({
  router: uploadRouter,
});

const build = await Bun.build({
  entrypoints: [
    "./src/indexes/UploadButtonTestIndex.tsx",
  ],
  outdir: "./build",
  minify: true,
  splitting: true,
});

import path from "path";

for (const res of build.outputs) {
  // Can be consumed as blobs
  const txt = await res.text()
  Bun.write(
    "./build/" + path.basename(res.path),
    txt.replaceAll("import.meta.env||", ""),
  );
}

const doYouLikeSwaggerUIBetter = false;

async function handleRequest(
  pageComponent: React.ComponentType,
  index: string,
) {
  const page = createElement(pageComponent);
  const stream = await renderToReadableStream(page, {
    bootstrapScripts: [index],
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/html" },
  });
}

export const server = new Elysia({
  cookie: {
    secrets: Bun.env.COOKIE_SECRET,
    sign: ["profile"],
  },
})
  .use(
    staticPlugin({
      assets: "./build",
      prefix: "",
    }),
  )
  .use(
    swagger({
      provider: doYouLikeSwaggerUIBetter ? "swagger-ui" : "scalar",
    }),
  )

  .get("/UploadTest", ()=> handleRequest(UploadButtonTest, "UploadButtonTestIndex.js"))



  .get("/api", () => "Connected to the server!")
  .group("/api/uploadthing", (server) => server
  .post("/", POST) 
  .get("/", GET)
  )
  
  .listen(3000, () => {
    console.log(`server started on http://${host}:${port}`);
  })
  .on("error", (error) => {
    console.error(`Server error: ${error.code}`);
  });
