// TODO: Refactor into global import
import { isFolder, type FileSystemItem } from "@/features/files/types";

// TODO: refactor all of  these functions
export const getParentFolder = (
  items: FileSystemItem[],
  path: string[],
): FileSystemItem[] | null => {
  if (path.length === 0) return items;

  let current: FileSystemItem[] = items;

  for (let i = 0; i < path.length; i++) {
    const segment = path[i];
    const found = current.find((item) => item.name === segment);

    if (!found || !isFolder(found)) {
      return null;
    }

    current = found.files;
  }

  return current;
};

export const findItemByPath = (
  items: FileSystemItem[],
  path: string[],
): FileSystemItem | null => {
  if (path.length === 0) return null;

  let current: FileSystemItem[] = items;

  for (let i = 0; i < path.length - 1; i++) {
    const segment = path[i];
    const found = current.find((item) => item.name === segment);

    if (!found || !isFolder(found)) {
      return null;
    }

    current = found.files;
  }

  const lastSegment = path[path.length - 1];
  return current.find((item) => item.name === lastSegment) || null;
};

export const getAvailableName = (
  items: FileSystemItem[],
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
