import SettingGroup from "../ui/setting-group";

import { Button } from "@/components/ui/button";
import { useFilesStore } from "@/stores/files/files-store";

export default function ExportGroup() {
  const files = useFilesStore((state) => state.files);
  const addFiles = useFilesStore((state) => state.addFiles);
  return (
    <SettingGroup title="Import / Export">
      <p className="text-muted-foreground text-sm">
        Export or import all your snippets.
      </p>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          onClick={() => {
            const dataStr =
              "data:text/json;charset=utf-8," +
              encodeURIComponent(JSON.stringify(files));
            const downloadAnchorNode = document.createElement("a");
            downloadAnchorNode.setAttribute("href", dataStr);
            downloadAnchorNode.setAttribute("download", "snippets.json");
            document.body.appendChild(downloadAnchorNode); // required for firefox
            downloadAnchorNode.click();
            downloadAnchorNode.remove();
          }}
        >
          Export
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "application/json";
            input.onchange = (e) => {
              const file = (e.target as HTMLInputElement).files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = (event) => {
                try {
                  const importedFiles = JSON.parse(
                    event.target?.result as string,
                  );
                  addFiles([
                    {
                      type: "folder",
                      name: "New",
                      files: importedFiles,
                    },
                  ]);
                } catch (error) {
                  console.error("Failed to import snippets:", error);
                }
              };
              reader.readAsText(file);
            };
            input.click();
          }}
        >
          Import
        </Button>
      </div>
    </SettingGroup>
  );
}
