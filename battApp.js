// Selecting DOM elements
const select_container = document.querySelectorAll(".select_container");
const inverter_voltage = document.querySelector("#inverter-voltage");
const inverter_efficiency = document.querySelector("#inverter-efficiency");
const battery_type = document.querySelector("#Battery-Type");
const battery_voltage = document.querySelector("#battery-voltage");
const load_power_fac = document.querySelector("#load-power-factor");
const con_load_power = document.querySelector("#con-load-power");
const int_load_power = document.querySelector("#int-load-power");
const backup_time_hr = document.querySelector("#timeHour");
const backup_time_Min = document.querySelector("#timeMin");
const utilization_fac = document.querySelector("#utilization");
const backup_time = document.querySelector("#time");
const result_bar = document.querySelector("#result");
const body = document.querySelector("body");
const header = document.querySelector("header");
const App = document.querySelector("#App");
const cal_button = document.querySelector("#cal_button");
const Inverter_Capacity_value = document.querySelector("#Inverter_Capacity_value");
const Battery_Capacity_value = document.querySelector("#Battery_Capacity_value");
const Battery_Ampere_value = document.querySelector("#Battery_Ampere_value");
const Battery_In_Series_Value = document.getElementById("Battery_In_Series_Value");
const Battery_In_Parallel_Value = document.getElementById("Battery_In_Parallel_Value");
const battery_voltage_compare = document.querySelectorAll("#battery-voltage option");

// Variables to track counts
let batt_capcity;
let Hr_count = 0;
let Min_count = 0;
let Cont_load_count = 0;
let int_load_count = 0;
let isButtonClick = false;
let inv_market_capacity = [0.25, 0.375, 0.625, 1, 1.5, 1.7, 2, 2.5, 2.7, 3.5, 3.7, 4, 4.5, 5, 5.5, 5.7, 6, 6.5, 7.5, 8, 10, 12, 12.5, 15, 20, 25, 30, 40, 50, 60, 70, 80, 100, 120, 150, 200, 250, 300, 500, 700, 1000];
let inv_close_market_cap;

// Event listeners for select containers
select_container.forEach(function(select_container) {
    // Event listener for mouseenter
    select_container.addEventListener("mouseenter", function() {
        select_container.children[1].style.backgroundColor = "#e6e6e6";
    });

    // Event listener for mouseleave
    select_container.addEventListener("mouseleave", function() {
        select_container.children[1].style.backgroundColor = "";
    });
});

// Function to log inverter voltage
function inv_voltage() {
    error_notification.classList.remove("error_notificatoin");
    battery_voltage.value = "";
    battery_type.value = "";

    // console.log(inverter_voltage.value);
    // console.log(parseFloat(inverter_voltage.value) * (12/10.5));
}

inverter_voltage.addEventListener("click", function(){
  inverter_voltage.parentElement.style.outline = "";
});

// Function to log inverter efficiency
function inv_efficiency() {
  error_notification.classList.remove("error_notificatoin");
}

inverter_efficiency.addEventListener("click", function(){
  inverter_efficiency.parentElement.style.outline = "";
});

// Function to log battery type
function batt_Type() {
  error_notification.classList.remove("error_notificatoin");

  battery_voltage.value = "";

  if(battery_type.value == "0.80" || battery_type.value == "0.70" || battery_type.value == "0.90"){
    document.querySelector('#battery-voltage option[value="1.2"]').disabled = true;
    document.querySelector('#battery-voltage option[value="2"]').disabled = true;
    console.log("welcoe")
  }
  else{
    document.querySelector('#battery-voltage option[value="1.2"]').disabled = false;
    document.querySelector('#battery-voltage option[value="2"]').disabled = false;
    console.log("welcoe")
  }

  if(battery_type.value == "0.85"){
    document.querySelector('#battery-voltage option[value="12"]').disabled = true;
    document.querySelector('#battery-voltage option[value="24"]').disabled = true;
    document.querySelector('#battery-voltage option[value="48"]').disabled = true;
  }
  else{
    document.querySelector('#battery-voltage option[value="12"]').disabled = false;
    document.querySelector('#battery-voltage option[value="24"]').disabled = false;
    document.querySelector('#battery-voltage option[value="48"]').disabled = false;
  } 
}

