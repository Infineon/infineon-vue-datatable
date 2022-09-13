<template>
  <div class="d-flex flex-row  h-100">
    <the-header />
    <router-view
      class="flex-grow-1"
    />
  </div>
</template>

<script setup>
import TheHeader from './components/global/TheHeader.vue';

</script>
