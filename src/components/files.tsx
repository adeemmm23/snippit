import Header from "./for_files/header";
import SearchBar from "./for_files/search-bar";
import Tree from "./for_files/tree";

export type FileSystemItem = {
  [key: string]: string | FileSystemItem;
};

interface FilesProps {
  data: FileSystemItem;
}

export function Files({ data }: FilesProps) {
  return (
    <div dir="ltr" className="flex h-full min-w-48 grow flex-col gap-2">
      <Header />
      <SearchBar />
      <Tree data={data} />
    </div>
  );
}
