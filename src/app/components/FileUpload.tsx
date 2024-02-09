import { useDropzone } from "react-dropzone";
import { Button } from "../ui/Button";

type Props = {
  onDrop: (files: File[]) => void;
};

export const FileUpload = (props: Props) => {
  const { onDrop } = props;
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/json": [".json"],
    },
    multiple: false,
  });

  return (
    <>
      <input {...getInputProps()} />
      <Button {...getRootProps()}>Import .json</Button>
    </>
  );
};
