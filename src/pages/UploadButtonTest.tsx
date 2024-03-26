import React, { useEffect } from "react";


import { UploadButton } from "../components/uploadthing/components";
const apikey = process.env.UPLOADTHING_SECRET;
function WhatServer() {
    const [serverResponse, setServerResponse] = React.useState<string>("");
    useEffect(() => {
      fetch("http://localhost:3000/api")
        .then((res) => res.text())
        .then(setServerResponse);
    }, []);
    return (
        <h1 className="text-xl font-bold">
          {serverResponse || "Getting server..."}
        </h1>
      );
}

const UploadButtonTest = () => {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>Design Studio - Logo365.AI</title>
        <meta name="description" content="Start designing with Logo365.AI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <div className="container">    
          <div className="content">
            {apikey}
            <div className="start-container">
              <WhatServer />
              <div>
                <UploadButton
                endpoint="videoAndImage"
                skipPolling
                onClientUploadComplete={(file) => {
                console.log("uploaded", file);
                alert("Upload complete");
                }}
                    onUploadError={(error) => {
                    console.error(error, error.cause);
                    alert("Upload failed");
                }}
                />
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
};
export default UploadButtonTest;
