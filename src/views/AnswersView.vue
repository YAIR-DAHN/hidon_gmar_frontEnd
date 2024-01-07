<template>
  <div class="Answers">
    <tableAnswers/>
  </div>
</template>
<script>
import tableAnswers from '@/components/admin/tebleAnswer.vue'
export default {
  name: 'AnswersView',
  components: {
    tableAnswers
  }
}
</script>