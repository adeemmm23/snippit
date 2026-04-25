import { Input } from "./input";
import { Output } from "./output";

export default function Editor() {
  return (
    <div className="flex h-full flex-col gap-2">
      <Input />
      <Output />
    </div>
  );
}
