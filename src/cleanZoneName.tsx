import { requireTruthy } from "./util";

export const cleanZoneName = (name: string) => {
  const segs = name.split(`/`, 2);
  if (segs.length < 2) {
    return name;
  }
  const newName = requireTruthy(segs[1]);
  return newName.replace(/[/_]/, " ");
};
