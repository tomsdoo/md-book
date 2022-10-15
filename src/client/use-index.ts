import { start } from "./";
import { theme } from "./themes";

declare global {
  interface Window {
    MdBook: object;
  }
}

window.MdBook = {
  start,
  theme,
};
