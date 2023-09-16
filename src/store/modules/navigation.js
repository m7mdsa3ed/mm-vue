import axios from "axios";
import store from "..";
import { getSettings, saveSettings, deploy } from "../../api/settings";
import { appInfo } from "../../api/app";
import router from "../../router";

export default {
  namespaced: true,

  state: {
    isOpen: false,
    links: [
      {
        name: "Dashboard",
        routeName: "home",
        icon: `<i class="icon fas fa-tachometer-alt"></i>`,
      },
      {
        name: "Transactions",
        routeName: "transactions",
        icon: `<i class="icon fas fa-dollar-sign"></i>`,
      },
      {
        name: "Accounts",
        routeName: "accounts",
        icon: `<i class="icon fas fa-file-alt"></i>`,
      },
      {
        name: "Categories",
        routeName: "categories",
        icon: `<i class="icon fas fa-th"></i>`,
      },
      {
        name: "Tags",
        routeName: "tags",
        icon: `<i class="icon fas fa-tags"></i>`,
      },
      {
        name: "Budget",
        routeName: "budget",
        icon: `<i class="icon fas fa-wallet"></i>`,
      },
      {
        name: "Profile",
        routeName: "profile",
        icon: `<i class="icon fas fa-user"></i>`,
      },
      {
        name: "Settings",
        routeName: "settings",
        icon: `<i class="icon fas fa-gear"></i>`,
        roles: ["manager"],
      },
    ],
  },

  mutations: {
    toggle(state) {
      state.isOpen = !state.isOpen;
    },
  },
};