battery_type.addEventListener("click", function(){
  battery_type.parentElement.style.outline = "";
});

// Function to log battery voltage
function batt_voltage() {
  error_notification.classList.remove("error_notificatoin");
}

battery_voltage.addEventListener("click", function(){
  battery_voltage.parentElement.style.outline = "";

  battery_voltage_compare.forEach(function(compare){
    // if(inverter_voltage.value == ""){
    //   compare.disabled = true;
    // }
    if( parseFloat(compare.value) > parseFloat(inverter_voltage.value) * (12/10.5)){
      compare.disabled = true;
    } 
  })
});

// Function to log load power factor
function load_power_factor() {
  error_notification.classList.remove("error_notificatoin");
}

load_power_fac.addEventListener("click", function(){
  load_power_fac.parentElement.style.outline = "";
});

// Function to log continuous load

function continous_load() {
}

// Event listener for continuous load input
con_load_power.addEventListener("input", function() {
    var value = con_load_power.value;
    var figure = /^[0-9]+(?:\.[0-9]+)?$/;

    error_notification.classList.remove("error_notificatoin");

    // Limit input length to 6 characters
    if (value.length > 6 && !value.includes(".")) {
        con_load_power.value = value.slice(0, 6);
        console.log("damn");
    }

    if (value.length > 6 && Cont_load_count < 3 && !value.includes(".")) {
      error_notification.classList.add("error_notificatoin");
      error_notification.children[0].innerHTML = "Limit Load to Practical Domestical and Commercial (Load < 1000000W)";

      Cont_load_count++;
    }

    // Remove non-numeric characters
    if (!figure.test(value)) {
        con_load_power.value = "";
    }
});

con_load_power.addEventListener("click", function(){
  con_load_power.parentElement.style.outline = "";
});

// Function to log intermittent load
function intermitent_load() {
}

// Event listener for intermittent load input
int_load_power.addEventListener("input", function() {
    var value = int_load_power.value;
    var figure = /^[0-9]+(?:\.[0-9]+)?$/;

    error_notification.classList.remove("error_notificatoin");

    // Limit input length to 6 characters
    if (value.length > 6 && !value.includes(".")) {
        int_load_power.value = value.slice(0, 6);
    }

    if (value.length > 6 && int_load_count < 3 && !value.includes(".")) {
      error_notification.classList.add("error_notificatoin");
      error_notification.children[0].innerHTML = "Limit Load to Practical Domestical and Commercial (Load < 1000000W)";

      int_load_count++;
    }

    // Remove non-numeric characters
    if (!figure.test(value)) {
        int_load_power.value = "";
    }
});

int_load_power.addEventListener("click", function(){
  int_load_power.parentElement.style.outline = "";
});

// Function to log backup time in hours
function timeHr() {
}

// Event listener for backup time in hours input
backup_time_hr.addEventListener("input", function() {
    var value = backup_time_hr.value;
    var integerPattern = /^[0-9]+$/;

    error_notification.classList.remove("error_notificatoin");


    // Remove non-numeric characters
    if (!integerPattern.test(value)) {
        backup_time_hr.value = value.toString().slice(0, 1);
        return;
    }

    // Check for impractical values
    var integerValue = parseInt(value);
    if (integerValue > 47) {
        backup_time_hr.value = integerValue.toString().slice(0, 1);

        if (integerValue > 47 && Hr_count <= 1) {
          error_notification.classList.add("error_notificatoin");
          error_notification.children[0].innerHTML = "Beyond practical battery-health backup-time for standard inverter battery operating hours (Hr <= 48).";
    
          Hr_count++;
        }
    }
});

backup_time_hr.addEventListener("click", function(){
  backup_time_hr.style.outline = "";
});

// Function to log backup time in minutes
function timeMin() {
    console.log(backup_time_Min.value);
}

// Event listener for backup time in minutes input
backup_time_Min.addEventListener("input", function() {
    var value = backup_time_Min.value;
    var integerPattern = /^[0-9]+$/;

    error_notification.classList.remove("error_notificatoin");

    // Remove non-numeric characters
    if (!integerPattern.test(value)) {
        backup_time_Min.value = value.toString().slice(0, 1);
        return;
    }

    // Check for impractical values
    var integerValue = parseInt(value);
    if (integerValue > 60) {
        backup_time_Min.value = integerValue.toString().slice(0, 1);

        if (integerValue > 47 && Min_count <= 1) {
          error_notification.classList.add("error_notificatoin");
          error_notification.children[0].innerHTML = "Enter practical minute value (Minute <= 60)";
    
          Min_count++;
        }
    }
});

