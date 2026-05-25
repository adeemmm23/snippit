type SettingGroupProps = {
  title: string;
  children: React.ReactNode;
};

export default function SettingGroup({ title, children }: SettingGroupProps) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm">{title}</h3>
      {children}
    </div>
  );
}
