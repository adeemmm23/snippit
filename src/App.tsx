import { SnippetEditor } from "@/components/snippet-editor";
// import {
//   Menubar,
//   MenubarContent,
//   MenubarGroup,
//   MenubarItem,
//   MenubarMenu,
//   MenubarSeparator,
//   MenubarShortcut,
//   MenubarTrigger,
// } from "@/components/ui/menubar";

export default function App() {
  return (
    <>
      {/* <Menubar className="mx-1 my-1">
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarGroup>
              <MenubarItem>
                New Tab <MenubarShortcut>⌘T</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>New Window</MenubarItem>
            </MenubarGroup>
            <MenubarSeparator />
            <MenubarGroup>
              <MenubarItem>Share</MenubarItem>
              <MenubarItem>Print</MenubarItem>
            </MenubarGroup>
          </MenubarContent>
        </MenubarMenu>
      </Menubar> */}
      <SnippetEditor />
    </>
  );
}
