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
import { useEditor } from "@/context/editor/editor-context";

export function FilePath() {
  const { activeFilePath, setCurrentWorkingFolder } = useEditor();
  const { fileName, folderName, rest } = activeFilePath.reduce(
    (acc, segment, index) => {
      if (index === activeFilePath.length - 1) {
        acc.fileName = segment;
      } else if (index === activeFilePath.length - 2) {
        acc.folderName = segment;
      } else {
        acc.rest.push(segment);
      }
      return acc;
    },
    { fileName: "", folderName: "", rest: [] as string[] },
  );
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
        {rest.length != 0 && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button size="icon-sm" variant="ghost">
                    <BreadcrumbEllipsis />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-50">
                  <DropdownMenuGroup>
                    {rest.map((segment, index) => (
                      <DropdownMenuItem key={index}>
                        <BreadcrumbLink
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
        {folderName != "" && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                onClick={() =>
                  setCurrentWorkingFolder(activeFilePath.slice(0, -1))
                }
                className="select-none"
              >
                {folderName}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="select-none">
            {fileName != ""
              ? activeFilePath[activeFilePath.length - 1]
              : "New Snippet"}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
