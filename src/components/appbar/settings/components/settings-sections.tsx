import { useEffect, useRef } from "react";

import MagicSettingGroup from "./groups/magic";
import ThemeSettingGroup from "./groups/theme";
import VariableSettingGroup from "./groups/variable";
import SettingSection from "./ui/setting-section";
import { useSections } from "../context/sections-context";

import { ScrollArea } from "@/components/ui/scroll-area";

export default function SettingsSections() {
  const ref = useRef<HTMLElement | null>(null);

  const { setSections } = useSections();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target.id);

        setSections((prevSections) =>
          prevSections.map((section) => ({
            ...section,
            isActive: visibleSections.includes(section.id),
          })),
        );
      },
      {
        root: ref.current,
        rootMargin: "0px 0px -80% 0px",
        threshold: 0.1,
      },
    );

    const sections = ref.current?.querySelectorAll("section");

    const tempSections = Array.from(sections || []).map((section) => ({
      id: section.id,
      title: section.dataset.section || "",
      isActive: false,
    }));

    console.log("temp", tempSections);

    setSections(tempSections);

    // observe their parents div, which is the section
    sections?.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <main ref={ref} className="h-full flex-1">
      <ScrollArea className="size-full overflow-auto">
        <div className="flex flex-col gap-10" id="settings-sections">
          <SettingSection title="Appearance">
            <ThemeSettingGroup />
          </SettingSection>
          <SettingSection title="Editor">
            <VariableSettingGroup />
            <MagicSettingGroup />
          </SettingSection>
        </div>
      </ScrollArea>
    </main>
  );
}
