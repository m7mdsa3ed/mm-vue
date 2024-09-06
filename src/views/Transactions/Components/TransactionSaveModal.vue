<template>
  <div class="modal fade" id="TransactionModal" tabindex="-1" aria-labelledby="TransactionModalLabel" aria-hidden="true"
    ref="TransactionModal" data-bs-backdrop="static">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <p class="fs-4 fw-light mb-0">Transaction</p>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <div class="modal-body">
          <p class="text-danger" v-if="savingError">
            {{ savingError }}
          </p>

          <form @submit.prevent="save" id="transactionForm">
            <div class="d-flex flex-column gap-3">
              <div class="btn-group w-100" role="group" aria-label="Basic radio toggle button group">
                <template v-for="actionType in actionTypes" :key="actionType.value">
                  <input type="radio" class="btn-check" v-model="transaction.action_type" name="action_type"
                    :id="`actionType${actionType.name}`" :value="actionType.value" autocomplete="off" required />

                  <label class="btn btn-dark border" :for="`actionType${actionType.name}`">
                    {{ actionType.name }}
                  </label>
                </template>
              </div>

              <div class="btn-group w-100" role="group" aria-label="Basic radio toggle button group"
                v-if="[4, 5, 6, 7].includes(transaction.action_type)">
                <template v-for="action in [
                  { name: 'In', value: 1 },
                  { name: 'Out', value: 2 },
                ]" :key="action.value">
                  <input type="radio" class="btn-check" v-model="transaction.action" name="action"
                    :id="`action${action.name}`" :value="action.value" autocomplete="off" required />

                  <label class="btn btn-dark border" :for="`action${action.name}`">{{
                    action.name
                  }}</label>
                </template>
              </div>

              <div class="row g-3">
                <div class="col-12 col-md-6">
                  <div class="form-floating">
                    <input type="number" placeholder="Amount" v-model="transaction.amount" class="form-control"
                      step="any" required />
                    <label> Amount</label>
                  </div>
                </div>

                <div class="col-12 col-md-6">
                  <div class="form-floating">
                    <select class="form-select" id="accountSelect" v-model="transaction.account_id" required>
                      <option selected :value="undefined">
                        Select Account
                      </option>

                      <option v-for="account in accounts" :key="account.id" :value="account.id">
                        {{ account.name }}
                      </option>
                    </select>
                    <label for="accountSelect">Account</label>
                  </div>
                </div>
              </div>

              <div class="form-floating">
                <select class="form-select" id="categorySelect" v-model="transaction.category_id" @change="loadDescriptionSuggestions">
                  <option selected :value="undefined">Select Category</option>
                  <option v-for="category in categories" :key="category.id" :value="category.id">
                    {{ category.name }}
                  </option>
                </select>
                <label for="categorySelect">Category</label>
              </div>

              <div class="form-floating" v-if="contactRequired">
                <select class="form-select" id="contactSelect" v-model="transaction.contact_id" required>
                  <option selected :value="undefined">
                    Select Contact
                  </option>

                  <option v-for="contact in contacts" :key="contact.id" :value="contact.id">
                    {{ contact.name }}
                  </option>
                </select>

                <label for="contactSelect">Contact</label>
              </div>

              <div>
                <p class="d-inline-flex mb-0 gap-1">
                  <a class="w-100 btn" data-bs-toggle="collapse" href="#transactionAdvancedDetails" role="button"
                    aria-expanded="false" aria-controls="transactionAdvancedDetails">
                    Advanced Details <i class="fa-fw fas fa-chevron-down"></i>
                  </a>
                </p>

                <div class="collapse" id="transactionAdvancedDetails">
                  <div class="d-flex flex-column gap-3 mt-3">

                    <div class="form-floating">
                      <input type="date" placeholder="Date" v-model="transaction.created_at" class="form-control"
                        required />
                      <label> Date </label>
                    </div>

                    <div class="d-flex flex-column gap-3">
                      <div class="form-floating">
                        <textarea class="form-control" placeholder="Description" style="height: 100px"
                          v-model="transaction.description"></textarea>
                        <label>Description</label>
                      </div>

                      <div class="d-flex gap-1 flex-wrap" v-if="descriptionSuggestions.length">
                        <span
                          v-for="descriptionSuggestion in descriptionSuggestions"
                          :key="descriptionSuggestion"
                          class="badge bg-secondary"
                          type="button"
                          @click="transaction.description = descriptionSuggestion"
                        >
                          {{ descriptionSuggestion }}
                        </span>
                      </div>
                    </div>

                    <div class="form-floating" v-if="tags.length">
                      <select class="form-select" style="min-height: 150px" id="tagsSelect"
                        v-model="transaction.tag_ids" multiple>
                        <option v-for="tag in tags" :key="tag.id" :value="tag.id"
                          :selected="transaction.tag_ids?.includes(tag.id)">
                          {{ tag.name }}
                        </option>
                      </select>

                      <label for="tagsSelect">Tag</label>
                    </div>

                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" v-model="transaction.is_countable"
                        id="isProfitableCheck" :checked="transaction.is_countable">

                      <label class="form-check-label d-flex align-items-center gap-2" for="isProfitableCheck">
                        <span>
                          Should be counted
                        </span>

                        <i 
                          class="fa-fw fas fa-sm fa-info-circle"
                          data-bs-toggle="tooltip"
                          data-bs-title="If checked, this transaction will be counted in the balance."
                          data-bs-delay="200"
                        ></i>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div class="modal-footer">
          <button form="transactionForm" class="btn btn-dark border w-100" :disabled="isSaving">
            {{ isSaving ? "Saving..." : "Save" }}
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
import dayjs from "dayjs";
import { getDescriptionSuggestions } from "../../../api/transactions";
import { useLazyCallback } from "../../../hooks/useLazyCallback";

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
  is_countable: true
};

