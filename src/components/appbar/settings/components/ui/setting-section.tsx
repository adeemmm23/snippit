type SettingSectionProps = {
  title: string;
  children: React.ReactNode;
};

export default function SettingSection({
  title,
  children,
}: SettingSectionProps) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="mb-2 text-lg font-semibold">{title}</h2>
      <div className="flex flex-col gap-10">{children}</div>
    </div>
  );
}