backup_time_Min.addEventListener("click", function(){
  backup_time_Min.style.outline = "";
});

// Function to log utilization factor
function utilizFac() {
  error_notification.classList.remove("error_notificatoin");
}

utilization_fac.addEventListener("click", function(){
  utilization_fac.parentElement.style.outline = "";
});

// Function to calculate battery capacity
function calculate() {
    isButtonClick = true;
    // Calculate total time in hours
    let time = parseInt(backup_time_hr.value) + (parseInt(backup_time_Min.value) * 1 / 60);

    let cont_load_current_drawn;
    let int_load_current_drawn;
    let capacity_utilization;
    let int_load_percent_time;
    let DoD;
    let cont_batt_capacity;
    let intermitent_batt_capacity;

    // Determine capacity utilization based on time
    if (time <= 1.9999) {
        capacity_utilization = 0.5;
    } else if (time >= 2 && time <= 2.9999) {
        capacity_utilization = 0.633;
    } else if (time >= 3 && time <= 3.9999) {
        capacity_utilization = 0.717;
    } else if (time >= 4 && time <= 4.9999) {
        capacity_utilization = 0.782;
    } else if (time >= 5 && time <= 5.9999) {
        capacity_utilization = 0.833;
    } else if (time >= 6 && time <= 6.9999) {
        capacity_utilization = 0.879;
    } else if (time >= 7 && time <= 7.9999) {
        capacity_utilization = 0.917;
    } else if (time >= 8 && time <= 8.9999) {
        capacity_utilization = 0.950;
    } else if (time >= 9 && time <= 9.9999) {
        capacity_utilization = 0.979;
    } else if (time >= 10) {
        capacity_utilization = 1;
    }

    console.log(capacity_utilization);

    console.log(time);

    if(time < .3333){
      error_notification.classList.add("error_notificatoin");
      error_notification.children[0].innerHTML = "The backup time you've inputted is shorter than what is generally considered practical for ensuring reliable backup power (Backuptime >= 20min)";

      function empty() {
        backup_time.style.outline = "solid .2rem transparent";      
      }
        setTimeout(empty, 2000);
        backup_time.style.outline = "solid .2rem red";
      }

   else if (inverter_voltage.value == ""){
      error_notification.classList.add("error_notificatoin");
      error_notification.children[0].innerHTML = "Select Inverter Voltage";

      function empty() {
        inverter_voltage.parentElement.style.outline = "solid .2rem transparent";      }
      setTimeout(empty, 2000);
      inverter_voltage.parentElement.style.outline = "solid .2rem red";
    }

    else if(inverter_efficiency.value == ""){
      error_notification.classList.add("error_notificatoin");
      error_notification.children[0].innerHTML = "Select Inverter Efficiency";

      function empty() {
        inverter_efficiency.parentElement.style.outline = "solid .2rem transparent";      }
      setTimeout(empty, 2000);
      inverter_efficiency.parentElement.style.outline = "solid .2rem red";
    }

    else if(battery_type.value == ""){
      error_notification.classList.add("error_notificatoin");
      error_notification.children[0].innerHTML = "Select Battery Type";

      function empty() {
        battery_type.parentElement.style.outline = "solid .2rem transparent";      }
      setTimeout(empty, 2000);
      battery_type.parentElement.style.outline = "solid .2rem red";
    }

    else if(battery_voltage.value == ""){
      error_notification.classList.add("error_notificatoin");
      error_notification.children[0].innerHTML = "Select Battery Voltage";

      function empty() {
        battery_voltage.parentElement.style.outline = "solid .2rem transparent";      }
      setTimeout(empty, 2000);
      battery_voltage.parentElement.style.outline = "solid .2rem red";
    }

    else if(load_power_fac.value == ""){
      error_notification.classList.add("error_notificatoin");
      error_notification.children[0].innerHTML = "Select Laod Power Factor";

      function empty() {
        load_power_fac.parentElement.style.outline = "solid .2rem transparent";      }
      setTimeout(empty, 2000);
      load_power_fac.parentElement.style.outline = "solid .2rem red";
    }

    else if(con_load_power.value == ""){
      error_notification.classList.add("error_notificatoin");
      error_notification.children[0].innerHTML = "Enter Continous Load Power";

      function empty() {
        con_load_power.parentElement.style.outline = "solid .2rem transparent";      }
      setTimeout(empty, 2000);
      con_load_power.parentElement.style.outline = "solid .2rem red";
    }

    else if(int_load_power.value == ""){
      error_notification.classList.add("error_notificatoin");
      error_notification.children[0].innerHTML = "Enter Intermitent Load Power";

      function empty() {
        int_load_power.parentElement.style.outline = "solid .2rem transparent";      }
      setTimeout(empty, 2000);
      int_load_power.parentElement.style.outline = "solid .2rem red";
    }

    else if(backup_time_hr.value == ""){
      error_notification.classList.add("error_notificatoin");
      error_notification.children[0].innerHTML = "Enter Backup-Time (Hr)";

      function empty() {
        backup_time_hr.style.outline = "solid .2rem transparent";      }
      setTimeout(empty, 2000);
      backup_time_hr.style.outline = "solid .2rem red";
    }

    else if(backup_time_Min.value == ""){
      error_notification.classList.add("error_notificatoin");
      error_notification.children[0].innerHTML = "Enter Backup-Time (Min)";

      function empty() {
        backup_time_Min.style.outline = "solid .2rem transparent";      }
      setTimeout(empty, 2000);
      backup_time_Min.style.outline = "solid .2rem red";
    }

    else if(utilization_fac.value == ""){
      error_notification.classList.add("error_notificatoin");
      error_notification.children[0].innerHTML = "Select Percentage Utiization for Intermitent Load";

      function empty() {
        utilization_fac.parentElement.style.outline = "solid .2rem transparent";      
      }
      setTimeout(empty, 2000);
      utilization_fac.parentElement.style.outline = "solid .2rem red";
    }

    else if((parseFloat(con_load_power.value) + parseFloat(int_load_power.value)) < 5){
        error_notification.classList.add("error_notificatoin");
        error_notification.children[0].innerHTML = "Total load power is smaller than least practiacal value required for standard inverter installation (Load >= 5W)";

        function empty() {
          con_load_power.parentElement.style.outline = "solid .2rem transparent";   
          int_load_power.parentElement.style.outline = "solid .2rem transparent";     
        }
        setTimeout(empty, 2000);
        con_load_power.parentElement.style.outline = "solid .2rem red";
        int_load_power.parentElement.style.outline = "solid .2rem red";
    }

    else {
    header.classList.add("deem");
    result_bar.style.transform = "translateX(66vw)";
    result_bar.classList.add("open-close_not");
    App.classList.add("moveApp");
    
    result_bar.children[0].children[0].style.transform = "rotate(90deg)";
    
    
    // Calculate continuous load current drawn
    cont_load_current_drawn = parseFloat(con_load_power.value) / (parseFloat(inverter_voltage.value) * parseFloat(inverter_efficiency.value));

    // Calculate intermittent load current drawn
    int_load_current_drawn = parseFloat(int_load_power.value) / (parseFloat(inverter_voltage.value) * parseFloat(inverter_efficiency.value));
    
    console.log(cont_load_current_drawn);

    // Get depth of discharge (DoD) from battery type
    DoD = battery_type.value;

    // Calculate percentage of time the intermittent load is active
    int_load_percent_time = time * utilization_fac.value;

    console.log(int_load_percent_time);

    // Calculate battery capacity for continuous load
    cont_batt_capacity = Math.round(((cont_load_current_drawn * time) / (capacity_utilization)) / (DoD));
    console.log("batt_cap", cont_batt_capacity);

    // Calculate battery capacity for intermittent load
    intermitent_batt_capacity = Math.round(((int_load_current_drawn * int_load_percent_time) / (capacity_utilization)) / (DoD));

    console.log("other batt", intermitent_batt_capacity);

    // Calculate overall battery capacity
    batt_capcity = cont_batt_capacity + intermitent_batt_capacity;

    Battery_Capacity_value.innerHTML = batt_capcity + "AH";
    Battery_Ampere_value.innerHTML = Math.round(batt_capcity / parseInt(battery_voltage.value)) + "A";

    inv_mak_capacity();
    batt_series();
    batt_parallel();
  }
}

