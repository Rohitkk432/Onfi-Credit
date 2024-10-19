/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import cn from "classnames";
import Button from "../button";
interface UploaderProps {
  label?: string;
  useUppercaseLabel?: boolean;
  // eslint-disable-next-line
  setFile?: (file: any) => void;
  uploaded?: File | undefined;
  fileTypeLabel?: string;
  fileFormatLabel?: string;
  accepts?: "image" | "document";
}

const Uploader: React.FC<UploaderProps> = ({
  label,
  useUppercaseLabel = true,
  setFile = () => {},
  uploaded,
  fileTypeLabel = "document file",
  fileFormatLabel = "only .pdf format is supported. must be < 15 MB",
  accepts = "image",
}) => {
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept:
      accepts === "image"
        ? {
            "image/*": [], // Accepts all image types (png, jpg, jpeg, etc.)
          }
        : {
            "application/pdf": [], // Accepts PDF files
          },
    multiple: false,
    // eslint-disable-next-line
    onDrop: (acceptedFiles: any) => {
      setFile(acceptedFiles[0]);
      setFiles(
        // eslint-disable-next-line
        acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });

  useEffect(() => {
    if (uploaded === undefined) return;
    setFile(uploaded);
    setFiles([uploaded as never]);
  }, [uploaded, setFile]);
  // eslint-disable-next-line
  const thumbs = files.map((file: any) => {
    return (
      <div
        key={file.name}
        className="flex h-full w-full justify-center items-center gap-2 p-3"
      >
        {accepts === "image" && (
          <img
            src={file.preview}
            className="mx-auto max-h-full max-w-full object-contain"
            alt="uploaded image"
          />
        )}
        {accepts === "document" && (
          <div className="flex gap-4 items-center">
            <div className="text-sm lg:text-base">{file.name}</div>
            <a
              href={file.preview}
              target="_blank"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Button size="small">Preview</Button>
            </a>
          </div>
        )}
      </div>
    );
  });

  return (
    <div className="flex w-full flex-col text-xs sm:text-sm">
      {label && (
        <span
          className={cn(
            "block text-xs font-medium tracking-widest text-gray-100 xl:text-sm 3xl:text-base",
            useUppercaseLabel ? "mb-2 uppercase sm:mb-3" : "mb-2",
          )}
        >
          {label}
        </span>
      )}
      <div
        className={`w-full rounded-lg cursor-pointer border border-dashed border-gray-400 bg-gray-100 `}
      >
        <div
          {...getRootProps({
            className: "h-full flex items-center justify-center rounded-lg",
          })}
        >
          <input {...getInputProps()} />
          {files.length > 0 ? (
            thumbs
          ) : (
            <div className="flex h-full w-full flex-col items-center gap-2 p-3 text-center text-2xs xl:text-xs">
              <div>
                drag and drop a {fileTypeLabel} or{" "}
                <div className="inline text-primary-500">browse files</div> to
                upload.
              </div>
              <div>{fileFormatLabel}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Uploader;
