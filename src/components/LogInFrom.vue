
<template>
  <div class="login-form">
    <h2>כניסה לאתר</h2>
    <form @submit="submitForm">
      <div class="form-group">
        <label for="username">שם משתמש / מספר טלפון / כתובת מייל</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div class="form-group">
        <label for="password">סיסמה</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">כניסה</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    submitForm() {
      // כאן תוכל להוסיף קוד לטיפול בשליחת הטופס
      console.log('שם משתמש / מספר טלפון / כתובת מייל:', this.username);
      console.log('סיסמה:', this.password);
    }
  }
};
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

    
