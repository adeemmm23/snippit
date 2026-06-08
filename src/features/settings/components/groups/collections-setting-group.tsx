import {
  Add01Icon,
  Delete02Icon,
  InputCursorTextIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";

import SettingGroup from "../ui/setting-group";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useFilesStore } from "@/stores/files/files-store";

type ActionDialogType = "delete" | "rename" | "create" | null;

// TODO: handle span overflow
export default function CollectionsSettingGroup() {
  const collections = useFilesStore((state) => state.collections);
  const createCollection = useFilesStore((state) => state.createCollection);
  const deleteCollection = useFilesStore((state) => state.deleteCollection);
  const renameCollection = useFilesStore((state) => state.renameCollection);

  const [actionDialog, setActionDialog] = useState<ActionDialogType>(null);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(
    null,
  );
  const [newName, setNewName] = useState("");

  const handleDelete = () => {
    if (selectedCollection) {
      deleteCollection(selectedCollection);
      setActionDialog(null);
      setSelectedCollection(null);
    }
  };

  const handleRename = () => {
    if (selectedCollection && newName.trim()) {
      renameCollection(selectedCollection, newName.trim());
      setActionDialog(null);
      setSelectedCollection(null);
      setNewName("");
    }
  };

  const handleCreate = () => {
    if (newName.trim()) {
      createCollection(newName.trim());
      setActionDialog(null);
      setNewName("");
    }
  };

  const openDeleteDialog = (collectionName: string) => {
    setSelectedCollection(collectionName);
    setActionDialog("delete");
  };

  const openRenameDialog = (collectionName: string) => {
    setSelectedCollection(collectionName);
    setNewName(collectionName);
    setActionDialog("rename");
  };

  const openCreateDialog = () => {
    setActionDialog("create");
    setNewName("");
  };

  return (
    <>
      <SettingGroup title="Collections">
        <p className="text-muted-foreground text-sm">
          Manage your collections. Delete or rename them as needed.
        </p>
        {collections.length === 0 ? (
          <p className="text-muted-foreground text-sm italic">
            No collections yet. Click "New" to create one.
          </p>
        ) : (
          <div className="space-y-2">
            {collections.map((collection) => (
              <div className="flex gap-2">
                <div
                  key={collection.name}
                  className="border-border bg-background dark:bg-input/30 dark:border-input flex h-9 max-w-60 grow items-center justify-between rounded-md border px-2.5 shadow-xs"
                >
                  <span className="text-sm">{collection.name}</span>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => openRenameDialog(collection.name)}
                >
                  <HugeiconsIcon icon={InputCursorTextIcon} />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => openDeleteDialog(collection.name)}
                >
                  <HugeiconsIcon icon={Delete02Icon} />
                </Button>
              </div>
            ))}
          </div>
        )}

        <Button
          variant="default"
          onClick={openCreateDialog}
          className="mt-4 w-fit"
        >
          <HugeiconsIcon icon={Add01Icon} className="h-4 w-4" />
          <span>New</span>
        </Button>
      </SettingGroup>

      {/* Create Dialog */}
      <Dialog
        open={actionDialog === "create"}
        onOpenChange={(open) => {
          if (!open) {
            setActionDialog(null);
            setNewName("");
          }
        }}
      >
        <DialogContent className="bg-popover" forceOverlayRender>
          <DialogHeader>
            <DialogTitle>Create Collection</DialogTitle>
            <DialogDescription>
              Enter a name for your new collection.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Input
              placeholder="Collection name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCreate();
                }
              }}
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setActionDialog(null);
                setNewName("");
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={!newName.trim()}>
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rename Dialog */}
      <Dialog
        open={actionDialog === "rename"}
        onOpenChange={(open) => {
          if (!open) {
            setActionDialog(null);
            setSelectedCollection(null);
            setNewName("");
          }
        }}
      >
        <DialogContent className="bg-popover" forceOverlayRender>
          <DialogHeader>
            <DialogTitle>Rename Collection</DialogTitle>
            <DialogDescription>
              Enter a new name for "{selectedCollection}".
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Input
              placeholder="Collection name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleRename();
                }
              }}
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setActionDialog(null);
                setSelectedCollection(null);
                setNewName("");
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleRename} disabled={!newName.trim()}>
              Rename
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog
        open={actionDialog === "delete"}
        onOpenChange={(open) => {
          if (!open) {
            setActionDialog(null);
            setSelectedCollection(null);
          }
        }}
      >
        <DialogContent className="bg-popover" forceOverlayRender>
          <DialogHeader>
            <DialogTitle>Delete Collection?</DialogTitle>
            <DialogDescription>
              Deleting "{selectedCollection}" will remove all files in this
              collection. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {collections.length <= 1 && (
            <p className="text-destructive text-sm">
              Note: You cannot delete your last remaining collection.
            </p>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setActionDialog(null);
                setSelectedCollection(null);
              }}
            >
              Cancel
            </Button>
            <Button
              disabled={collections.length <= 1}
              variant="destructive"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
