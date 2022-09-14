import { start } from "./";

declare global {
  interface Window {
    MdBook: object;
  }
}

window.MdBook = {
  start
};
