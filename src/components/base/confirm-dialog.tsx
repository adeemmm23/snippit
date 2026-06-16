import { Loading03Icon, Warning } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { ReactElement } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type ConfirmDialogProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;

  title: string;
  description: string;

  confirmLabel?: string;
  cancelLabel?: string;

  onConfirm: () => void;
  onCancel?: () => void;

  additionalContent?: ReactElement;
  disabled?: boolean;
  trigger?: ReactElement;
  destructive?: boolean;
  confirmClose?: boolean;
  loading?: boolean;
};

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  disabled = false,
  trigger,
  additionalContent,
  destructive = false,
  confirmClose = false,
  loading = false,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger render={trigger} />}
      <DialogContent
        forceOverlayRender
        showCloseButton={false}
        className="bg-popover overflow-clip p-4"
      >
        <div className="flex gap-4">
          <div className="bg-muted flex size-10 shrink-0 items-center justify-center rounded-md">
            <HugeiconsIcon
              icon={Warning}
              strokeWidth={1.75}
              className="text-muted-foreground size-6"
            />
          </div>
          <DialogHeader className="flex-1">
            <DialogTitle className="text-base">{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
        </div>
        {additionalContent}
        <DialogFooter className="bg-muted -mx-4 -mb-4 border-t p-3">
          <DialogClose
            render={
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  onCancel?.();
                  onOpenChange?.(false);
                }}
              >
                {cancelLabel}
              </Button>
            }
          />
          {confirmClose ? (
            <DialogClose
              render={
                <Button
                  size="sm"
                  className="relative"
                  variant={destructive ? "destructive" : "default"}
                  disabled={loading || disabled}
                  onClick={() => {
                    if (disabled) {
                      return;
                    }
                    onConfirm();
                    onOpenChange?.(false);
                  }}
                >
                  {loading && (
                    <HugeiconsIcon
                      className="absolute inset-0 m-auto animate-spin"
                      icon={Loading03Icon}
                      strokeWidth={2}
                    />
                  )}
                  <span className={loading ? "invisible" : "visible"}>
                    {confirmLabel}
                  </span>
                </Button>
              }
            />
          ) : (
            <Button
              size="sm"
              className="relative"
              variant={destructive ? "destructive" : "default"}
              disabled={loading || disabled}
              onClick={() => {
                if (disabled) {
                  return;
                }
                onConfirm();
                onOpenChange?.(false);
              }}
            >
              {loading && (
                <HugeiconsIcon
                  className="absolute inset-0 m-auto animate-spin"
                  icon={Loading03Icon}
                  strokeWidth={2}
                />
              )}
              <span className={loading ? "invisible" : "visible"}>
                {confirmLabel}
              </span>
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
