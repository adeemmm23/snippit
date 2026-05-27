import FilePath from "./components/file-path";
import SaveButton from "./components/save-button";
import SettingsButton from "./components/settings-button";
import TemporaryFileButton from "./components/temporary-file-button";

import { Separator } from "@/components/ui/separator";

export default function Appbar() {
  return (
    <div className="flex gap-2 p-2">
      <TemporaryFileButton />
      <Separator orientation="vertical" className="my-auto h-5" />
      <FilePath />
      <Separator orientation="vertical" className="my-auto ml-auto h-5" />
      <SaveButton />
      <SettingsButton />
    </div>
  );
}
