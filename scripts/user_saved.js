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
  return out;
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
function exportLocalStorage() {
  // Convert localStorage to JSON
  const data = JSON.stringify(localStorage);

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
function importLocalStorage() {
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
