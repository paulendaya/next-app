"use client";
import React, { useState } from "react";
import { CldImage, CldUploadWidget } from "next-cloudinary";

//type the result of the upload: for now only public_id, because currently its not properly typed
interface CloudinaryResult {
  public_id: string;
  width: number;
  height: number;
}

const UploadPage = () => {
  const [resource, setResource] = useState<any>("");
  return (
    <>
      {resource && (
        <CldImage
          width={resource.width}
          height={resource.height}
          src={resource.public_id}
          alt={"An Image"}
        />
      )}
      <CldUploadWidget
        uploadPreset="cld-nxtjs-23112"
        onSuccess={(result, { widget }) => {
          if (result.event !== "success") return;
          //widget.close();
          const info = result.info as CloudinaryResult; //assign the result.info as CloudinaryResult using assertion
          setResource(info);
        }}
      >
        {({ open }) => (
          <button className="btn btn-primary" onClick={() => open()}>
            Upload
          </button>
        )}
      </CldUploadWidget>
    </>
  );
};

export default UploadPage;
