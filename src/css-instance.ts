/* eslint-disable @typescript-eslint/unbound-method */
import createEmotion from "@emotion/css/create-instance";

const instance = createEmotion({
  key: "wc",
});

export const flush = instance.flush;
export const hydrate = instance.hydrate;
export const cx = instance.cx;
export const merge = instance.merge;
export const getRegisteredStyles = instance.getRegisteredStyles;
export const injectGlobal = instance.injectGlobal;
export const keyframes = instance.keyframes;
export const css = instance.css;
export const sheet = instance.sheet;
export const cache = instance.cache;
