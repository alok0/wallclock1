export const cleanZoneName = (name: string) => {
  const segs = name.split(`/`, 2);
  if (segs.length < 2) {
    return name;
  }
  const newName = segs[1];
  return newName.replace(/[/_]/, " ");
};
