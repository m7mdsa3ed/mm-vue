<script setup>

import {useStore} from "vuex";
import {computed} from "vue";
import ContactForm from "./Components/ContactForm.vue"

const {state, dispatch} = useStore();

const contacts = computed(() => state.contacts.data);

</script>

<template>
  <div>
    <div class="mb-3 d-flex gap-2 align-items-center justify-content-between">
      <p class="display-6 mb-0">Contacts</p>

      <button class="btn btn-outline-danger" @click="dispatch('contacts/fetch')">
        <i class="fa-fw fas fa-refresh"></i>
      </button>
    </div>

    <div class="d-flex flex-column gap-3">
      <div class="box bg-main">
        <button class="btn btn-sm btn-dark w-100" data-bs-target="#contactForm" data-bs-toggle="collapse">
          <i class="icon fas fa-plus"></i> Contact
        </button>
      </div>

      <div class="collapse" id="contactForm">
        <div class="box bg-main">
          <ContactForm/>
        </div>
      </div>

      <div class="table-responsive box bg-main">
        <table class="table align-middle table-borderless mb-0">
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="contact in contacts">
              <td>
                {{ contact.name }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>