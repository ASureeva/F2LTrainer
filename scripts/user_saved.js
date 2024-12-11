// Basic
let basicTrash = [];
let basicCaseSelection = [];
let basicAlgorithmSelection = [];
let basicCustomAlgorithms = [];
let basicCollapse = [];
let basicSolveCounter = [];

// Basic Back
let basicBackTrash = [];
let basicBackCaseSelection = [];
let basicBackAlgorithmSelection = [];
let basicBackCustomAlgorithms = [];
let basicBackCollapse = [];
let basicBackSolveCounter = [];

// Advanced
let advancedTrash = [];
let advancedCaseSelection = [];
let advancedAlgorithmSelection = [];
let advandedCustomAlgorithms = [];
let advancedCollapse = [];
let advancedSolveCounter = [];

// Expert
let expertTrash = [];
let expertCaseSelection = [];
let expertAlgorithmSelection = [];
let expertCustomAlgorithms = [];
let expertCollapse = [];
let expertSolveCounter = [];

// View selection
let viewSelection = 0;

// 0 -> unlearned
// 1 -> learning
// 2 -> finished
let trainStateSelection = [false, true, false];

// 0 -> basic
// 1 -> basic back
// 2 -> advanced
// 3 -> expert
let trainGroupSelection = [true, true, true, true];

let leftSelection = true;
let rightSelection = true;
let aufSelection = true;
let hintImageSelection = 2;
let hintAlgSelection = 0;
let timerEnabled = false;

let firstVisit = true;
let firstVisitTrain = true;

// Character set for Base62 encoding
const BASE62_CHARSET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const BASE = 62;

// Save
function saveUserData() {
  console.log("Saving User Data");
  flagSave = true;

  // Saving trainStateSelection
  for (let i = 0; i < trainStateSelection.length; i++) {
    localStorage.setItem("trainStateSelection" + i, trainStateSelection[i]);
  }
  // Saving trainGroupSelection
  for (let i = 0; i < trainGroupSelection.length; i++) {
    localStorage.setItem("trainGroupSelection" + i, trainGroupSelection[i]);
  }

  // Saving viewSelection
  localStorage.setItem("viewSelection", viewSelection);

  // Saving left right train selection
  localStorage.setItem("leftSelection", leftSelection);
  localStorage.setItem("rightSelection", rightSelection);

  // Saving AUF selection
  localStorage.setItem("aufSelection", aufSelection);

  // Saving hint image settings
  localStorage.setItem("hintImageSelection", hintImageSelection);
  // Saving hint alg settings

  localStorage.setItem("hintAlgSelection", hintAlgSelection);

  // Saving timer enable settings
  localStorage.setItem("timerEnabled", timerEnabled);

  // Saving that the user just visited the site
  localStorage.setItem("firstVisit", false);

  for (let indexGroup = 0; indexGroup < GROUPS.length; indexGroup++) {
    const GROUP = GROUPS[indexGroup];
    // Save Collapse
    localStorage.setItem(GROUP.saveName + "collapse", JSON.stringify(GROUP.collapse));
    // Save Case Selection
    localStorage.setItem(GROUP.saveName + "caseSelection", JSON.stringify(GROUP.caseSelection));
    // Save Custom Algorithms
    localStorage.setItem(GROUP.saveName + "customAlgorithms", JSON.stringify(GROUP.customAlgorithms));
    // Save Algorithm Selection
    localStorage.setItem(GROUP.saveName + "algorithmSelection", JSON.stringify(GROUP.algorithmSelection));
    // Save Solve Counter
    localStorage.setItem(GROUP.saveName + "solveCounter", JSON.stringify(GROUP.solveCounter));
  }
}

