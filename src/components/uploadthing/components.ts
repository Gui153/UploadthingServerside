import {
    generateReactHelpers,
    generateUploadButton,
    generateUploadDropzone,
    type GenerateTypedHelpersOptions,
  } from "@uploadthing/react";
  
  import type { OurFileRouter } from "../../handlers/uploadthingRouter";
  
  const initOpts = {
    url: "http://localhost:3000",
  } satisfies GenerateTypedHelpersOptions;
  
  export const UploadButton = generateUploadButton<OurFileRouter>(initOpts);
  export const UploadDropzone = generateUploadDropzone<OurFileRouter>(initOpts);
  
  export const { useUploadThing } = generateReactHelpers<OurFileRouter>(initOpts);
  