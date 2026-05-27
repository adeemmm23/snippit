import { useSections } from "../context/sections-context";

import { Button } from "@/components/ui/button";

export default function SettingsNavigation() {
  const { sections, activeSection } = useSections();

  return (
    <aside className="flex w-1/6 flex-col gap-2">
      {sections &&
        sections.map((section) => (
          <Button
            key={section.id}
            size="sm"
            className="justify-start"
            variant={
              activeSection === section.id
                ? activeSection.toLocaleLowerCase().includes("danger")
                  ? "destructive"
                  : "default"
                : "ghost"
            }
            onClick={() => {
              const el = document.getElementById(section.id);
              if (el) {
                el.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            {section.title}
          </Button>
        ))}
    </aside>
  );
}
