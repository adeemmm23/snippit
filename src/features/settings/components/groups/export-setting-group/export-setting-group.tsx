import ExportDialog from "./export-dialog";
import ImportDialog from "./import-dialog";
import SettingGroup from "../../ui/setting-group";

export default function ExportGroup() {
  return (
    <SettingGroup title="Import / Export">
      <p className="text-muted-foreground text-sm">
        Import or Export your snippets as a JSON file.
      </p>
      <div className="flex items-center space-x-2">
        <ImportDialog />
        <ExportDialog />
      </div>
    </SettingGroup>
  );
}
