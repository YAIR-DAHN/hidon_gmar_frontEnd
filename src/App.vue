
import router from './router';
<template>
  <nav>
    <a href="#"><img src="./assets/logo.png" alt="" height="85px"></a>
    <router-link to="/">בית</router-link> |
    <router-link to="/login" >כניסה</router-link> |
    <router-link to="/Register" >הרשמה</router-link> |
    <router-link to="/about" v-if="this.userRole === 'admin'">משתמשים</router-link> |
    <router-link to="/addTest" v-if="this.userRole === 'admin'">יצירת מבחן</router-link> |
    <router-link to="/tests" v-if="this.userRole === 'admin'">הצגת מבחנים</router-link> |
    <router-link to="/addQuest" v-if="this.userRole === 'admin'">יצירת שאלות</router-link> |
    <router-link to="/showQuests" v-if="this.userRole === 'admin'">הצגת שאלות</router-link> |
    <router-link to="/testing" v-if="this.username !== ''">ביצוע מבחנים</router-link> | 
    <router-link to="/showAnswers" v-if="this.userRole === 'admin'">הצגת תשובות המשתמשים</router-link> |
    <router-link to="/statistics" v-if="this.userRole === 'admin'">סטטיסיקת כניסות</router-link> 
    <div>
      <button @click="this.$router.push('/login')" v-if="this.username == ''" >כניסה</button>
      <button @click="this.$router.push('/Register')" v-if="this.username == ''" >הרשמה</button>
      <button @click="this.logOut()" v-if="this.username !== ''">יציאה</button>
      <button @click="this.$router.push('/Profile')" v-if="username !== ''">{{ username }}</button>
    </div>
    <!-- <router-link to="/showUser">show user</router-link> -->
  </nav>
  <router-view />
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
      username: '',
      userRole: '',
    };
  },
  methods: {
    logOut() {
      localStorage.removeItem('token')
      localStorage.removeItem('id')
      localStorage.removeItem('first-name')
      localStorage.removeItem('last-name')
      localStorage.removeItem('phone')
      localStorage.removeItem('email')
      localStorage.removeItem('role')
      this.$router.push('/')
      window.location.reload()
    }
  },
  mounted() {
    let firstName = localStorage.getItem('first-name')
    let lastName = localStorage.getItem('last-name')
    if (firstName !== null && lastName !== null) {
      this.username = firstName + ' ' + lastName
      this.userRole = localStorage.getItem('role')
    }
  }
}
</script>

<style >
@import url('https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&family=Frank+Ruhl+Libre:wght@300;400;500;600;700;800;900&family=Noto+Serif+Hebrew:wght@100;200;300;400;500;600;700;800;900&display=swap');
:root {
  /* font-family: 'Amatic SC', sans-serif; */
/* font-family: 'Frank Ruhl Libre', serif; */
font-family: 'Noto Serif Hebrew', serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  background-image: url(./assets/mainHedBackgroundImg.jpg);; 
    background-size: cover; 
    background-color: #202d36; /*  צבע רקע למקרה שהתמונה לא זמינה */
}
.mainCenter {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: flex-end;
    height: 80vh;
    width: 100%;
    margin: 0;
    padding: 0;
}
#mainCenterTxt {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 100%;
    margin: 0;
    padding: 0;
    color: aliceblue;
}

nav {
  /* background-color: #fff;
  border-bottom: 1px solid #eee; */
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

a {
  font-weight: bold;
  color: #ecf0f3;
  text-decoration: none;
}

a.router-link-exact-active {
  color: #4ffdaf;
}

button {
  padding: 10px 20px;
  margin: 5px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
