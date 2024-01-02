<template>
  <div class="home">
    <!-- <showUser/> -->
    <HomePageMain/>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import HomePageMain from '@/components/HomePageMain.vue';
import showUser from '@/components/ShowUsers.vue';


export default {
  name: 'HomeView',
  components: {
    HomePageMain,
    showUser

  }
}
</script>
