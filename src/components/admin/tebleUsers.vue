<template>
  <!-- The AG Grid component -->

  <!-- תיבת חיפוש מהיר, לעיין בהמשך -->
  <!-- <div class="example-header">
                    <span>Quick Filter:</span>
                    <input type="text" id="filter-text-box" placeholder="Filter..." v-on:input="onFilterTextBoxChanged()">
                </div> -->
                
                
  <ag-grid-vue style="height: 500px" class="ag-theme-alpine-auto-dark" :rowData="rowData" :columnDefs="colDefs"
    :undoRedoCellEditing=true :undoRedoCellEditingLimit=20 editType='fullRow' enableRtl=true>
     </ag-grid-vue> 
		


</template>

<script>
import { ref } from 'vue';
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
// import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import "ag-grid-community/styles/ag-theme-alpine.css"; // Theme
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
      const response = await fetch(process.env.VUE_APP_URL_SERVER + "/users/",
       { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } }).catch(err => console.log(err))
      console.log(response);
      rowData.value = await response.json()
      console.log(rowData.value)

    }

    fetchUsers()

    // יצירת תיבת חיפוש מהיר, לעיין בהמשך.
    //       const gridApi = ref();
    // const onFilterTextBoxChanged = () => {
    //       gridApi.value.setGridOption(
    //         'quickFilterText',
    //         document.getElementById('filter-text-box').value
    //       );
    //     };
    //     const onGridReady = (params) => {
    //       gridApi.value = params.api;

    //       const updateData = (data) => (rowData.value = data);

    //       fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    //         .then((resp) => resp.json())
    //         .then((data) => updateData(data));
    //     };





    // Column Definitions: Defines & controls grid columns.
    const colDefs = ref([
      {
        field: "userFirstName", filter: 'agSetColumnFilter', editable: true,
        headerComponentParams: {displayName: "שם פרטי"},
        valueSetter: params => {
          params.data.userFirstName = params.newValue;
          upData(params.data);
          return true;
        }
      },
      {
        field: "userLastName", filter: 'agSetColumnFilter', editable: true,
        headerComponentParams: {displayName: "שם משפחה"},
        valueSetter: params => {
          params.data.userLastName = params.newValue;
          upData(params.data);
          return true;
        }
      },
      { field: "userPhone", filter: 'agSetColumnFilter', editable: true,
      headerComponentParams: {displayName: "טלפון"},
        valueSetter: params => {
          params.data.userPhone = params.newValue;
          upData(params.data);
          return true;
        } },
      { field: "userEmail", filter: 'agSetColumnFilter', editable: true,
      headerComponentParams: {displayName: "מייל"},
        valueSetter: params => {
          params.data.userEmail = params.newValue;
          upData(params.data);
          return true;
        } },
      { field: "userCity", filter: 'agSetColumnFilter', editable: true,
      headerComponentParams: {displayName: "עיר"},
        valueSetter: params => {
          params.data.userCity = params.newValue;
          upData(params.data);
          return true;
        } },
      { field: "userAddress", filter: 'agNumberColumnFilter', editable: true,
      headerComponentParams: {displayName: "כתובת"},
        valueSetter: params => {
          params.data.userAddress = params.newValue;
          upData(params.data);
          return true;
        } },
      { field: "userContact", filter: 'agNumberColumnFilter', editable: true,
      headerComponentParams: {displayName: "רכז"},
        valueSetter: params => {
          params.data.userContact = params.newValue;
          upData(params.data);
          return true;
        } },
      { field: "userScore", filter: 'agNumberColumnFilter', editable: true,
      headerComponentParams: {displayName: "ניקוד"},
        valueSetter: params => {
          params.data.userScore = params.newValue;
          upData(params.data);
          return true;
        } },
      { field: "userLevel", filter: 'agNumberColumnFilter', editable: true,
      headerComponentParams: {displayName: "שלב"},
        valueSetter: params => {
          params.data.userLevel = params.newValue;
          upData(params.data);
          return true;
        } },
      { field: "userBirthDate", filter: 'agNumberColumnFilter', editable: true,
      headerComponentParams: {displayName: "תאריך לידה"},
        valueSetter: params => {
          params.data.userBirthDate = params.newValue;
          upData(params.data);
          return true;
        } },

      { field: "userRole", filter: 'agNumberColumnFilter', editable: true,
      headerComponentParams: {displayName: "סוג משתמש"},
        valueSetter: params => {
          params.data.userRole = params.newValue;
          upData(params.data);
          return true;
        } },
      


    ]);

    let upData = async (data) => {
      const response = await fetch(process.env.VUE_APP_URL_SERVER + `/users/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + localStorage.getItem('token') 
        },
        body: JSON.stringify(data)
      })
      const dataRes = await response.json()
      console.log(dataRes)
    };


    return {
      rowData,
      colDefs,

    };
  },
};
</script>
<style scoped>
/* body{
 background-color: aliceblue;
 background: fixed;
} */
</style>