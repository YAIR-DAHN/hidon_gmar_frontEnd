<template>
  <div class="register-form">
    <h2>הרשמה</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="firstName">שם פרטי:</label>
        <input type="text" id="firstName" v-model="firstName" required>
      </div>
      <div class="form-group">
        <label for="lastName">שם משפחה:</label>
        <input type="text" id="lastName" v-model="lastName" required>
      </div>
      <div class="form-group">
        <label for="birthdate">תאריך לידה:</label>
        <input type="date" id="birthdate" v-model="birthdate" required>
      </div>
      <div class="form-group">
        <label for="city">עיר מגורים:</label>
        <select id="city" v-model="city" required>
          <option value="">בחר עיר</option>
          <option v-for="city in cities" :key="city">{{ city }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="address">כתובת:</label>
        <input type="text" id="address" v-model="address">
      </div>
      <div class="form-group">
        <label for="phone">טלפון:</label>
        <input type="tel" id="phone" v-model="phone" pattern="[0-9]{9-10}" required>
        <small>פורמט: 050-1234567</small>
      </div>
      <div class="form-group">
        <label for="email">מייל:</label>
        <input type="email" id="email" v-model="email">
      </div>
         <div class="form-group">
        <label for="password">סיסמה:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <div class="form-group">
        <label for="confirmPassword">אימות סיסמה:</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" @input="checkPasswordMatch()" required>
        <p v-if="passwordMismatch">הסיסמאות לא תואמות</p>
      </div>
      <div class="form-group">
        <label for="contact">שיוך למדרשיה/רכז:</label>
        <input type="text" id="contact" v-model="contact">
      </div>
      <button type="submit">הרשם</button>
    </form>
      <router-link to="/login">כניסה</router-link>

  </div>
</template>

<script scoped>
import { ref } from 'vue'
// import { useRouter } from 'vue-router'
export default {
  name: 'RegisterForm',
  setup() {
    return {
      firstName,
      lastName,
      birthdate,
      city,
      address,
      phone,
      email,
      password,
      confirmPassword,
      contact,
      cities,
      submitForm,
      confirmPasswordIn,
      passwordMismatch,
      checkPasswordMatch
    }
  }
}
const firstName = ref('')
const lastName = ref('')
const birthdate = ref('')
const city = ref('')
const address = ref('')
const phone = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const contact = ref('')
const cities = ['ירושלים', 'תל אביב', 'חיפה', 'באר שבע', 'חדרה', 'נתניה', 'אשדוד', 'אילת', 'רחובות', 'פתח תקווה']
//  const router = useRouter()

let submitForm = async () => {
  const credentials = {
    userFirstName: firstName.value,
    userLastName: lastName.value,
    userBirthDate: birthdate.value,
    userCity: city.value,
    userAddress: address.value,
    userPhone: phone.value,
    userEmail: email.value,
    userPassword: password.value,
    userConfirmPassword: confirmPassword.value,
    userContact: contact.value,
    userRole: "user"
  }
  const response = await fetch(process.env.VUE_APP_URL_SERVER + "/users/", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials)
  })

  const data = await response.json()
  console.log(data)
  localStorage.setItem('token', data.token)
  localStorage.setItem('id', data.id)
  localStorage.setItem('first-name', data.userFirstName)
  localStorage.setItem('last-name', data.userLastName)
  localStorage.setItem('phone', data.userPhone)
  localStorage.setItem('email', data.userEmail)
  // router.push('/')
}

//השוואת סיסמאות

let confirmPasswordIn = ''
let passwordMismatch = false
let checkPasswordMatch = () => {
      passwordMismatch = password !== confirmPasswordIn;
    }

</script>

<style scoped>
.register-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 50px;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: rgba(142, 136, 136, 0.2);
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
}

input,
select {
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
