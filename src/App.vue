
import router from './router';
<template>
  <nav>
    <router-link to="/">בית</router-link> |
    <router-link to="/login">כניסה</router-link> |
    <router-link to="/Register">הרשמה</router-link> |
    <router-link to="/about">משתמשים</router-link> |
    <router-link to="/addTest">יצירת מבחן</router-link> |
    <router-link to="/tests">הצגת מבחנים</router-link> |
    <router-link to="/addQuest">יצירת שאלות</router-link> |
    <router-link to="/showQuests">הצגת שאלות</router-link> |
    <router-link to="/testing">ביצוע מבחנים</router-link> |
    <router-link to="/showAnswers">הצגת תשובות המשתמשים</router-link> |
    <div>
      <button @click="this.$router.push('/login')">כניסה</button>
      <button @click="this.$router.push('/Register')">הרשמה</button>
      <button @click="this.logOut()">יציאה</button>
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
      this.$router.push('/')
      window.location.reload()
    }
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

<style>
@import url('https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&family=Frank+Ruhl+Libre:wght@300;400;500;600;700;800;900&family=Noto+Serif+Hebrew:wght@100;200;300;400;500;600;700;800;900&display=swap');
#app {
  /* font-family: 'Amatic SC', sans-serif; */
/* font-family: 'Frank Ruhl Libre', serif; */
font-family: 'Noto Serif Hebrew', serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  background-color: #fff;
  border-bottom: 1px solid #eee;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
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
