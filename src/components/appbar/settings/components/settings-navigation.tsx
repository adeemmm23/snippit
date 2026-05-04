import { Button } from "@/components/ui/button";

export default function SettingsNavigation() {
  return (
    <aside className="flex w-1/6 flex-col gap-2">
      <Button
        variant="ghost"
        size="sm"
        className="bg-primary text-primary-foreground hover:bg-primary/80 dark:hover:bg-primary/80 hover:text-primary-foreground justify-start"
      >
        Appearance
      </Button>
      <Button variant="ghost" size="sm" className="justify-start">
        Editor
      </Button>
      <Button variant="ghost" size="sm" className="justify-start">
        Files
      </Button>
      <Button variant="ghost" size="sm" className="justify-start">
        Shortcuts
      </Button>
      <Button variant="ghost" size="sm" className="justify-start">
        About
      </Button>
      <Button variant="ghost" size="sm" className="justify-start">
        Danger
      </Button>
    </aside>
  );
}
