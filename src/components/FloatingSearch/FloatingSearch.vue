<script setup>

import {ref, watch} from "vue";
import axios from "axios";

const props = defineProps({
  show: Boolean
});

const emit = defineEmits(['close'])

const isShow = ref(props.show);

const resultsIsLoading = ref(false);

const term = ref("");

const results = ref([]);

watch(props, () => {
  isShow.value = true

  term.value = ''
  
  setTimeout(() => {
    document.querySelector('.search-input input').focus()
  }, 0)
})

const getResults = async (term) => {
  const api = "https://local.mm-laravel.com/api/t";

  if (term instanceof Event) {
    term = term.target?.value
  }

  let lastResponseLength = 0;

  
  resultsIsLoading.value = true;

  try {
    const { data } = await axios.get(api, {
      params: {
        term
      },
      onDownloadProgress: (progressEvent) => {
        const response = progressEvent.event.currentTarget.response;

        let progressResponse = lastResponseLength
          ? response.substring(lastResponseLength)
          : response;

        if (lastResponseLength === 0) {
          results.value = [];
        }

        lastResponseLength = response.length;

        try {
          const progressResponseAsJSON = JSON.parse(progressResponse);

          if (progressResponseAsJSON.length) {
            results.value = [
              ...results.value,
              ...progressResponseAsJSON
            ]
          }
        } catch (err) {}
      }
    })

    const d = data?.split('\n')
      .filter(r => !!r)
      .map(r => JSON.parse(r))
      .flat(1);

    if (!results.value.length) {
      results.value = d
    }

    if (!d.length) {
      results.value = []
    }

    resultsIsLoading.value = false
  } catch (err) {}
}

const boldSearchInput = (text) => {
  if (!text) {
    return;
  }
  
  const searchValue = term.value;
  const searchValueLowerCase = searchValue.toLowerCase();

  if (searchValueLowerCase) {
    const boldText = text.toLowerCase();
    const boldIndex = boldText.indexOf(searchValueLowerCase);
    const boldLength = searchValue.length;

    if (boldIndex !== -1) {
      const boldStart = boldIndex;
      const boldEnd = boldStart + boldLength;

      return text.slice(0, boldStart) + `<b class="text-decoration-underline">${text.slice(boldStart, boldEnd)}</b>` + text.slice(boldEnd);
    }
  }

  return text
}

window.addEventListener('keyup', (e) => {
  if (e.key === 'Escape') {
    isShow.value = false
    
    term.value = ''
    
    emit('close')
  }
})

const toggle = () => {
  isShow.value = !isShow.value
}

</script>

<template>
  <div class="floating-search-wrapper  w-100 h-100 top-0 left-0 position-fixed py-5" :class="`${isShow ? 'show' : ''}`">
    <div class="form-floating search-input w-75">
      <input class="form-control" type="search" placeholder=" " @input="getResults" v-model="term">
      <label> Search </label>
    </div>

    <div class="d-flex flex-column gap-2 w-75 bg-body mt-2 rounded border p-3 h-100 overflow-auto">
      <template v-for="result in results">
        <div class="bg-dark rounded p-2">
          <span class="small text-uppercase mb-2 text-light fw-bold"> {{ result.type }} </span>

          <div class="d-flex flex-wrap gap-2">
            <span v-html="boldSearchInput(result.name)"></span>
          </div>
          
          <p class="mb-0 small text-muted" v-html="boldSearchInput(result.description)"></p>
        </div>
      </template>

      <template v-if="resultsIsLoading">
        <p class="text-center mb-0">Loading...</p>
      </template>
    </div>
  </div>
</template>

<style lang="scss">

.z-index-2000 {
  z-index: 2000;
}

.floating-search-wrapper {
  background: #ffffff50;
  z-index: 2000;
  display: none;

  &.show {
    align-items: center;
    flex-direction: column;
    display: flex;
  }
}

</style>