import { TypeBreakpoints, TypeMq } from "../types/globalStyles/globalStyles";

const breakpoints: TypeBreakpoints = [576, 768, 992, 1200, 1400];
export const mq: TypeMq = breakpoints.map(
  (bp) => `@media screen and (min-width : ${bp}px)`,
);
