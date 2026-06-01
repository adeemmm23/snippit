import SaveIndicator from "./save-indicator";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useFilesStore } from "@/stores/files/files-store";

export default function FilePath() {
  const activeFile = useFilesStore((state) => state.activeFile);

  const setCurrentWorkingFolder = useFilesStore(
    (state) => state.setCurrentFolder,
  );

  const { file, parenFolder, rest } = activeFile.reduce(
    (acc, segment, index) => {
      if (index === activeFile.length - 1) {
        acc.file = segment;
      } else if (index === activeFile.length - 2) {
        acc.parenFolder = segment;
      } else {
        acc.rest.push(segment);
      }
      return acc;
    },
    {
      file: null as string | null,
      parenFolder: null as string | null,
      rest: [] as string[],
    },
  );

  if (!file) {
    return (
      <Breadcrumb className="flex h-9 items-center px-2">
        <BreadcrumbList>
          <BreadcrumbItem className="select-none">
            <BreadcrumbLink>No file is opened</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }
  return (
    <Breadcrumb className="flex h-9 items-center px-2">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            onClick={() => setCurrentWorkingFolder([])}
            className="select-none"
          >
            Root
          </BreadcrumbLink>
        </BreadcrumbItem>
        {rest.length > 0 && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button size="icon-sm" variant="ghost">
                      <BreadcrumbEllipsis />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  }
                />
                <DropdownMenuContent align="start" className="w-50">
                  <DropdownMenuGroup>
                    {rest.map((segment, index) => (
                      <DropdownMenuItem
                        key={index}
                        render={
                          <BreadcrumbLink
                            title={segment}
                            className="truncate"
                            onClick={() =>
                              setCurrentWorkingFolder(
                                activeFile.slice(0, index - rest.length - 1),
                              )
                            }
                          >
                            {segment}
                          </BreadcrumbLink>
                        }
                      />
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
          </>
        )}
        {parenFolder && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                onClick={() => setCurrentWorkingFolder(activeFile.slice(0, -1))}
                className="select-none"
              >
                {parenFolder}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}
        <BreadcrumbSeparator />
        {file && (
          <BreadcrumbItem>
            <BreadcrumbPage
              onClick={() => setCurrentWorkingFolder(activeFile.slice(0, -1))}
              className="select-none"
            >
              {file}
              <SaveIndicator />
            </BreadcrumbPage>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
