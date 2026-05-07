import { useSections } from "../context/sections-context";

import { Button } from "@/components/ui/button";

export default function SettingsNavigation() {
  const { sections } = useSections();
  console.log(sections);
  return (
    <aside className="flex w-1/6 flex-col gap-2">
      {/*<Button
        variant="ghost"
        size="sm"
        onClick={() => {
          const section = document.getElementById("Appearance");
          if (section) {
            section.scrollIntoView({ behavior: "smooth" });
          }
        }}
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
      </Button>*/}

      {sections.map((section) => (
        <Button
          key={section.id}
          variant={section.isActive ? "default" : "ghost"}
          size="sm"
          onClick={() => {
            const el = document.getElementById(section.id);
            if (el) {
              el.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="justify-start"
        >
          {section.title}
        </Button>
      ))}
    </aside>
  );
}
