import { RefreshDotIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { InputGroupAddon, InputGroupButton } from "@/components/ui/input-group";

type PasswordAddonProps = {
  onGenerate: (generatedPassword: string) => void;
  settings?: Record<string, string | number | boolean>;
};

export default function PasswordAddon({
  settings,
  onGenerate,
}: PasswordAddonProps) {
  return (
    <InputGroupAddon align="inline-end">
      <InputGroupButton
        variant="ghost"
        size="icon-xs"
        onClick={() =>
          onGenerate(
            generateRandomPassword(
              settings?.length as number,
              settings?.upperCase as boolean,
              settings?.lowerCase as boolean,
              settings?.numbers as boolean,
              settings?.special as boolean,
            ),
          )
        }
      >
        <HugeiconsIcon icon={RefreshDotIcon} className="size-4" />
      </InputGroupButton>
    </InputGroupAddon>
  );
}

const generateRandomPassword = (
  length: number = 12,
  upperCase: boolean = true,
  lowerCase: boolean = true,
  numbers: boolean = true,
  special: boolean = true,
) => {
  console.log({ length, upperCase, lowerCase, numbers, special });
  const lowerCaseString = "abcdefghijklmnopqrstuvwxyz";
  const upperCaseString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbersString = "0123456789";
  const specialStrings = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

  const allChars =
    (upperCase ? upperCaseString : "") +
    (lowerCase ? lowerCaseString : "") +
    (numbers ? numbersString : "") +
    (special ? specialStrings : "");
  let password = "";

  // Fill the remaining length with random characters from all sets
  for (let i = password.length; i < length; i++) {
    password += allChars.charAt(Math.floor(Math.random() * allChars.length));
  }

  // Shuffle the password to avoid predictable patterns
  return password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
};
