import SettingGroup from "../ui/setting-group";

export default function AboutSettingGroup() {
  return (
    <SettingGroup title="Snippit">
      <p className="text-muted-foreground text-sm">
        Snippit is a simple snippet manager built with React and Tailwind CSS.
        It allows you to easily save, organize, and manage your templates
        snippets in one place.
      </p>
    </SettingGroup>
  );
}
