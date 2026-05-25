import { RefreshDotIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { InputGroupAddon, InputGroupButton } from "@/components/ui/input-group";

type PasswordAddonProps = {
  onGenerate: (generatedPassword: string) => void;
  options?: {
    length?: number;
    upperCase?: boolean;
    lowerCase?: boolean;
    numbers?: boolean;
    specials?: boolean;
  };
};

export default function PasswordHelper({
  onGenerate,
  options,
}: PasswordAddonProps) {
  return (
    <InputGroupAddon align="inline-end">
      <InputGroupButton
        variant="ghost"
        size="icon-xs"
        onClick={() =>
          onGenerate(
            generateRandomPassword(
              options?.length ?? 12,
              options?.upperCase ?? true,
              options?.lowerCase ?? true,
              options?.numbers ?? true,
              options?.specials ?? false,
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
  length: number,
  upperCase: boolean,
  lowerCase: boolean,
  numbers: boolean,
  specials: boolean,
) => {
  const lowerCaseString = "abcdefghijklmnopqrstuvwxyz";
  const upperCaseString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbersString = "0123456789";
  const specialStrings = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

  const allChars =
    (upperCase ? upperCaseString : "") +
    (lowerCase ? lowerCaseString : "") +
    (numbers ? numbersString : "") +
    (specials ? specialStrings : "");

  let password = "";

  for (let i = password.length; i < length; i++) {
    password += allChars.charAt(Math.floor(Math.random() * allChars.length));
  }

  return password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
};
