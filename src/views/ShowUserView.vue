<!-- לא בימוש מכיוון שיש תצוגת טבלה -->
<template>
  <div class="home">
    <showUser/>
  </div>
  <h1>user list</h1>
</template>

<script>
import showUser from '@/components/ShowUsers.vue';

export default {
  name: 'ShowUser',
  components: {
    showUser
  }
}
</script>