// Load
function loadUserData() {
  console.log("Loading User Data");
  let temp;

  // Load viewSelection
  temp = localStorage.getItem("viewSelection");
  if (temp != null) viewSelection = parseInt(temp);

  // Check if user visits site for the first time
  if (localStorage.getItem("firstVisit") != null) firstVisit = false;

  // Check if user visits train view for the first time
  if (localStorage.getItem("firstVisitTrain") != null) firstVisitTrain = false;

  // Load trainStateSelection
  for (let i = 0; i < trainStateSelection.length; i++) {
    trainStateSelection[i] = loadBoolean("trainStateSelection" + i, trainStateSelection[i]);
  }

  // Load trainGroupSelection
  for (let i = 0; i < trainGroupSelection.length; i++) {
    trainGroupSelection[i] = loadBoolean("trainGroupSelection" + i, trainGroupSelection[i]);
  }

  temp = localStorage.getItem("hintImageSelection");
  if (temp != null) {
    hintImageSelection = parseInt(temp);
  }

  temp = localStorage.getItem("hintAlgSelection");
  if (temp != null) {
    hintAlgSelection = parseInt(temp);
  }

  leftSelection = loadBoolean("leftSelection", leftSelection);
  rightSelection = loadBoolean("rightSelection", rightSelection);
  aufSelection = loadBoolean("aufSelection", aufSelection);
  timerEnabled = loadBoolean("timerEnabled", timerEnabled);

  for (let indexGroup = 0; indexGroup < GROUPS.length; indexGroup++) {
    const GROUP = GROUPS[indexGroup];

    // New Restore Code Start
    GROUP.collapse = loadList(GROUP, "collapse", false);
    // Load Case Selection
    GROUP.caseSelection = loadList(GROUP, "caseSelection", 0);
    // Load Custom Algorithms
    GROUP.customAlgorithms = loadList(GROUP, "customAlgorithms", "");

    // Load Algorithm Selection
    GROUP.algorithmSelection = loadList(GROUP, "algorithmSelection", 0);

    // Load Solve Counter
    temp = localStorage.getItem(GROUP.saveName + "solveCounter");
    if (temp !== null) {
      GROUP.solveCounter = JSON.parse(temp);
    } else {
      // Populate array with zeroes
      GROUP.solveCounter = Array(GROUP.numberCases).fill(0);
    }
  }

  updateCheckboxStatus();
  updateHintVisibility();
}

function loadBoolean(saveName, defaultValue) {
  const TEMP = localStorage.getItem(saveName);
  if (TEMP != null) {
    if (TEMP == "true") {
      return true;
    } else {
      return false;
    }
  } else {
    return defaultValue;
  }
}

function loadList(group, saveName, defaultValue) {
  let out;
  let temp = localStorage.getItem(group.saveName + saveName);
  // console.log("saveName = " + group.saveName + saveName);
  if (temp !== null) {
    temp = JSON.parse(temp);
    if (temp.length > 0) {
      out = temp;
    } else {
      out = Array(group.numberCases).fill(defaultValue);
    }
  } else {
    out = Array(group.numberCases).fill(defaultValue);
  }
  // In previous versions the localstorage save had an issue where some entries
  // would be added to the end of the array. This made the lists immensly large.
  // To fix this, the list is sliced to the correct length.
  return out.slice(0, group.numberCases);
  // return out;
}

function clearUserData() {
  if (confirm("Reset all saved data? (learning states, selected/custom algorithms)")) {
    console.log("Clearing");
    localStorage.clear();
    console.log("localStorage: " + localStorage);
    location.reload();
  }
}

function setFirstVisitTrain() {
  // Saving that the user visited the Train View the first time
  localStorage.setItem("firstVisitTrain", false);
}

/**
 * Exports the current localStorage data as a query parameter
 * in the current window's URL. This allows for easy sharing
 * of the localStorage data as a URL, and can be used to
 * import the data using the `importLocalStorage` function.
 * @returns {string} The generated URL with the query parameter
 * containing the localStorage data.
 */
function exportLocalStorageOld() {
  // These are the keys of localstorage that get exported to the URL
  const keysToExport = [
    "basic_caseSelection",
    "advanced_caseSelection",
    "basicBack_caseSelection",
    "expert_caseSelection",
  ];
  // "basic_algorithmSelection",
  // "basicBack_algorithmSelection",
  // "advanced_algorithmSelection",
  // "expert_algorithmSelection",

  const selectedData = {};
  keysToExport.forEach((key) => {
    const value = localStorage.getItem(key);
    if (value !== null) {
      selectedData[key] = value; // Include only existing keys
    }
  });
  const data = JSON.stringify(selectedData); // Convert selected data to JSON

  // Encode JSON for use in URL
  const encodedData = encodeURIComponent(data);

  // Base URL of your site
  let baseURL = window.location.origin;

  // If on localhost, use a different base URL
  if (baseURL == "http://127.0.0.1:5500") baseURL = "http://127.0.0.1:5500/F2LTrainer/index.html";

  // Append query param
  const exportURL = `${baseURL}?localStorage=${encodedData}`;

  console.log("Export URL:", exportURL);
  ELEM_INPUT_EXPORT.value = exportURL;
}

/**
 * Imports localStorage data from the current URL's query parameter.
 * Parses the URL to extract the `localStorage` parameter, decodes it,
 * and attempts to restore each key-value pair into the browser's localStorage.
 * Logs a success message if the import is successful, or an error message
 * if the process fails or if no data is found.
 */
