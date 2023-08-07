<template>
  <div
    class="modal fade"
    id="AccountEditModal"
    tabindex="-1"
    aria-labelledby="AccountEditModalLabel"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content" v-if="account">
        <div class="modal-header">
          <p class="fs-4 fw-light mb-0">Account</p>

          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <div class="modal-body">
          <form @submit.prevent="save" id="accountSaveForm">
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                placeholder=" "
                v-model="account.name"
              />
              <label> Account Name </label>
            </div>

            <div class="form-floating mb-3">
              <select
                class="form-select"
                id="floatingSelect"
                v-model="account.type_id"
                aria-label="Floating label select example"
                form="accountForm"
                required
              >
                <option selected :value="undefined">
                  Open this select menu
                </option>
                <option
                  v-for="accountType in accountTypes"
                  :key="accountType.id"
                  :value="accountType.id"
                >
                  {{ accountType.name }}
                </option>
              </select>

              <label> Type </label>
            </div>

            <div class="form-floating mb-3">
              <select
                class="form-select"
                id="floatingSelect"
                v-model="account.currency_id"
                aria-label="Floating label select example"
                required
              >
                <option selected>Open this select menu</option>

                <option
                  v-for="currency in currencies"
                  :key="currency.id"
                  :value="currency.id"
                >
                  {{ currency.name }}
                </option>
              </select>

              <label> Currency </label>
            </div>

            <div class="mb-3">
              <p class="lead">Account Information</p>

              <div v-for="detail in account.details ?? []" :key="detail">
                <div class="input-group">
                  <div class="form-floating">
                    <input
                      type="text"
                      v-model="detail.value"
                      class="form-control"
                      placeholder=" "
                    />
                    <label> {{ detail.key }} </label>
                  </div>

                  <button
                    type="button"
                    @click="removeDetail(detail)"
                    class="btn btn-dark border"
                  >
                    <span role="button" class="btn-close"></span>
                  </button>
                </div>
              </div>

              <hr />

              <div class="input-group">
                <div class="form-floating">
                  <input
                    type="text"
                    v-model="detailKey"
                    class="form-control"
                    placeholder=" "
                  />
                  <label> Key </label>
                </div>
              </div>
            </div>

            <button
              type="button"
              @click="newDetail"
              class="btn btn-dark w-100 border"
            >
              Add New Information
            </button>
          </form>
        </div>

        <div class="modal-footer">
          <button class="btn btn-dark border w-100">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formToJSON } from "axios";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { formDataToJson } from "../../helpers";

const { state, dispatch } = useStore();

const props = defineProps({
  account: {
    type: Object,
    default: null,
  },

  modal: {
    type: Object,
    default: null,
  },
});

const currencies = computed(() => state.currencies.data);

const accountTypes = computed(() => state.accounts.types);

const detailKey = ref(null);

const newDetail = () => {
  const { account } = props;

  if (!detailKey.value) {
    return;
  }

  account.details = [
    ...(account.details ?? []),
    {
      key: detailKey.value,
      value: "",
    },
  ];

  detailKey.value = null;
};

const removeDetail = (detail) => {
  const { account } = props;

  account.details = account.details.filter((d) => d !== detail);
};

const save = async () => {
  const { account, modal } = props;

  await dispatch("accounts/save", { account });

  modal.hide();
};
</script>