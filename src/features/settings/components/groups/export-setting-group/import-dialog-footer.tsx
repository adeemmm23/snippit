import { ArrowRight, Close, FolderAddIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useFilesStore } from "@/stores/files/files-store";

type ImportDialogFooterProps = {
  onSelect: () => void;
  path: string[];
  selectedCollection: string;
};

export default function ImportDialogFooter({
  onSelect,
  path,
  selectedCollection,
}: ImportDialogFooterProps) {
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const createItem = useFilesStore((state) => state.createItem);

  const handleCreateFolder = () => {
    if (!inputRef.current?.value) return;
    if (inputRef.current?.value.trim() === "") return;

    createItem(
      [...path, inputRef.current?.value ?? "New folder"],
      "folder",
      selectedCollection,
    );
    setIsCreatingFolder(false);
  };

  if (isCreatingFolder) {
    return (
      <DialogFooter>
        <InputGroup>
          <InputGroupInput
            autoFocus
            ref={inputRef}
            placeholder="New folder name"
            onKeyDown={(e) => {
              e.preventDefault();
              if (e.key === "Enter") {
                handleCreateFolder();
              }
            }}
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              variant="ghost"
              size="icon-xs"
              onClick={() => {
                handleCreateFolder();
              }}
            >
              <HugeiconsIcon icon={ArrowRight} className="size-4 shrink-0" />
            </InputGroupButton>
          </InputGroupAddon>
          <InputGroupAddon align="inline-start">
            <InputGroupButton
              variant="ghost"
              size="icon-xs"
              onClick={() => {
                setIsCreatingFolder(false);
              }}
            >
              <HugeiconsIcon icon={Close} className="size-4 shrink-0" />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </DialogFooter>
    );
  }

  return (
    <DialogFooter>
      <Button
        variant="outline"
        className="mr-auto"
        onClick={() => {
          setIsCreatingFolder(true);
        }}
      >
        <HugeiconsIcon icon={FolderAddIcon} className="size-4 shrink-0" />
      </Button>
      <DialogClose render={<Button variant="outline">Cancel</Button>} />
      <DialogClose
        render={<Button>Use this folder</Button>}
        onClick={() => onSelect()}
      />
    </DialogFooter>
  );
}
