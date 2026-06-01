import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
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

type FilePathProps = {
  path: string[];
  onPathChange: (path: string[]) => void;
};

export default function FilePath({ path, onPathChange }: FilePathProps) {
  const { parenFolder, rest } = path.reduce(
    (acc, segment, index) => {
      if (index === path.length - 1) {
        acc.parenFolder = segment;
      } else {
        acc.rest.push(segment);
      }
      return acc;
    },
    {
      parenFolder: null as string | null,
      rest: [] as string[],
    },
  );

  return (
    <Breadcrumb className="flex h-8 items-center px-2">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            onClick={() => onPathChange([])}
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
                        key={segment}
                        render={
                          <BreadcrumbLink
                            title={segment}
                            className="truncate"
                            onClick={() => {
                              onPathChange(path.slice(0, index + 1));
                            }}
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
                onClick={() => onPathChange(path.slice(0, -1))}
                className="select-none"
              >
                {parenFolder}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
