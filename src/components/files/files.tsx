import Header from "./header";
import SearchBar from "./search-bar";
import Tree from "./tree";

export default function Files() {
  return (
    <div dir="ltr" className="flex h-full min-w-48 grow flex-col gap-2">
      <Header />
      <SearchBar />
      <Tree />
    </div>
  );
}
