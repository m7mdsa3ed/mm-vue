<template>
  <div>
    <p class="lead fw-bold">Categories Summary</p>

    <div class="d-flex flex-column w-100 gap-1 box bg-main">
      <template v-for="category in categoriesSummary" :key="category.id">
        <div class="d-flex justify-content-between gap-2">
          <p class="mb-0">
            {{ category.name ?? "Other" }}
          </p>

          <div class="d-flex align-items-center gap-1">
            <span class="text-success px-1 small rounded border" v-if="category.inAmount">
              {{ money(category.inAmount, category.currencySlug) }}
            </span>
            <span class="text-danger px-1 small rounded border" v-if="category.outAmount">
              {{ money(category.outAmount, category.currencySlug) }}
            </span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { money } from "../../../helpers";

defineProps(["categoriesSummary", "currencySlug"]);
</script>