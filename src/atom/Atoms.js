import { atom } from "recoil";

const listPageReloading = atom({
  key: "listPageReloading", // unique ID
  default: false, // default value
});

const focusNav = atom({
  key: "focusNav", // unique ID
  default: "", // default value (aka initial value)
});

export { listPageReloading, focusNav };
