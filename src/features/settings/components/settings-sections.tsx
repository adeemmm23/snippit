import { useEffect, useRef } from "react";

import AboutSettingGroup from "./groups/about-setting-group";
import CollectionsSettingGroup from "./groups/collections-setting-group";
import HelpersSettingGroup from "./groups/helpers-setting-group";
import ShortcutsGroup from "./groups/shortcuts-setting-group";
import ThemeSettingGroup from "./groups/theme-setting-group";
import TooltipsGroup from "./groups/tooltips-setting-group";
import VariableSettingGroup from "./groups/variable-setting-group";
import SettingSection from "./ui/setting-section";
import { useSections } from "../context/sections-context";
import ExportGroup from "./groups/export-setting-group";
import ResetSettingGroup from "./groups/reset-setting-group";

import { ScrollArea } from "@/components/ui/scroll-area";

export default function SettingsSections() {
  const ref = useRef<HTMLElement | null>(null);

  const { setSections, setActiveSection } = useSections();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target.id);

        if (visibleSections.length > 0) {
          setActiveSection(visibleSections[0]);
        }
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

    setSections(tempSections);
    setActiveSection(tempSections[0]?.id || null);

    sections?.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // TODO: Change bottom padding to something more accurate
  // px-4 is a work arround of ring not appearing when no padding
  return (
    <main ref={ref} className="h-full flex-1">
      <ScrollArea className="size-full overflow-auto">
        <div
          className="flex flex-col gap-10 px-4 pb-120"
          id="settings-sections"
        >
          <SettingSection title="Appearance">
            <ThemeSettingGroup />
          </SettingSection>
          <SettingSection title="Editor">
            <VariableSettingGroup />
            <HelpersSettingGroup />
          </SettingSection>
          <SettingSection title="Shortcuts">
            <TooltipsGroup />
            <ShortcutsGroup />
          </SettingSection>
          <SettingSection title="Files">
            <CollectionsSettingGroup />
            <ExportGroup />
          </SettingSection>
          <SettingSection title="Danger">
            <ResetSettingGroup />
          </SettingSection>
          <SettingSection title="About">
            <AboutSettingGroup />
          </SettingSection>
        </div>
      </ScrollArea>
    </main>
  );
}
