import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Variables from "./components/variables";
import Editor from "./components/editor";
import { Files } from "./components/files";
import { EditorProvider } from "./context/editor/editor-provider";
import { IT_SUPPORT_SNIPPETS } from "./lib/const";
import { Toaster } from "@/components/ui/sonner";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "./components/ui/button";
import { useEditor } from "./context/editor/editor-context";
import { FloppyDiskIcon, Menu01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { toast } from "sonner";
import { ButtonGroup } from "./components/ui/button-group";
import { Separator } from "./components/ui/separator";

export default function App() {
  return (
    <EditorProvider>
      <main className="bg-background h-screen flex flex-col">
        <div className="flex gap-2 px-2 py-2">
          <FilePath />
          <ButtonGroup className="ml-auto">
            <ButtonGroup className="grow">
              <Button
                variant="outline"
                className="grow"
                onClick={() => {
                  toast("Saved successfully", {
                    icon: (
                      <HugeiconsIcon icon={FloppyDiskIcon} className="size-4" />
                    ),
                    position: "bottom-center",
                  });
                }}
              >
                <HugeiconsIcon icon={FloppyDiskIcon} className="size-4" />
              </Button>
              <Button variant="outline" className="grow">
                <HugeiconsIcon icon={Menu01Icon} className="size-4" />
              </Button>
            </ButtonGroup>
          </ButtonGroup>
        </div>
        <Separator />
        <ResizablePanelGroup orientation="horizontal">
          <ResizablePanel
            defaultSize={250}
            minSize={200}
            maxSize={300}
            className="p-2"
          >
            <Files data={IT_SUPPORT_SNIPPETS} />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel minSize="50%" className="px-2 py-2">
            <Editor />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel
            defaultSize={250}
            minSize={200}
            maxSize={300}
            className="p-2"
          >
            <Variables />
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
      <Toaster />
    </EditorProvider>
  );
}

export function FilePath() {
  const { filePath } = useEditor();
  const { fileName, folderName, rest } = filePath.reduce(
    (acc, segment, index) => {
      if (index === filePath.length - 1) {
        acc.fileName = segment;
      } else if (index === filePath.length - 2) {
        acc.folderName = segment;
      } else {
        acc.rest.push(segment);
      }
      return acc;
    },
    { fileName: "", folderName: "", rest: [] as string[] },
  );
  return (
    <Breadcrumb className="h-9 flex items-center px-2">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink className="select-none">Root</BreadcrumbLink>
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
                      <DropdownMenuItem key={index}>{segment}</DropdownMenuItem>
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
              <BreadcrumbLink className="select-none">
                {folderName}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="select-none">
            {fileName != "" ? filePath[filePath.length - 1] : "New Snippet"}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
