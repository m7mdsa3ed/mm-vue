<template>
  <div
    class="modal fade"
    id="TransactionModal"
    tabindex="-1"
    aria-labelledby="TransactionModalLabel"
    aria-hidden="true"
    ref="TransactionModal"
    data-bs-backdrop="static"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <p class="fs-4 fw-light mb-0">Transaction</p>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <div class="modal-body">
          <Errors :errors="errors" v-if="errors" />

          <form @submit.prevent="save" id="transactionForm">
            <div class="d-flex flex-column gap-3">
              <div
                class="btn-group w-100"
                role="group"
                aria-label="Basic radio toggle button group"
              >
                <template
                  v-for="actionType in actionTypes"
                  :key="actionType.value"
                >
                  <input
                    type="radio"
                    class="btn-check"
                    v-model="transaction.action_type"
                    name="action_type"
                    :id="`actionType${actionType.name}`"
                    :value="actionType.value"
                    autocomplete="off"
                    required
                  />

                  <label
                    class="btn btn-dark"
                    :for="`actionType${actionType.name}`"
                  >
                    {{ actionType.name }}
                  </label>
                </template>
              </div>

              <div
                class="btn-group w-100"
                role="group"
                aria-label="Basic radio toggle button group"
                v-if="[4, 5, 6].includes(transaction.action_type)"
              >
                <template
                  v-for="action in [
                    { name: 'Income', value: 1 },
                    { name: 'Outcome', value: 2 },
                  ]"
                  :key="action.value"
                >
                  <input
                    type="radio"
                    class="btn-check"
                    v-model="transaction.action"
                    name="action"
                    :id="`action${action.name}`"
                    :value="action.value"
                    autocomplete="off"
                    required
                  />

                  <label class="btn btn-dark" :for="`action${action.name}`">{{
                    action.name
                  }}</label>
                </template>
              </div>

              <div class="row g-3">
                <div class="col-12 col-md-6">
                  <div class="form-floating">
                    <input
                      type="number"
                      placeholder="Amount"
                      v-model="transaction.amount"
                      class="form-control"
                      step="any"
                      required
                    />
                    <label> Amount</label>
                  </div>
                </div>

                <div class="col-12 col-md-6">
                  <div class="form-floating">
                    <select
                      class="form-select"
                      id="accountSelect"
                      v-model="transaction.account_id"
                      required
                    >
                      <option selected :value="undefined">
                        Select Account
                      </option>

                      <option
                        v-for="account in accounts"
                        :key="account.id"
                        :value="account.id"
                      >
                        {{ account.name }}
                      </option>
                    </select>
                    <label for="accountSelect">Account</label>
                  </div>
                </div>
              </div>

              <div class="form-floating">
                <input
                  type="date"
                  placeholder="Date"
                  v-model="transaction.created_at"
                  class="form-control"
                  required
                />
                <label> Date </label>
              </div>

              <div class="form-floating">
                <textarea
                  class="form-control"
                  placeholder="Description"
                  style="height: 100px"
                  v-model="transaction.description"
                ></textarea>
                <label>Description</label>
              </div>

              <div class="form-floating">
                <select
                  class="form-select"
                  id="categorySelect"
                  v-model="transaction.category_id"
                >
                  <option selected :value="undefined">Select Category</option>
                  <option
                    v-for="category in categories"
                    :key="category.id"
                    :value="category.id"
                  >
                    {{ category.name }}
                  </option>
                </select>
                <label for="categorySelect">Category</label>
              </div>

              <div class="form-floating" v-if="tags.length">
                <select
                  class="form-select"
                  style="min-height: 150px"
                  id="tagsSelect"
                  v-model="transaction.tag_ids"
                  multiple
                >
                  <option
                    v-for="tag in tags"
                    :key="tag.id"
                    :value="tag.id"
                    :selected="transaction.tag_ids?.includes(tag.id)"
                  >
                    {{ tag.name }}
                  </option>
                </select>

                <label for="tagsSelect">Tag</label>
              </div>
            </div>
          </form>
        </div>

        <div class="modal-footer">
          <button form="transactionForm" class="btn btn-dark w-100">
            <template v-if="!isLoading"> Save </template>
            <template v-else> Loading... </template>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Modal } from "bootstrap";
import { computed, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import Errors from "../../../components/Errors.vue";
import dayjs from "dayjs";

const emit = defineEmits(["newTransaction"]);

const props = defineProps({
  currentTransaction: {
    type: Object,
  },
});

const { state, dispatch } = useStore();

const transactionDefault = {
  action_type: 2,
  created_at: dayjs().format("YYYY-MM-DD"),
};

const transaction = ref(transactionDefault);

const actionTypes = [
  {
    name: "Income",
    value: 1,
  },
  {
    name: "Outcome",
    value: 2,
  },
  {
    name: "Loan",
    value: 4,
  },
  {
    name: "Debit",
    value: 5,
  },
  {
    name: "Hold",
    value: 6,
  },
];

const tags = computed(() => state.tags.tags);

const accounts = computed(() => state.accounts.data);

const categories = computed(() => state.categories.categories);

const isLoading = computed(() => state.transactions.loading);

const errors = computed(() => state.transactions.errors);

watch(
  () => props.currentTransaction,
  (currentTransaction) => {
    transaction.value = {
      ...currentTransaction,
    };

    transaction.value.tag_ids = transaction.value.tags?.map((tag) => tag.id);
  }
);

watch(
  () => transaction.value.action_type,
  (actionType) => {
    if ([1, 2].includes(actionType)) {
      transaction.value.action = actionType;
    }
  }
);

const save = async () => {
  await dispatch("transactions/save", {
    data: transaction.value,
  });

  if (!errors.value) {
    emit("newTransaction", transaction);

    const modal = Modal.getOrCreateInstance("#TransactionModal");

    modal.hide();
  }
};

onMounted(() => {
  document
    .querySelector("#TransactionModal")
    .addEventListener("hidden.bs.modal", () => {
      transaction.value = transactionDefault
    });
});
</script>