const transaction = ref(transactionDefault);

const actionTypes = [
  {
    name: "Income",
    value: 1,
  },
  {
    name: "Expenses",
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
  {
    name: "Adjust",
    value: 7,
  },
];

const tags = computed(() => state.tags.tags);

const accounts = computed(() => state.accounts.data);

const categories = computed(() => state.categories.categories);

const contacts = computed(() => state.contacts.data);

const contactRequired = computed(() => {
  return [4, 5, 6].includes(transaction.value.action_type);
})

const isOpen = ref(false);

const descriptionSuggestions = ref([]);

const [saving, { loading: isSaving, error: savingError }] = useLazyCallback(async (transaction) => {
  await dispatch("transactions/save", {
    data: transaction,
  });
});

watch(
  () => props.currentTransaction,
  (currentTransaction) => {
    transaction.value = {
      ...currentTransaction,
      created_at: dayjs(currentTransaction.created_at).format("YYYY-MM-DD"),
    };

    transaction.value.tag_ids = transaction.value.tags?.map((tag) => tag.id);

    transaction.value.contact_id = transaction.value.contact?.id;
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
  await saving(transaction.value)

  if (!savingError.value) {
    emit("newTransaction", transaction);

    const modal = Modal.getOrCreateInstance("#TransactionModal");

    modal.hide();
  }
};

const loadDescriptionSuggestions = async () => {
  descriptionSuggestions.value = await getDescriptionSuggestions(transaction.value.category_id);
}

watch(isOpen, (isOpen) => {
  if (isOpen) {
    loadDescriptionSuggestions();
  }
});

onMounted(() => {
  document
    .querySelector("#TransactionModal")
    .addEventListener("hidden.bs.modal", () => {
      transaction.value = transactionDefault

      isOpen.value = false;
    });

  document
    .querySelector("#TransactionModal")
    .addEventListener("shown.bs.modal", () => {
      isOpen.value = true;
    });
});
</script>