function close_notification(){
  header.classList.toggle("deem");
  result_bar.classList.toggle("open-close_not");
  App.classList.toggle("moveApp");

  if(result_bar.children[0].children[0].style.transform == "rotate(90deg)"){
    result_bar.children[0].children[0].style.transform = "rotate(-90deg)";
  }
  else{
    result_bar.children[0].children[0].style.transform = "rotate(90deg)";
  }
}

function close_bar(){
 
  header.classList.remove("deem");
  result_bar.classList.remove("open-close_not");
  App.classList.remove("moveApp");
 
  if(result_bar.children[0].children[0].style.transform == "rotate(90deg)"){
    result_bar.children[0].children[0].style.transform = "rotate(-90deg)";
  }
  else{
    result_bar.children[0].children[0].style.transform = "rotate(90deg)";
  }
}

function inv_mak_capacity() {
  let value_greater_array = [];
  let i = 0;
  let cal_inv_kva = (((parseFloat(con_load_power.value) + parseFloat(int_load_power.value)) * 1.2) / parseFloat(load_power_fac.value)/1000);
  console.log(cal_inv_kva);
  console.log(typeof(inv_market_capacity[0]));
  inv_market_capacity.forEach(function(inv_mak_cap) {
    if (parseFloat(inv_mak_cap) >= parseFloat(cal_inv_kva)) {
      value_greater_array[i] = parseFloat(inv_mak_cap);
      i++
      // console.log(inv_mak_cap, "is greater than", cal_inv_kva); 
    }
  });
  Inverter_Capacity_value.innerHTML = value_greater_array[0] + "KVA";
  if (value_greater_array.length == ""){
    Inverter_Capacity_value.innerHTML = ">1MVA";
  }
  else{
    Inverter_Capacity_value.innerHTML = value_greater_array[0] + "KVA";
  }
}

