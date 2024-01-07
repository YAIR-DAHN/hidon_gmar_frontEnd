
<template>
  <div class="login-form">
    <h2>כניסה לאתר</h2>
    <form @submit="submitForm">
      <div class="form-group">
        <label for="username">הזן מספר טלפון / כתובת מייל</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div class="form-group">
        <label for="password">סיסמה</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">כניסה</button>
      
    </form>
    <router-link to="/register">הרשמה</router-link>
  </div>

</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      username: '',
      password: '',
      phone: '',
    };
  },
  methods: {
    async submitForm() {
      const credentials = {
        userEmail: this.username,
        userPhone: this.username,
        userPassword: this.password,
      }
      const response = await fetch(process.env.VUE_APP_URL_SERVER + "/users/login/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })

      const data = await response.json()
      console.log(data)
      if (data.userToken){
        this.$router.push('/')}
        else {
          alert('שם משתמש או סיסמה שגויים')
        }
      localStorage.setItem('token', data.userToken )
      localStorage.setItem('id', data.id )
      localStorage.setItem('first-name', data.userFirstName )
      localStorage.setItem('last-name', data.userLastName )
      localStorage.setItem('phone', data.userPhone )
      localStorage.setItem('email', data.userEmail )
      window.location.reload() 
    }
}
}
</script>

<style scoped>
.login-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 20px;
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

    
