// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// Keep track of all filters
var filters = {};

// This function will replace your handleClick function
function updateFilters() {
    let filteredDate = d3.select("#datetime");
    if (filteredDate.on('change')) {
      filters["datetime"] = filteredDate.property("value")
    } else {
      filters['datetime'] = null
    };
    
    let filteredCity = d3.select("#selcity");
    if (filteredCity.on('change')) {
      filters["city"] = filteredCity.property("value")
    } else {
      filters['city'] = null
    };

    let filteredState = d3.select("#selstate");
    if (filteredState.on('change')) {
      filters["state"] = filteredState.property("value")
    } else {
      filters['state'] = null
    };

    let filteredCountry = d3.select("#selcountry");
    if (filteredCountry.on('change')) {
      filters["country"] = filteredCountry.property("value")
    } else {
      filters['country'] = null
    };

    let filteredShape = d3.select("#filter-shape");
    if (filteredShape.on('change')) {
      filters["shape"] = filteredShape.property("value")
    } else {
      filters['shape'] = null
    };
  // let filteredData = tableData;
  // Check to see if a date was entered and filter the
  // data using that date.
  
    // Apply `filter` to the table data to only keep the
    // rows where the `datetime` value matches the filter value
    
  // Rebuild the table using the filtered data
  // @NOTE: If no date was entered, then filteredData will
  // just be the original tableData.
  // Save the element, value, and id of the filter that was changed
  // If a filter value was entered then add that filterId and value
  // to the filters list. Otherwise, clear that filter from the filters object

  // Call function to apply all filters and rebuild the table
  filterTable();
}

function filterTable() {
  let filteredData = tableData;

  Object.values(filters).forEach((val)=>{
    if (filters["datetime"]){
        filteredData = filteredData.filter(row => row.datetime===filters["datetime"])
      }; 
    if (filters["city"]) {
      filteredData = filteredData.filter(row => row.city === filters["city"])
    };
    if (filters["state"]) {
      filteredData = filteredData.filter(row => row.state === filters["state"])
    };
    if (filters["shape"]) {
      filteredData = filteredData.filter(row => row.shape === filters["shape"])
    };
    if (filters["country"]) {
      filteredData = filteredData.filter(row => row.country === filters["country"])
    };
   
  });

  // Loop through all of the filters and keep any data that
  // matches the filter values
  // Finally, rebuild the table using the filtered Data
    buildTable(filteredData);
  }

// Attach an event to listen for changes to each filter
// Hint: You'll need to select the event and what it is listening for within each set of parenthesis
d3.select("#filter-shape").on('change', updateFilters);
d3.selectAll("#datetime").on('change', updateFilters);
d3.selectAll("#selcity").on('change', updateFilters);
d3.selectAll("#selstate").on('change', updateFilters);
d3.selectAll("#selcountry").on('change', updateFilters);

d3.selectAll("#filter-btn").on('click', filterTable);

// Build the table when the page loads
buildTable(tableData);