function batt_series(){
  let real_inverter_volatge = parseFloat(inverter_voltage.value) * (12/10.5);  
  Battery_In_Series_Value.innerHTML = "SERIES " + (real_inverter_volatge / parseInt(battery_voltage.value));
}

function batt_parallel(){
  // let amp_capacity = batt_capcity / parseFloat(battery_voltage.value);
  let lead_acid_battery_ampere = [7, 9, 18, 20, 25, 45, 50, 75, 100, 120, 150, 180, 200, 220, 240, 250];
  let lituim_ion_battery_ampere = [7, 9, 18, 45, 50, 75, 100, 120, 150, 180, 200, 220, 240, 250, 300];
  let nickel_cadmiu_battery_ampere = [10, 20, 50, 100, 120, 150, 180, 200, 220, 250, 280, 300, 350, 400, 500, 600, 800, 1000, 1200, 1500, 1800, 2000];

  let array_greater_lead_value = [];
  let array_greater_lead_value_division = [];
  let i = 0;
  let j = 0;
  let increase_amp_combination = 0;

  if (parseFloat(battery_type.value) == 0.7 || parseFloat(battery_type.value) == 0.8){
  
    lead_acid_battery_ampere.forEach(function(lead_amp){
      if(lead_acid_battery_ampere[j] >= parseFloat(batt_capcity)){
        array_greater_lead_value[i] = lead_amp;
        i++;
      }
      j++;
    });

   if (true){
      let lastFourElements = lead_acid_battery_ampere;
      let last_four_new = [];
      let ceil_ampere_hour = [];
      let parallel = [];
      // let increment_sort =[];
      let i = 0;
      let j = 0;
      let k = 0;
      // let l = 0;

      lastFourElements.forEach(function(last_four){
        last_four_new[i] = batt_capcity/last_four;
        i++;
      });

      console.log(lastFourElements, "lastFourElements")

      last_four_new.forEach(function(ceil){
        parallel[j] = Math.ceil(ceil);
        ceil_ampere_hour[j] = Math.ceil(ceil) * lastFourElements[j];
        j++;
      });

      let true_AH = [];
      
      ceil_ampere_hour.forEach(function(true_val_AH){
        true_AH[k] = true_val_AH - batt_capcity;
        k++
      });

      console.log(last_four_new, "last_four_new");
      console.log(ceil_ampere_hour, "ceil_ampere_hour");
      console.log(true_AH, "true_AH");

      
      // let subtractedValues = [];

      // for (let i = 0; i < last_four_new.length; i++) {
      //   let difference = ceil_four_value[i] - last_four_new[i];
      //   subtractedValues.push(difference);
      // }

      // console.log(subtractedValues, "subtractedValues");
      // let smallestDifference = Math.min(...subtractedValues);

      // Sort the subtractedValues array in ascending order
      // Sort the subtractedValues array in ascending order

      // Create a sorted array of indices based on sorted values

      // Create a sorted array of indices based on sorted values
      let sortedIndices = true_AH.map((_, index) => index).sort((a, b) => true_AH[a] - true_AH[b]);
      
      // Create an object to store the data
      let sortedData = {};
      
      // Populate the object with sorted values and their corresponding indices
      sortedIndices.forEach((sortedIndex, sortedPosition) => {
          sortedData[sortedPosition] = {
              value: true_AH[sortedIndex],
              originalIndex: sortedIndex
          };
      });
      
      // Extract the originalIndex property from each value in sortedData and store them in an array
      let originalIndexArray = Object.values(sortedData).map(obj => obj.originalIndex);
      
      function parallel_combination(){

        if(increase_amp_combination == originalIndexArray.length){
          increase_amp_combination = 0;
        }

        let find_index_ampere = originalIndexArray[increase_amp_combination];

        if ((lastFourElements[find_index_ampere] * parallel[find_index_ampere]) < batt_capcity * 1.2){
          Battery_Ampere_value.style.backgroundColor = "green";
        }
        else{
          Battery_Ampere_value.style.backgroundColor = "rgb(90, 90, 90)";
        }
        
        Battery_Ampere_value.innerHTML = lastFourElements[find_index_ampere] + "AH";
        Battery_In_Parallel_Value.innerHTML = "PARALLEL " + parallel[find_index_ampere];

        increase_amp_combination++;

        console.log(increase_amp_combination, originalIndexArray.length);
      }

      let o = 0;

      if(o == 0){
        parallel_combination();
        o++
      }

      document.getElementById('battery_ampere_click').addEventListener('click', function() {
        // Run displayNextValue function when the element is clicked
        parallel_combination();
      });

    }

    // if (m == 0){
    //   displayNextValue();
    //   m++;
    // }
    // // Attach click event listener to an element

  }
    // else{
    //   Battery_In_Parallel_Value.innerHTML = "PARALLEL " + array_greater_lead_value[0]; 

    //   Battery_Ampere_value.innerHTML = array_greater_lead_value[0] + "AH";
    // }
 


    // array_greater_lead_value.forEach(function(array_lead_compare){
    //   let i = 0;
    //   array_greater_lead_value_division[i] = batt_capcity/array_lead_compare;
    // })
  
}

