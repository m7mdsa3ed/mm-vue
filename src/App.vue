<template>
  <div>
    <ReloadServiceWorkerVue/>
    <div
      v-if="$store.state.app.loading && $store.state.app.stopActions"
      class="position-absolute top-0 bottom-0 end-0 start-0 user-select-none d-flex justify-content-center align-items-center fade show"
      style="z-index: 2000; background-color: #00000030"
    >
      <div class="spinner-border spinner-border-sm" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <RouterView/>
  </div>
</template>

<script setup>
import {onBeforeMount, onMounted} from "vue";
import {useStore} from "vuex";
import ReloadServiceWorkerVue from "./components/ReloadServiceWorker.vue";

const {commit, dispatch, state} = useStore();

onBeforeMount(() => {
  commit("restoreState");
});

onMounted(() => {
  syncColorSchema();

  flexFont()

  dispatch("app/fetchAppInfo");

  if (state.auth.user) {
    dispatch("app/fetchAll");
  }
});

const changeSchema = (schema = "light") => {
  const html = document.documentElement;

  html.setAttribute("data-bs-theme", schema);

  const bodyBackgroundColor =
    getComputedStyle(html).getPropertyValue("--bs-body-bg");

  document
    .querySelector('meta[name="theme-color"]')
    .setAttribute("content", bodyBackgroundColor.trim());
};

const syncColorSchema = () => {
  const systemDarkMode = window.matchMedia("(prefers-color-scheme: dark)");

  systemDarkMode.addEventListener("change", (e) => {
    const schema = e.matches ? "dark" : "light";

    changeSchema(schema);
  });

  const schema = systemDarkMode.matches ? "dark" : "light";

  changeSchema(schema);

  dispatch("app/changeAppSchema", schema);

  window.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key == "Enter") {
      const element = e.target;

      // Get form from [form] attribute or the closest one
      const form = element.form || element.closest("form");

      form.dispatchEvent(new Event("submit"));
    }
  });
};

const flexFont = (ratio = 0.05) => {
  const cb = function () {
    const elements = document.querySelectorAll(".flex-font");

    elements.forEach(element => {
      const relFontsize = element.offsetWidth * ratio;

      element.style.fontSize = relFontsize + 'px';
    })
  };

  cb();
  
  window.addEventListener("resize", cb);
}
</script>
