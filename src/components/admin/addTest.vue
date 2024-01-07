<template>
    <div>
        <h1>יצירת מבחן</h1>
        <form @submit.prevent="createTest">
            <label for="testName">שם המבחן:</label>
            <input type="text" id="TstName" v-model="testName" required>

            <label for="testType">סוג המבחן:</label>
            <input type="text" id="testType" v-model="testType" required>

            <label for="testPoints">נקודות המבחן:</label>
            <input type="number" id="testPoints" v-model="testPoints" required>

            <label for="testTime">זמן כולל להשלמת המבחן:</label>
            <input type="number" id="testTime" v-model="testTime" required>

            <label for="testStartDate">תאריך התחלת המבחן:</label>
            <input type="date" id="testStartDate" v-model="testStartDate" required>

            <label for="testEndDate">תאריך סיום המבחן:</label>
            <input type="date" id="testEndDate" v-model="testEndDate" required>

            <label for="testStage">שלב המבחן:</label>
            <input type="text" id="testStage" v-model="testStage" required>

            <button type="submit">צור מבחן</button>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue'
export default {
    setup() {
        return {
            testName,
            testType,
            testPoints,
            testTime,
            testStartDate,
            testEndDate,
            testStage,
            createTest
        };
    },
};
const testName = ref('')
const testType = ref('')
const testPoints = ref('')
const testTime = ref('')
const testStartDate = ref('')
const testEndDate = ref('')
const testStage = ref('')

let  createTest = async () => {
        // console.log(this.testName);
        const test = {
            testesMgName: testName.value,
            testesMgType: testType.value,
            testesMgScroe: testPoints.value,
            testesMgTime: testTime.value,
            testesMgDateStart: testStartDate.value,
            testesMgDateEnd: testEndDate.value,
            testesMgLevel: testStage.value,
        };
        const response =
            await fetch(process.env.VUE_APP_URL_SERVER + '/tests/creat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify(test),
            });
        const data = await response.json();
        console.log(data);
    }


</script>
<style scoped>
.container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
}

h1 {
    font-size: 24px;
    margin-bottom: 20px;
}

form {
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(4, 1fr);
}

label {
    font-weight: bold;
}

input[type="text"],
input[type="number"],
input[type="date"] {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button[type="submit"] {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button[type="submit"]:hover {
    background-color: #0056b3;
}
</style>

