import { atom } from "recoil";

const selectedAtom = atom({
  key: "selectedAtom",
  default: "--Choose One--",
});

export default selectedAtom;
