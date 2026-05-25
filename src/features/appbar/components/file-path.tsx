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
import { useEditorStore } from "@/stores/editor/editor-store";
import { useFilesStore } from "@/stores/files/files-store";
import type { FileSystemItem } from "@/types/file-system-type";

export default function FilePath() {
  const activeFilePath = useFilesStore((state) => state.activeFilePath);

  const setCurrentWorkingFolder = useFilesStore(
    (state) => state.setCurrentWorkingFolder,
  );

  const { file, parenFolder, rest } = activeFilePath.reduce(
    (acc, segment, index) => {
      if (index === activeFilePath.length - 1) {
        acc.file = segment;
      } else if (index === activeFilePath.length - 2) {
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
                      <DropdownMenuItem key={index}>
                        <BreadcrumbLink
                          title={segment}
                          className="truncate"
                          onClick={() =>
                            setCurrentWorkingFolder(
                              activeFilePath.slice(0, index - rest.length - 1),
                            )
                          }
                        >
                          {segment}
                        </BreadcrumbLink>
                      </DropdownMenuItem>
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
                onClick={() =>
                  setCurrentWorkingFolder(activeFilePath.slice(0, -1))
                }
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
              onClick={() =>
                setCurrentWorkingFolder(activeFilePath.slice(0, -1))
              }
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

function SaveIndicator() {
  const activeFilePath = useFilesStore((state) => state.activeFilePath);
  const files = useFilesStore((state) => state.files);

  const activeFile = getFileContent(activeFilePath, files);
  const template = useEditorStore((state) => state.template);
  if (activeFile !== template) {
    return <span className="text-primary"> •</span>;
  }
}

// TODO: this is really bad, need to optimize this with a map or something
const getFileContent = (path: string[], files: FileSystemItem[]) => {
  let current = files;

  for (const segment of path) {
    const next = current.find((item) => item.name === segment);
    if (!next) {
      return null;
    }
    if (next.type === "file") {
      return next.content;
    }
    current = next.files;
  }

  return null;
};
