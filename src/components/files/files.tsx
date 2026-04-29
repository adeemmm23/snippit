import Header from "./header";
import SearchBar from "./search-bar";
import Tree from "./tree";

export default function Files() {
  return (
    <div
      dir="ltr"
      className="border-border flex h-full w-full min-w-48 grow flex-col gap-2 rounded-md rounded-l-none border border-l-0 p-2"
    >
      <Header />
      <SearchBar />
      <Tree />
    </div>
  );
}
