import axios from "axios";
import store from "..";
import {getSettings, saveSettings, deploy} from "../../api/settings";
import {appInfo} from "../../api/app";
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
        routeName: "Transactions",
        icon: `<i class="icon fas fa-dollar-sign"></i>`,
      },
      {
        name: "Accounts",
        routeName: "Accounts",
        icon: `<i class="icon fas fa-file-alt"></i>`,
      },
      {
        name: "Categories",
        routeName: "Categories",
        icon: `<i class="icon fas fa-th"></i>`,
      },
      {
        name: "Tags",
        routeName: "Tags",
        icon: `<i class="icon fas fa-tags"></i>`,
      },
      {
        name: "Budget",
        routeName: "Budget",
        icon: `<i class="icon fas fa-wallet"></i>`,
      },
      {
        name: "Subscriptions",
        routeName: "Subscriptions",
        icon: `<i class="icon fas fa-clock"></i>`,
      },
      {
        name: "Contacts",
        routeName: "Contacts",
        icon: `<i class="icon fas fa-address-book"></i>`,
      },
      {
        name: "Profile",
        routeName: "Profile",
        icon: `<i class="icon fas fa-user"></i>`,
      },
      {
        name: "Settings",
        routeName: "Settings",
        icon: `<i class="icon fas fa-gear"></i>`,
        roles: ["manager"],
      },
      {
        name: "Notifications",
        routeName: "Notifications",
        icon: `<i class="icon fas fa-bell"></i>`,
      },
    ],
  },

  mutations: {
    toggle(state) {
      state.isOpen = !state.isOpen;
    },
  },
};
