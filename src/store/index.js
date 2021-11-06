import { createStore } from "vuex";

import accounts from "./modules/accounts";
import categories from "./modules/categories";

export default createStore({
  modules: {
    accounts,
    categories
  }
});
