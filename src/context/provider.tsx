import { FilesProvider } from "./files/files-provider";

import { TooltipProvider } from "@/components/ui/tooltip";

type Props = {
  children: React.ReactNode;
};

export default function Provider({ children }: Props) {
  return (
    <FilesProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </FilesProvider>
  );
}
