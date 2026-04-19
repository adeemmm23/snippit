import { HugeiconsIcon } from "@hugeicons/react";
import { InputGroupAddon, InputGroupButton } from "../ui/input-group";
import { RefreshDotIcon } from "@hugeicons/core-free-icons";

type PasswordAddonProps = {
  onGenerate: (generatedPassword: string) => void;
};

export default function PasswordAddon({ onGenerate }: PasswordAddonProps) {
  return (
    <InputGroupAddon align="inline-end">
      <InputGroupButton
        variant="ghost"
        size="icon-xs"
        onClick={() => onGenerate(generateRandomPassword())}
      >
        <HugeiconsIcon icon={RefreshDotIcon} className="size-4" />
      </InputGroupButton>
    </InputGroupAddon>
  );
}

const generateRandomPassword = (length: number = 12) => {
  const lowerCase = "abcdefghijklmnopqrstuvwxyz";
  const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digits = "0123456789";
  const specialChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

  // Ensure the password includes at least one character from each set
  const allChars = lowerCase + upperCase + digits + specialChars;
  let password = "";
  password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
  password += upperCase[Math.floor(Math.random() * upperCase.length)];
  password += digits[Math.floor(Math.random() * digits.length)];
  password += specialChars[Math.floor(Math.random() * specialChars.length)];

  // Fill the remaining length with random characters from all sets
  for (let i = password.length; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // Shuffle the password to avoid predictable patterns
  return password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
};
