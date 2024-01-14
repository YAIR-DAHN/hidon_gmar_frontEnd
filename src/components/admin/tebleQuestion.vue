<template>
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
    // Row Data: The data to be displayed.
    const rowData = ref([]);

    const fetchUsers = async () => {
      try {
        const response = await fetch(process.env.VUE_APP_URL_SERVER + "/tests/Q/",
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
        field: "id", filter: 'agSetColumnFilter', width: 60,
        headerComponentParams: { displayName: "מספר מזהה" },
      },
      {
        field: "Test.testesMgName", filter: 'agSetColumnFilter',
        headerComponentParams: { displayName: "נושא מבחן" }
      },
      {
        field: "question", filter: 'agSetColumnFilter', editable: true,
        headerComponentParams: { displayName: "שאלה" },
        valueSetter: params => {
          params.data.question = params.newValue;
          upData(params.data);
          return true;
        }
      },
      {
        field: "type", filter: 'agSetColumnFilter', editable: true, width: 70,
        headerComponentParams: { displayName: "סוג" },
        valueSetter: params => {
          params.data.type = params.newValue;
          upData(params.data);
          return true;
        }
      },
      {
        field: "answers", filter: 'agSetColumnFilter', editable: true,
        headerComponentParams: { displayName: "תשובה" },
        valueSetter: params => {
          params.data.answers = params.newValue;
          upData(params.data);
          return true;
        }
      },
      {
        field: "correct_answer", filter: 'agSetColumnFilter', editable: true,
        headerComponentParams: { displayName: "תשובה נכונה" },
        valueSetter: params => {
          params.data.correct_answer = params.newValue;
          upData(params.data);
          return true;
        }
      },
      {
        field: "test_id", filter: 'agNumberColumnFilter', editable: true, width: 90,
        headerComponentParams: { displayName: "מספר מבחן" },
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