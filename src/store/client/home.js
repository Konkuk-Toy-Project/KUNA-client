import axios from "axios";
import { selector } from "recoil";

export const itemState = selector({
  key: "itemState",
  get: async () => {
    const data = await axios
      .get("http://localhost:8080/item")
      .then((response) => response.data);
    return data;
  },
});
