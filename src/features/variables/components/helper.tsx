import DateHelper from "./helpers/date-helper";
import PasswordHelper from "./helpers/password-helper";
import RangeHelper from "./helpers/range-helper";
import SelectHelper from "./helpers/select-helper";

import useSettingsStore from "@/stores/settings/settings-store";

type HelperProps = {
  name: string;
  onChange: (generatedValue: string) => void;
};

export default function Helper({ name, onChange }: HelperProps) {
  const helpers = useSettingsStore((state) => state.helpers);

  const helper = helpers.find((m) =>
    name.toLowerCase().includes(m.name.toLowerCase()),
  );

  if (!helper) {
    return null;
  }

  if (helper.type === "password") {
    return <PasswordHelper onGenerate={onChange} options={helper.options} />;
  }

  if (helper.type === "select") {
    return <SelectHelper onGenerate={onChange} options={helper.options} />;
  }

  if (helper.type === "date") {
    return <DateHelper onSelect={onChange} />;
  }

  if (helper.type === "range") {
    return <RangeHelper onSelect={onChange} />;
  }

  return null;
}
