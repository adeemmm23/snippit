import { cn } from "@/utils/cn";

type SettingSectionProps = {
  title: string;
  children: React.ReactNode;
  last?: boolean;
};

export default function SettingSection({
  title,
  children,
  last,
}: SettingSectionProps) {
  return (
    <section
      id={title}
      data-section={title}
      className={cn("flex scroll-mt-3 flex-col gap-2", last && "h-72")}
    >
      <h2 className="mb-2 text-lg font-semibold">{title}</h2>
      <div className="flex flex-col gap-10">{children}</div>
    </section>
  );
}