// const select_container = document.querySelectorAll(".select_container");
// const inverter_voltage = document.querySelector("#inverter-voltage");
// const inverter_efficiency = document.querySelector("#inverter-efficiency");
// const battery_type = document.querySelector("#Battery-Type");
// const battery_voltage = document.querySelector("#battery-voltage");
// const load_power_fac = document.querySelector("#load-power-factor");
// const con_load_power = document.querySelector("#con-load-power");
// const int_load_power = document.querySelector("#int-load-power");
// const backup_time_hr = document.querySelector("#timeHour");
// const backup_time_Min = document.querySelector("#timeMin");
// const utilization_fac = document.querySelector("#utilization");
// const backup_time = document.querySelector("#time");
// const result_bar = document.querySelector("#result");
// const body = document.querySelector("body");
// const header = document.querySelector("header");
// const App = document.querySelector("#App");
// const cal_button = document.querySelector("#cal_button");
// const Inverter_Capacity_value = document.querySelector("#Inverter_Capacity_value");
// const Battery_Capacity_value = document.querySelector("#Battery_Capacity_value");
// const Battery_Ampere_value = document.querySelector("#Battery_Ampere_value");
// const Battery_In_Series_Value = document.querySelector("#Battery_In_Series_Value");
// const Battery_In_Parallel_Value = document.querySelector("#Battery_In_Parallel_Value");
// const battery_voltage_compare = document.querySelectorAll("#battery-voltage option");
