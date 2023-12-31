<template>
  <div class="d-flex flex-column gap-3">
    <div>
      <p class="lead fw-bold">
        Subscriptions expiring soon

        <span title="Subscriptions about to expire">
          <i class="fa-fw fas fa-exclamation-triangle"></i>
        </span>
      </p>

      <div class="d-flex flex-column gap-2">
        <div class="box bg-main d-flex justify-content-between">
          <template
            v-for="subscription in subscriptions"
            :key="subscription.id"
          >
            <div>
              <div class="d-flex gap-2 align-items-center">
                {{ subscription.name }}

                <div class="d-flex gap-2 align-items-center">
                  <span
                    v-if="subscription.auto_renewal"
                    class="small text-uppercase fw-bold badge bg-success"
                    title="Auto renewal"
                  >
                    <i class="fa-fw fas fa-refresh"></i>
                  </span>

                  <span
                    v-if="!subscription.can_cancel"
                    class="small text-uppercase fw-bold badge bg-secondary"
                    title="Un-cancelable"
                  >
                    <i class="fa-fw fas fa-cancel"></i>
                  </span>

                  <span
                    v-if="!subscription.is_active"
                    class="small text-uppercase fw-bold badge bg-danger"
                    title="Un-cancelable"
                  >
                    <i class="fa-fw fas fa-lock"></i>
                  </span>
                </div>
              </div>

              <p class="small text-muted mb-0">
                {{ subscription.auto_renewal ? 'Renewal' : "Expiration" }} date: {{ (subscription.expires_at) }}
              </p>

              <p class="small text-muted mb-0">
                Remaining Days: {{ subscription.remaining_days }} day(s)
              </p>
            </div>

            <div>
              {{ money(subscription.amount) }}
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import {money} from "../../../helpers.js";

defineProps(["subscriptions"]);
</script>