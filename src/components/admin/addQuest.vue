<template>
  <div>
    <h1>יצירת שאלות למבחן רגיל</h1>
    
    <!-- select test -->
    <h2>בחר מבחן מהרשימה</h2>
    <select v-model="testId" required>
      <option v-for="test in tests" :key="test.id" :value="test.id">{{test.testesMgName}}</option>
    </select>
    <div>
      <h1>סוג שאלות</h1>
      <div id="slcType">
        <button @click="typeQuestion = 'רגיל'">רגיל</button>
        <button @click="typeQuestion = 'אמריקאי'">אמריקאי</button>
        <button @click="typeQuestion = 'כן ולא'">נכון/לא נכון</button>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <!-- <th>מזהה מבחן</th> -->
          <th>שאלה</th>
          <th v-if="typeQuestion == 'אמריקאי'">אופציות של תשובות</th>
          <th>תשובה</th>
          <th>ניקוד לשאלה</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(question, index) in questions" :key="index">
          <!-- <td>
            <input type="text" v-model="question.examId" />
          </td> -->
          <td>
            <input type="text" v-model="question.questionText" />
          </td>

          <td v-if="typeQuestion == 'אמריקאי'">
            <input type="text" v-model="question.Answer" />
          </td>

          <!-- תשובה בטקסט -->
          <td v-if="typeQuestion != 'כן ולא'">
            <input type="text" v-model="question.correctAnswer" />
          </td>

          <!-- תשובת כן/לא -->
          <td v-if="typeQuestion == 'כן ולא'">

            <select v-model="question.correctAnswer" required>
              <option value="נכון">נכון</option>
              <option value="לא נכון">לא נכון</option>
            </select>

<!-- 
            <input type="text" v-model="question.Answer" list="selct" />

            <datalist id="selct">
              <option value="נכון"></option>
              <option value="לא נכון"></option>
            </datalist> -->
          </td>
          <td>
            <input type="number" v-model="question.score" />
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="submit">שמור והוסף שאלה</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      questions: [],
      tests: [],
      testId: '',
      typeQuestion: '',
      submitForm
    };

  },
  methods: {
    async submit() {
      // console.log(this.typeQuestion);
      if (this.questions.length > 0) {
        let question = this.questions[this.questions.length - 1];
        const pushForm = await submitForm(question);
        this.questions[this.questions.length - 1].id = pushForm.id;
        console.log(question);


      };
      this.questions.push({
        examId: this.testId,
        questionText: '',
        Answer: '',
        correctAnswer: '',
        score: 0,
        type: this.typeQuestion,
        id: ''
      });

    }

  },
  mounted(){
    // get all tests
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
  }
}

let submitForm = async (questions) => {
  const credentials = {
    test_id: questions.examId,
    question: questions.questionText,
    answers: questions.Answer,
    correct_answer: questions.correctAnswer,
    type: questions.type
  }
  // const response = await fetch(process.env.VUE_APP_URL_ADD_QUESTION, {
  const response = await fetch(process.env.VUE_APP_URL_SERVER + "/tests/Q/add", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    body: JSON.stringify(credentials)

  })
  const data = await response.json()
  console.log(data)
  return data;

}


</script>

<style scoped>
h1 {
  text-align: center;
}

table {
  margin: 0 auto;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  border: 1px solid #ccc;
}

button {
  display: block;
  margin: 20px auto;
}

#slcType {
  display: flex;
  justify-content: center;
}

#slcType button {
  width: 100px;
  margin: 10px 5px;
}
</style>

