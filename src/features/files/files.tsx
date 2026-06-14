import CollectionSelector from "./components/collection-selector";
import SearchBar from "./components/search-bar";
import Tree from "./components/tree";

export default function Files() {
  return (
    <div
      dir="ltr"
      className="border-border flex h-full w-full min-w-48 grow flex-col gap-2 rounded-md rounded-l-none border border-l-0 py-2"
    >
      <CollectionSelector />
      <SearchBar />
      <Tree />
    </div>
  );
}
