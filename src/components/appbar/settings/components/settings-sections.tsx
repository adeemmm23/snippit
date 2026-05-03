import ThemeSettingGroup from "./groups/theme";
import SettingSection from "./ui/setting-section";

export default function SettingsSections() {
  return (
    <main className="flex flex-1 flex-col gap-10">
      <SettingSection title="Appearance">
        <ThemeSettingGroup />
      </SettingSection>
      <SettingSection title="Editor">
        <div></div>
      </SettingSection>
    </main>
  );
}
