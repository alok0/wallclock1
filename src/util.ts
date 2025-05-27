export const requireTruthy = <T>(v: T) => {
  if (!v) {
    throw new Error("unexpected undefined value");
  }
  return v;
};
