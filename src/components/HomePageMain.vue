<template>
 
 <main class="mainCenter">
                <div id="mainCenterTxt">
                    <h1>חידון ההלכה הארצי לנוער</h1>
                    <h2>הלכות ברכות \ קיץ תשפ"ג</h2>
                    <button id="registerButton">הירשמו עכשיו</button> <!-- js -->
                    <p>ההרשמה מסתיימת ב א' תמוז תשפ"ג</p>

                </div>
                <div id="mainCenterImgBox">
                    <img id="mainCenterImg" src="" height="500px" alt=""> <!-- js -->
                </div>
            </main>
            <router-link to="/login">login</router-link>
            <router-link to="/about">About</router-link>
            <router-link to="/">Home</router-link>
            <router-view/>
    
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    // msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
