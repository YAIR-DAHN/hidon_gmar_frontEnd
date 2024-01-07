<!-- דף עדיין לא עובד, צריך לעשות התאמות -->

<template>

<div>

    <!-- פונקציה לסינון מבחנים, להשלים -->
    <h2>בחר מבחן להצגה</h2>
    <select v-model="selected" @change="fetchUsers">
        <option v-for="test in rowData" :key="test.id" :value="test.id">{{test.Test.testesMgName}}</option>
    </select>
  </div>
    <ag-grid-vue style="height: 500px" class="ag-theme-quartz-auto-dark" :rowData="rowData" :columnDefs="colDefs"
      :undoRedoCellEditing=true undoRedoCellEditingLimit=20 editType='fullRow' enableRtl=true>
  
    </ag-grid-vue>
  </template>
  
  <script>
  import { ref } from 'vue';
  import "ag-grid-community/styles/ag-grid.css"; // Core CSS
  import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
  import { AgGridVue } from "ag-grid-vue3"; // Vue Grid Logic
  
  export default {
    name: "App",
    components: {
      AgGridVue, // Add AG Grid Vue3 component
    },
    setup() {
      // נתונים שיכנסו לטבלה.
      const rowData = ref([]);
      
      // פונקציה שמביאה את כל המבחנים מהשרת.
      const fetchUsers = async () => {
        try {
          const response = await fetch(process.env.VUE_APP_URL_SERVER + "/tests/A/all",
            { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } })
          console.log(response);
          rowData.value = await response.json()
          console.log(rowData.value)
        } catch (error) {
          console.log(`שגיאה בקבלת הנתונים מהשרת: ${error}`);
        }
  
  
      }
  
      fetchUsers()
  
      // Column Definitions: Defines & controls grid columns.
      const colDefs = ref([
        {
          field: "id", filter: 'agSetColumnFilter', editable: true, width: 60,
          headerComponentParams: { displayName: "מספר מזהה" },
          valueSetter: params => {
            params.data.id = params.newValue;
            upData(params.data);
            return true;
          }
        },
        {
          field: "Question.question", filter: 'agSetColumnFilter', editable: true,
          headerComponentParams: { displayName: "שאלה" },
          valueSetter: params => {
            params.data.question = params.newValue;
            upData(params.data);
            return true;
          }
        },
        {
            field: "User.userFirstName", filter: 'agSetColumnFilter', editable: true,
          headerComponentParams: { displayName: "שם משתמש" },
          valueSetter: params => {
            params.data.question = params.newValue;
            upData(params.data);
            return true;
          } 
        },
        {
          field: "user_answers", filter: 'agSetColumnFilter', editable: true,
          headerComponentParams: { displayName: "תשובת המשתמש" },
          valueSetter: params => {
            params.data.answers = params.newValue;
            upData(params.data);
            return true;
          }
        },
        {
          field: "Question.correct_answer", filter: 'agSetColumnFilter', editable: true,
          headerComponentParams: { displayName: "התשובה הנכונה" },
          valueSetter: params => {
            params.data.correct_answer = params.newValue;
            upData(params.data);
            return true;
          }
        },
        {
          field: "Test.testesMgName", filter: 'agNumberColumnFilter', editable: true, width: 90,
          headerComponentParams: { displayName: "שם המבחן" },
          valueSetter: params => {
            params.data.test_id = params.newValue;
            upData(params.data);
            return true;
          }
        },
        {
          field: "createdAt", filter: 'agNumberColumnFilter',
          headerComponentParams: { displayName: "תאריך יצירה" },
        },
        { field: "updatedAt", filter: 'agNumberColumnFilter' }
  
      ]);
  
      //שליחת עריכת נתונים לשרת
      let upData = async (data) => {
        try {
          const response = await fetch(process.env.VUE_APP_URL_SERVER + `/tests/Q/${data.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(data)
          })
          const dataRes = await response.json()
          console.log(dataRes)
        } catch (error) {
          console.log(`שגיאה בשליחת הנתונים לשרת: ${error}`);
        }
      };
  
      return {
        rowData,
        colDefs,
  
      };
    },
  };
  </script>