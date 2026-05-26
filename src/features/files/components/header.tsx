import {
  FileAddIcon,
  FolderAddIcon,
  MoreVerticalIcon,
  Refresh01Icon,
  PackageAdd01Icon,
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
import { IT_SUPPORT_SNIPPETS } from "@/constants/test.constants";
import { useFilesStore } from "@/stores/files/files-store";

export default function Header() {
  const createItem = useFilesStore((state) => state.createItem);
  const setFiles = useFilesStore((state) => state.setFiles);
  const currentWorkingFolder = useFilesStore(
    (state) => state.currentWorkingFolder,
  );

  return (
    // TODO: implement collection
    <div className="flex px-2">
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
                const newFiles = JSON.parse(
                  JSON.stringify(IT_SUPPORT_SNIPPETS),
                );
                setFiles(newFiles);
              }}
            >
              <HugeiconsIcon icon={PackageAdd01Icon} className="size-4" />
              Dummy
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
