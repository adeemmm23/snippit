import { HugeiconsIcon } from "@hugeicons/react";
import {
  File01Icon,
  Folder01Icon,
  MoreVerticalIcon,
  InputCursorTextIcon,
  Delete02Icon,
} from "@hugeicons/core-free-icons";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

type NodeProps = {
  name: string;
  isFile: boolean;
  path: string[];
  isActive?: boolean;
  onClick: () => void;
};

export default function Node({
  name,
  isFile,
  onClick,
  isActive,
  path,
}: NodeProps) {
  return (
    <Button
      key={name}
      title={name}
      data-path={path.join("/")}
      variant="ghost"
      size="default"
      className={cn(
        "group/file w-full justify-start gap-2 pr-0",
        isActive &&
          "bg-primary/10 hover:bg-primary/20! text-primary-foreground! focus-within:bg-primary/20 focus:bg-primary/20",
      )}
      onClick={() => {
        onClick();
      }}
    >
      <HugeiconsIcon
        icon={isFile ? File01Icon : Folder01Icon}
        className="size-4"
      />
      <span className="overflow-hidden text-ellipsis whitespace-nowrap">
        {name}
      </span>
      <div className="ml-auto flex size-9 items-center justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger onClick={(e) => e.stopPropagation()}>
            <Button
              variant="ghost"
              size="icon-xs"
              className="pointer-events-none shrink-0 opacity-0 group-hover/file:pointer-events-auto group-hover/file:opacity-100"
            >
              <HugeiconsIcon icon={MoreVerticalIcon} className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <HugeiconsIcon icon={InputCursorTextIcon} className="size-4" />
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive">
                <HugeiconsIcon icon={Delete02Icon} className="size-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Button>
  );
}
