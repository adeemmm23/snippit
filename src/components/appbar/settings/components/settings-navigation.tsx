import { useSections } from "../context/sections-context";

import { Button } from "@/components/ui/button";

export default function SettingsNavigation() {
  const { sections, activeSection } = useSections();
  console.log(sections);
  return (
    <aside className="flex w-1/6 flex-col gap-2">
      {sections &&
        sections.map((section) => (
          <Button
            key={section.id}
            variant={activeSection === section.id ? "default" : "ghost"}
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
