import React, { useState, useMemo } from "react";
import { Input } from "./ui/input";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ArrowRight02Icon,
  ArrowDown02Icon,
  File02Icon,
  Folder01Icon,
} from "@hugeicons/core-free-icons";
import { Label } from "./ui/label";

type FileSystemItem = {
  [key: string]: string | FileSystemItem;
};

interface FileNode {
  name: string;
  type: "file" | "folder";
  content?: string;
  children?: FileNode[];
  path: string;
}

const parseFileSystem = (data: FileSystemItem, parentPath = ""): FileNode[] => {
  const nodes: FileNode[] = [];

  for (const [key, value] of Object.entries(data)) {
    const currentPath = parentPath ? `${parentPath}/${key}` : key;

    if (typeof value === "string") {
      // It's a file
      nodes.push({
        name: key,
        type: "file",
        content: value,
        path: currentPath,
      });
    } else {
      // It's a folder
      nodes.push({
        name: key,
        type: "folder",
        children: parseFileSystem(value, currentPath),
        path: currentPath,
      });
    }
  }

  return nodes;
};

const FileTreeNode: React.FC<{
  node: FileNode;
  level?: number;
}> = ({ node, level = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  //   const paddingLeft = level * 20 + 8;

  if (node.type === "file") {
    return (
      <div
        className="flex items-center gap-2 p-2 hover:bg-card rounded cursor-pointer"
        // style={{ paddingLeft: `${paddingLeft}px` }}
      >
        <HugeiconsIcon icon={File02Icon} className="w-4 h-4 shrink-0" />
        <span className="text-sm truncate">{node.name}</span>
      </div>
    );
  }

  return (
    <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
      <CollapsibleTrigger className="flex items-center gap-2 p-2 hover:bg-card rounded cursor-pointer w-full">
        <HugeiconsIcon icon={Folder01Icon} className="w-4 h-4 shrink-0" />
        <span className="text-sm font-medium truncate">{node.name}</span>
        <div className="ml-auto">
          {isExpanded ? (
            <HugeiconsIcon icon={ArrowDown02Icon} className="w-4 h-4" />
          ) : (
            <HugeiconsIcon icon={ArrowRight02Icon} className="w-4 h-4" />
          )}
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent>
        {node.children && (
          <div>
            {node.children.map((child, index) => (
              <FileTreeNode
                key={`${child.path}-${index}`}
                node={child}
                level={level + 1}
              />
            ))}
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
};

interface FilesProps {
  data: FileSystemItem;
}

export const Files: React.FC<FilesProps> = ({ data }) => {
  const fileTree = useMemo(() => parseFileSystem(data), [data]);

  return (
    <>
      <Label className="text-lg font-semibold mb-4">Files</Label>
      <div className="relative my-2">
        <Input type="text" placeholder="Search files and folders..." />
      </div>

      <div className="space-y-0.5">
        {fileTree.map((node, index) => (
          <FileTreeNode key={`${node.path}-${index}`} node={node} />
        ))}
      </div>
    </>
  );
};
