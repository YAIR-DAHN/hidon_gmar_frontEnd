<!-- דף עדיין לא עובד, צריך לעשות התאמות -->

<template>

<div>

    <!-- פונקציה לסינון מבחנים, להשלים -->
    <!-- <h2>בחר מבחן להצגה</h2>
    <select v-model="selected" @change="fetchUsers">
        <option v-for="test in rowData" :key="test.id" :value="test.id">{{test.Test.testesMgName}}</option>
    </select> -->
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
          const response = await fetch(process.env.VUE_APP_URL_SERVER + "/tests/T/all",
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
          field: "id", filter: 'agSetColumnFilter',  width: 60,
          headerComponentParams: { displayName: "מספר מזהה" },
        },
        {
          field: "testesMgName", filter: 'agSetColumnFilter', editable: true,
          headerComponentParams: { displayName: "שם המבחן" },
          valueSetter: params => {
            params.data.testesMgName = params.newValue;
            upData(params.data);
            return true;
          }
        },
        {
            field: "testesMgType", filter: 'agSetColumnFilter', editable: true,
          headerComponentParams: { displayName: "סוג" },
          valueSetter: params => {
            params.data.testesMgType = params.newValue;
            upData(params.data);
            return true;
          } 
        },
        {
          field: "testesMgScroe", filter: 'agSetColumnFilter', editable: true,
          headerComponentParams: { displayName: "ניקוד" },
          valueSetter: params => {
            params.data.testesMgScroe = params.newValue;
            upData(params.data);
            return true;
          }
        },
        {
          field: "testesMgTime", filter: 'agSetColumnFilter', editable: true,
          headerComponentParams: { displayName: "זמן" },
          valueSetter: params => {
            params.data.testesMgTime = params.newValue;
            upData(params.data);
            return true;
          }
        },
        {
          field: "testesMgDateStart", filter: 'agNumberColumnFilter', editable: true,
          headerComponentParams: { displayName: "תאריך התחלה" },
          valueSetter: params => {
            params.data.testesMgDateStart = params.newValue;
            upData(params.data);
            return true;
          }
        },
        {
          field: "testesMgDateEnd", filter: 'agNumberColumnFilter',  editable: true,
          headerComponentParams: { displayName: "תאריך סיום" },
          valueSetter: params => {
            params.data.testesMgDateEnd = params.newValue;
            upData(params.data);
            return true;
          }
        },
        { field: "testesMgLevel", filter: 'agNumberColumnFilter',
        headerComponentParams: { displayName: "שלב" }, editable: true,
          valueSetter: params => {
            params.data.testesMgLevel = params.newValue;
            upData(params.data);
            return true;
          }
       }
      //  {
      //   field: "updatedAt", filter: 'agNumberColumnFilter', editable: true,
      //  }
  
      ]);
  
      //שליחת עריכת נתונים לשרת
      let upData = async (data) => {
        try {
          const response = await fetch(process.env.VUE_APP_URL_SERVER + `/tests/T/${data.id}`, {
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