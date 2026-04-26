import {
  FileAddIcon,
  FolderAddIcon,
  MoreVerticalIcon,
  Refresh01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useFiles } from "@/context/files/files-context";
import { IT_SUPPORT_SNIPPETS } from "@/lib/test";

export default function Header() {
  const { createItem, currentWorkingFolder } = useFiles();
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
        <DropdownMenuTrigger
          render={
            <Button variant="ghost" size="icon">
              <HugeiconsIcon icon={MoreVerticalIcon} className="size-4" />
            </Button>
          }
        />
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
                createItem([...currentWorkingFolder, "NewFile"], "file");
              }}
            >
              <HugeiconsIcon icon={FileAddIcon} className="size-4" />
              New File
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                createItem([...currentWorkingFolder, "NewFolder"], "folder")
              }
            >
              <HugeiconsIcon icon={FolderAddIcon} className="size-4" />
              New Folder
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                localStorage.setItem(
                  "files",
                  JSON.stringify(IT_SUPPORT_SNIPPETS),
                );
              }}
            >
              <HugeiconsIcon icon={FolderAddIcon} className="size-4" />
              Dummy
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
