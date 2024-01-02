<template>
    <!-- The AG Grid component -->

    <!-- תיבת חיפוש מהיר, לעיין בהמשך -->
    <!-- <div class="example-header">
                    <span>Quick Filter:</span>
                    <input type="text" id="filter-text-box" placeholder="Filter..." v-on:input="onFilterTextBoxChanged()">
                </div> -->
    <ag-grid-vue
    style="height: 500px"
    class="ag-theme-quartz-auto-dark"
    :rowData="rowData"
    :columnDefs="colDefs"
    
    enableRtl=true
  >
  
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
    const response = await fetch('http://localhost:3000/users', { headers: { 'Authorization' : 'Bearer ' + localStorage.getItem('token') }})
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
    { field: "userFirstName", filter: 'agSetColumnFilter',  editable: true},
    { field: "userLastName", filter: 'agSetColumnFilter'},
    { field: "userPhone", filter: 'agSetColumnFilter' },
    { field: "userEmail", filter: 'agSetColumnFilter' },
    { field: "userCity", filter: 'agSetColumnFilter' },
    { field: "userAddress", filter: 'agNumberColumnFilter' },
    { field: "userContact", filter: 'agNumberColumnFilter' },
    { field: "userScore", filter: 'agNumberColumnFilter' },
    { field: "userLevel", filter: 'agNumberColumnFilter' },
    { field: "userbirthdate" },
  
  ]);

  return {
    rowData,
    colDefs,
   
  };
  },
};
</script>