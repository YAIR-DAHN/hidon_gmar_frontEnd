<template>
    <div class="statistics">
      <statistic/>
    </div>
  </template>
  <script>
  import statistic from '@/components/admin/statistics.vue';
  export default {
    name: 'statisticView',
    components: {
      statistic
    }
  }
  </script>