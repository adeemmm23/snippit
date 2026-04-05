import { HugeiconsIcon } from "@hugeicons/react";
import {
  MoreVerticalIcon,
  FileAddIcon,
  FolderAddIcon,
  Refresh01Icon,
} from "@hugeicons/core-free-icons";
import { Button } from "../ui/button";

import { Badge } from "../ui/badge";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useEditor } from "@/context/editor/editor-context";

export default function Header() {
  const { createFile, createFolder, currentWorkingFolder } = useEditor();
  return (
    <div className="flex">
      <div className="flex h-9 min-w-0 flex-1 items-center gap-1 px-2 select-none">
        <span className="overflow-hidden font-medium text-ellipsis whitespace-nowrap">
          IT Control Center
        </span>
        <Badge variant="secondary" className="ml-auto">
          saved
        </Badge>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="ghost" className="size-9">
            <HugeiconsIcon icon={MoreVerticalIcon} className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <HugeiconsIcon icon={Refresh01Icon} className="size-4" />
              Refresh
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => {
                createFile(
                  [...currentWorkingFolder, "NewFile"],
                  "Put some content here...",
                );
              }}
            >
              <HugeiconsIcon icon={FileAddIcon} className="size-4" />
              New File
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                createFolder([...currentWorkingFolder, "NewFolder"])
              }
            >
              <HugeiconsIcon icon={FolderAddIcon} className="size-4" />
              New Folder
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