function importLocalStorageOld() {
  // Parse URL params
  const urlParams = new URLSearchParams(window.location.search);

  // Get `localStorage` param
  const encodedData = urlParams.get("localStorage");

  // If no data is found, return
  if (!encodedData) return;

  // Ask user to import data from URL
  if (confirm("Import data from URL?")) {
    // Attempt to import data
    try {
      // Decode JSON
      const data = JSON.parse(decodeURIComponent(encodedData));

      // Restore each item
      for (const [key, value] of Object.entries(data)) {
        localStorage.setItem(key, value);
      }
      console.log("LocalStorage imported successfully.");
    } catch (error) {
      console.error("Failed to import localStorage:", error);
    }
  }

  // Reset URL in addressbar
  if (window.location.hostname == "127.0.0.1") {
    window.history.pushState({}, document.title, "/F2LTrainer/index.html");
  } else {
    window.history.pushState({}, document.title, "/");
  }
}

function exportLocalStorage() {
  // Base URL of your site
  let baseURL = window.location.origin;

  // If on localhost, use a different base URL
  if (baseURL == "http://127.0.0.1:5500") baseURL = "http://127.0.0.1:5500/F2LTrainer/index.html";

  exportURL = baseURL + "?";
  GROUPS.forEach((group, i) => {
    // Case selection
    const caseSelection = group.caseSelection;
    console.log("caseSelection", caseSelection);
    const caseSelectionString = caseSelection.join("");
    console.log("caseSelectionString", caseSelectionString);
    base62String = encodeBase3ToBase62(caseSelectionString);
    console.log("base62String", base62String);
    base3Number = decodeBase62ToBase3(base62String);
    console.log("base3Number", base3Number);
    exportURL += "&" + group.saveNameCasesURL + "=" + base62String;
  });
  console.log("exportURL: " + exportURL);
  ELEM_INPUT_EXPORT.value = exportURL;
  // importData(exportURL);
}

function importLocalStorage() {
  const urlParams = new URLSearchParams(window.location.search);
  console.log("urlParams", urlParams);

  // If no URL parameters found, return
  if (!urlParams.size) return;

  if (confirm("Import data from URL?")) {
    GROUPS.forEach((group, i) => {
      const saveName = group.saveNameCasesURL;
      console.log("saveName", saveName);
      const base62String = urlParams.get(group.saveNameCasesURL);
      console.log("base62String", base62String);
      if (base62String === null) return;
      let base3Number = decodeBase62ToBase3(base62String);
      console.log("base3Number", base3Number);

      // Fill list with 0s until it has the correct length
      // Reason: Leading zeroes were discarded when converted to number
      while (base3Number.length < group.numberCases) base3Number = "0" + base3Number;
      console.log("base3Number", base3Number);

      let caseSelectionList = base3Number.split("");
      console.log("caseSelectionList", caseSelectionList);

      localStorage.setItem(group.saveName + "caseSelection", JSON.stringify(caseSelectionList));
    });
  }

  // Reset URL in addressbar
  if (window.location.hostname == "127.0.0.1") {
    window.history.pushState({}, document.title, "/F2LTrainer/index.html");
  } else {
    window.history.pushState({}, document.title, "/");
  }
}

function encodeBase3ToBase62(base3Number) {
  // Step 1: Convert base-3 string to decimal integer
  // console.log("original: " + base3Number.join(""));
  let decimalValue = BigInt(0);
  for (let i = 0; i < base3Number.length; i++) {
    decimalValue = decimalValue * BigInt(3) + BigInt(base3Number[i]);
  }
  //console.log("decimalValue: " + decimalValue);

  // Step 2: Convert decimal to Base62 string
  let base62String = "";
  do {
    const remainder = decimalValue % BigInt(BASE);
    base62String = BASE62_CHARSET[Number(remainder)] + base62String;
    decimalValue = decimalValue / BigInt(BASE);
  } while (decimalValue > 0);

  return base62String;
}

/**
 * Decodes a Base62 string back into a base-3 number.
 * @param {string} base62String - The encoded Base62 string.
 * @returns {list} - The original base-3 number as a string.
 */
function decodeBase62ToBase3(base62String) {
  // Step 1: Convert Base62 string to decimal integer
  let decimalValue = BigInt(0);
  for (let i = 0; i < base62String.length; i++) {
    const char = base62String[i];
    const digit = BigInt(BASE62_CHARSET.indexOf(char));
    decimalValue = decimalValue * BigInt(BASE) + digit;
  }

  // Step 2: Convert decimal integer back to base-3 string
  let base3Number = "";
  do {
    const remainder = decimalValue % BigInt(3);
    base3Number = remainder.toString() + base3Number;
    decimalValue = decimalValue / BigInt(3);
  } while (decimalValue > 0);

  // console.log("decoded:  " + base3Number);
  return base3Number;
}
