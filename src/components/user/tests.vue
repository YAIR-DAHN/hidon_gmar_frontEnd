<template>
    <div class="container">
        <h1 class="title"> מבחן </h1>
        <!-- select test -->
        <div id="slctTestBox" v-if="startTest === ''">
            <h2>בחר מבחן מהרשימה</h2>
            <select v-model="testId" required id="slctTest">
                <option v-for="test in tests" :key="test.id" :value="test.id">{{ test.testesMgName }}</option>
            </select>
            <button @click="fetchQuestions">התחל מבחן</button>
        </div>
        <div v-for="(question, index) in questions" :key="index" class="question">
            <h3>{{ question.question }}</h3>
            <!-- <textarea v-model="answers[index]" v-if="index === 2">התשובה שלך..</textarea> -->
            <textarea v-if="question.type === 'רגיל' || question.type === 'r'"
                v-model="answers[index].user_answers">התשובה שלך..</textarea>

            <!-- <div v-if="question.type === 'אמריקאי' || question.type === 'a'">
                <input type="checkbox" id="vehicle1" name="vehicle1" v-for="(answers, index) in question" :key="index" v-model="answers[index]">
                <label for="vehicle1"> {{ answers }}</label><br>
            </div> -->

            <div v-if="question.type === 'כן ולא' || question.type === 'yn'" id="ansYN">
                <input type="radio" id="vehicle1" name="vehicle1" value="נכון" v-model="answers[index]">
                <label for="vehicle1">נכון</label><br>
                <input type="radio" id="vehicle2" name="vehicle2" value="לא נכון" v-model="answers[index]">
                <label for="vehicle2">לא נכון</label><br>
            </div>
            <hr />
        </div>
        <button @click="submitAnswers" class="submit-button" v-if="startTest !== ''">שלח תשובות</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            questions: [],
            answers: [],
            tests: [],
            testId: '',
            startTest: '',
        };
    },
    mounted() {
        const getTests = async () => {
            const response = await fetch(process.env.VUE_APP_URL_SERVER + "/tests/T/all", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            const data = await response.json()
            console.log(data)
            return data;
        }
        getTests().then(data => {
            console.log(data);
            this.tests = data;
        })
        // this.fetchQuestions();
    },
    methods: {
        fetchQuestions() {
            fetch(process.env.VUE_APP_URL_SERVER + `/tests/${this.testId}`)
                .then(response => response.json())
                .then(data => {
                    this.questions = data.map(question => question);
                    for (let i = 0; i < this.questions.length; i++) {
                        this.answers.push({ Quest_id_FK: this.questions[i].id, user_id_FK: localStorage.getItem('id'), user_answers: "" });

                    }
                    console.log(this.answers);
                    this.startTest = "start";
                })
                .catch(error => {
                    console.error("שגיאה בקבלת השאלות מהשרת", error);
                });

        },
        submitAnswers() {
            fetch(process.env.VUE_APP_URL_SERVER + "/tests/A/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify(this.answers)
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                })
                .catch(error => {
                    console.error("שגיאת שרת בשליחת התשובות", error);
                });
            console.log(this.answers);
        }
    }
};
</script>

<style scoped>
.container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
}

.title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
}

.question {
    margin-bottom: 10px;
}

textarea {
    width: 100%;
    height: 150px;
    padding: 12px 20px;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
    background-color: #f8f8f8;
    font-size: 16px;
    resize: none;
}

#slctTest {
    width: 100%;
    height: 40px;
    padding: 10px;
    border: 2px solid #ccc;
    border-radius: 4px;
    background-color: #f8f8f8;
    font-size: 16px;
    outline: none;
    transition: border-color 0.3s ease;
}

#slctTest:hover,
#slctTest:focus {
    border-color: #007bff;
}

#slctTest::placeholder {
    color: #999;
}

#slctTest option {
    font-size: 16px;
    color: #333;
}

#ansYN {
    display: flex;
    justify-content: space-evenly;
}

.submit-button {
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.submit-button:hover {
    background-color: #0056b3;
}
</style>
