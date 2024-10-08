<template>
  <div class="d-flex flex-column gap-3">
    <div>
      <div class="mb-3 d-flex gap-2 align-items-center justify-content-between">
        <p class="display-6 mb-0">Plans</p>

        <button class="btn btn-outline-danger" @click="load">
          <i class="fa-fw fas fa-refresh"></i>
        </button>
      </div>
    </div>

    <div class="mb-3">
      <label for="name" class="form-label">Name</label>
      <input
        type="text"
        class="form-control"
        id="name"
        v-model="name"
        placeholder="Enter name"
      />
    </div>

    <div class="mb-3">
      <label for="description" class="form-label">Description</label>
      <textarea
        type="text"
        class="form-control"
        id="description"
        v-model="description"
        placeholder="Enter description"
      />
    </div>

    <div>
      Items

      <template v-for="item in items" :key="item.id">
        <div
          class="mb-3 d-flex gap-2 align-items-center justify-content-between"
        >
          <input
            type="text"
            class="form-control"
            id="items"
            v-model="item.name"
            placeholder="Enter name"
          />

          <input
            type="text"
            class="form-control"
            id="items"
            v-model="item.description"
            placeholder="Enter description"
          />

          <input
            type="number"
            class="form-control"
            id="items"
            v-model="item.price"
            placeholder=" Enter price"
          />
        </div>
      </template>

      <button class="btn btn-primary" @click="addItem">Add Item</button>
    </div>

    <button class="btn btn-primary" @click="save">Create</button>

    Current Balance = {{ money(balance?.balanceByMainCurrency?.amount) }}

    <template v-for="plan in plans" :key="plan.id">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">{{ plan.name }}</h5>

          <p class="card-text">{{ plan.description }}</p>

          <table class="table table-sm">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Already Paid</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in plan.items" :key="item.id">
                <td>{{ item.name }}</td>
                <td>{{ money(item.price) }}</td>
                <td>{{ money(item.transactions?.reduce((a, b) => a + b.amount, 0)) }}</td>
                <td>
                  <input type="text" class="form-control" v-model="item.linkedTransactionIds" placeholder="Enter transaction ids" @change="updateLinkedTransactions(item)" />
                </td>
              </tr>

              <tr>
                <td>Total</td>
                <td>{{ money(plan.total_price) }}</td>
                <td>{{ money(plan.items.reduce((a, b) => a + b.transactions_total, 0)) }}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <button class="btn btn-primary" @click="editPlan(plan)">
        Edit
      </button>

      <button class="btn btn-primary" @click="deletePlan(plan.id)">
        Delete
      </button>
    </template>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { computed } from "vue";
import { useStore } from "vuex";
import { money } from "../../helpers";

const { state, dispatch } = useStore();

const plans = computed(() => {
  const plans = state.plans.data;

  return plans?.map((plan) => {
    return {
      ...plan,
      items: plan.items?.map((item) => {
        return {
          ...item,
          linkedTransactionIds: item.transactions.map((transaction) => transaction.id).join(","),
        }
      })
    }
  });
});

const load = () => {
  dispatch("plans/fetch");
};

const id = ref(null);
const name = ref(null);
const description = ref(null);
const items = ref([]);

const balance = computed(() => state.app.stats);

const save = () => {
  dispatch("plans/save", {
    id: id.value,
    name: name.value,
    description: description.value,
    items: items.value,
  });
};

const addItem = () => {
  items.value.push({
    name: "",
    description: "",
    price: "",
  });
};

const deletePlan = (id) => {
  dispatch("plans/delete", { plan: { id } });
};

const editPlan = (plan) => {
  id.value = plan.id;
  name.value = plan.name;
  description.value = plan.description;
  items.value = plan.items;
};

const updateLinkedTransactions = (item) => {
  const id = item.id

  const transactionIds = item.linkedTransactionIds.split(",").map(Number);

  dispatch("plans/linkTransactions", {
    plantItemId: id,
    transactions: transactionIds,
  });
}

onMounted(() => {
  load();
});
</script>

