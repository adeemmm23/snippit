import {
  LayoutAlignLeftIcon,
  File02Icon,
  FloppyDiskIcon,
  Settings01Icon,
  LayoutAlignRightIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { toast } from "sonner";
import { FilePath } from "./file-path";
import { Button } from "./ui/button";
import { usePanelRef } from "react-resizable-panels";
import { useEditor } from "@/context/editor/editor-context";
import { useEffect, useState } from "react";
import { Separator } from "./ui/separator";
import { type FileSystemItem } from "@/components/files";

type AppbarProps = {
  leftPanelRef: ReturnType<typeof usePanelRef>;
  rightPanelRef: ReturnType<typeof usePanelRef>;
  setFiles?: (files: Record<string, FileSystemItem>) => void;
};
export function Appbar({ leftPanelRef, rightPanelRef, setFiles }: AppbarProps) {
  const { resetFileState } = useEditor();
  const [isWindowSmall, setIsWindowSmall] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsWindowSmall(true);
        leftPanelRef.current?.collapse();
      } else {
        setIsWindowSmall(false);
        leftPanelRef.current?.expand();
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [leftPanelRef]);
  return (
    <div className="flex gap-2 px-2 py-2">
      <Button
        variant="ghost"
        onClick={() => {
          if (leftPanelRef.current?.isCollapsed()) {
            if (isWindowSmall) {
              rightPanelRef.current?.collapse();
            }
            leftPanelRef.current?.expand();
          } else {
            leftPanelRef.current?.collapse();
          }
        }}
      >
        <HugeiconsIcon icon={LayoutAlignLeftIcon} className="size-4" />
      </Button>
      <Button
        variant="ghost"
        onClick={() => {
          resetFileState();
        }}
      >
        <HugeiconsIcon icon={File02Icon} className="size-4" />
      </Button>
      <Separator orientation="vertical" className="my-auto h-5" />
      <FilePath />
      <Separator orientation="vertical" className="my-auto ml-auto h-5" />
      <Button
        variant="ghost"
        onClick={() => {
          setFiles?.({
            "IT Support Snippets": {
              "Email Templates": {
                "Password Reset.txt":
                  "Subject: Password Reset Request\n\nDear [UserName],\n\nWe received a request to reset your password. Please click the link below to reset it:\n\n[ResetLink]\n\nIf you did not request a password reset, please ignore this email.\n\nBest regards,\nIT Support Team",
              },
            },
          });

          // save to local storage

          localStorage.setItem(
            "files",
            JSON.stringify({
              "IT Support Snippets": {
                "Email Templates": {
                  "Password Reset.txt":
                    "Subject: Password Reset Request\n\nDear [UserName],\n\nWe received a request to reset your password. Please click the link below to reset it:\n\n[ResetLink]\n\nIf you did not request a password reset, please ignore this email.\n\nBest regards,\nIT Support Team",
                },
              },
            }),
          );

          toast("Saved successfully", {
            icon: <HugeiconsIcon icon={FloppyDiskIcon} className="size-4" />,
            position: "bottom-center",
          });
        }}
      >
        <HugeiconsIcon icon={FloppyDiskIcon} className="size-4" />
      </Button>
      <Button variant="ghost">
        <HugeiconsIcon icon={Settings01Icon} className="size-4" />
      </Button>
      <Button
        variant="ghost"
        onClick={() => {
          if (rightPanelRef.current?.isCollapsed()) {
            if (isWindowSmall) {
              leftPanelRef.current?.collapse();
            }
            rightPanelRef.current?.expand();
          } else {
            rightPanelRef.current?.collapse();
          }
        }}
      >
        <HugeiconsIcon icon={LayoutAlignRightIcon} className="size-4" />
      </Button>
    </div>
  );
}
