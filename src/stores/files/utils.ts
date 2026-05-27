import { type NodeType } from "@/types/node.types";

export const getAvailableName = (
  items: NodeType[],
  baseName: string,
): string => {
  if (!items.find((item) => item.name === baseName)) {
    return baseName;
  }

  let counter = 1;
  let finalName = baseName;

  while (items.find((item) => item.name === finalName)) {
    finalName = `${baseName} ${counter}`;
    counter++;
  }

  return finalName;
};
