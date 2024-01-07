<template>
 
 <main class="mainCenter">
                <div id="mainCenterTxt">
                  <h1 v-if="username !== ''">שלום {{ username }}</h1>
                    <h1>חידון ההלכה הארצי לנוער</h1>
                    <h2>הלכות ברכות \ קיץ תשפ"ג</h2>
                    <button @click="this.$router.push('/Register')">הירשמו עכשיו</button> <!-- js -->
                    <p>ההרשמה מסתיימת ב א' תמוז תשפ"ג</p>

                </div>
                <div id="mainCenterImgBox">
                    <img id="mainCenterImg" src="" height="500px" alt=""> <!-- js -->
                </div>
            </main>
     
    
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    // msg: String
  },
  data() {
    return {
      username: '',
    };
  },
  mounted() {
    let firstName = localStorage.getItem('first-name')
    let lastName = localStorage.getItem('last-name')
    if (firstName !== null && lastName !== null) {
      this.username = firstName + ' ' + lastName
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
