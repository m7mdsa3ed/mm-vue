<template>
  <div>
    <div class="mb-3">
      <p class="display-6">Subscriptions</p>
    </div>

    <div class="box bg-main mb-3">
      <button
        class="btn btn-sm btn-dark w-100"
        data-bs-toggle="modal"
        data-bs-target="#SubscriptionModal"
        ref="SubscriptionModalButton"
      >
        <i class="icon fas fa-plus"></i>
        Subscription
      </button>
    </div>

    <div class="table-responsive box bg-main">
      <table class="table align-middle table-borderless mb-0">
        <thead>
          <tr>
            <th>Name</th>
            <th class="text-end">Amount</th>
            <th class="text-end">Expires Date (In)</th>
          </tr>
        </thead>

        <tbody>
          <template
            v-for="subscription in subscriptions.data"
            :key="subscription.id"
          >
            <tr>
              <td>
                <p class="mb-0">
                  {{ subscription.name }}
                </p>
              </td>

              <td class="text-end">
                {{ $fn.money(subscription.amount) }}
              </td>

              <td class="text-end">
                {{ $date(subscription.expires_at).format("LL") }} ({{
                  $date(subscription.expires_at).fromNow("LLL")
                }})
              </td>

              <td width="1">
                <div class="dropdown">
                  <span role="button" data-bs-toggle="dropdown">
                    <i class="fa-fw fas fa-ellipsis-v"></i>
                  </span>

                  <ul
                    class="
                      dropdown-menu dropdown-menu-end dropdown-menu-custom
                      mx-0
                    "
                    style="width: 220px"
                  >
                    <li>
                      <a
                        class="dropdown-item"
                        href=""
                        @click.prevent="
                          setSubscriptionOpenModal(subscription, 'edit')
                        "
                      >
                        <span> Edit </span>
                      </a>
                    </li>

                    <li>
                      <a
                        class="dropdown-item"
                        href=""
                        @click.prevent="renewSubscription(subscription)"
                      >
                        <span> Renew </span>
                      </a>
                    </li>

                    <li><hr class="dropdown-divider" /></li>

                    <li>
                      <a
                        class="dropdown-item text-danger"
                        href=""
                        @click.prevent="removeSubscription(subscription)"
                      >
                        <span> Delete </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>

      <div class="d-flex justify-content-start">
        <Paginator :data="subscriptions" @change="fetch" />
      </div>
    </div>

    <SubscriptionModal
      :modal="this.modals.SubscriptionModal?.instance"
      :subscription="this.modals.SubscriptionModal?.data"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Paginator from "@/components/Paginator";
import SubscriptionModal from "@/components/Subscriptions/SubscriptionModal";

import { Modal } from "bootstrap";
export default {
  components: {
    SubscriptionModal,
    Paginator,
  },

  data() {
    return {
      modals: {
        activeModal: null,
      },
    };
  },

  computed: {
    ...mapState({
      subscriptions: (state) => state.subscriptions.data,
    }),
  },

  mounted() {
    document.querySelectorAll(".modal").forEach((modalElement) => {
      this.modals[modalElement.id] = { instance: new Modal(modalElement) };

      modalElement.addEventListener("hide.bs.modal", () => {
        this.modals[modalElement.id].data = undefined;
      });
    });
  },

  methods: {
    fetch(url = null) {
      this.$store.dispatch("subscriptions/fetch", { url });
    },

    setSubscriptionOpenModal(data) {
      const modal = this.modals.SubscriptionModal;
      const modalName = "SubscriptionModal";

      modal.instance.show();

      modal.data = { ...data };

      this.modals.activeModal = modalName;
    },

    renewSubscription(subscription) {
      this.$store.dispatch("subscriptions/renew", { subscription });
    },

    removeSubscription(subscription) {
      if (confirm("Are you sure you want to delete this subscription?")) {
        this.$store.dispatch("subscriptions/delete", {
          subscription,
        });
      }
    },
  },
};
</script>