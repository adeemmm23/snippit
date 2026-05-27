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

export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj)) as T;
};

export const isDeepEqual = <T>(obj1: T, obj2: T): boolean => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};
