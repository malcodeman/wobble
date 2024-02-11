import { useState } from "react";

import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Modal, ModalPanel, ModalTitle } from "../ui/Modal";

type Props = {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  onRename: (title: string) => void;
};

export const RenameTitleModal = (props: Props) => {
  const { isOpen, title, onClose, onRename } = props;
  const [value, setValue] = useState(title);

  const handleOnRename = () => {
    onRename(value);
    onClose();
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleOnRename();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalPanel>
        <ModalTitle className="mb-2">Rename project</ModalTitle>
        <form onSubmit={handleOnSubmit}>
          <Input
            label="Title"
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
          />
          <div className="mt-4 flex justify-end space-x-2">
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" onClick={handleOnRename}>
              Update
            </Button>
          </div>
        </form>
      </ModalPanel>
    </Modal>
  );
};
