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
let hintSelection = 2;
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

  // Saving hint settings
  localStorage.setItem("hintSelection", hintSelection);

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

  /*
  for (let indexGroup = 0; indexGroup < GROUPS.length; indexGroup++) {
    const GROUP = GROUPS[indexGroup];
    for (let indexCategory = 0; indexCategory < GROUP.categoryCases.length; indexCategory++) {
      localStorage.setItem(GROUP.saveName + "collapse" + indexCategory, GROUP.collapse[indexCategory]);

      let categoryItems = GROUP.categoryCases[indexCategory];
      // for (let indexCategoryItem = 0; indexCategoryItem < categoryItems.length; indexCategoryItem++) {
      //   let indexCase = categoryItems[indexCategoryItem] - 1;
      // }

      for (let indexCategoryItem = 0; indexCategoryItem < categoryItems.length; indexCategoryItem++) {
        let indexCase = categoryItems[indexCategoryItem] - 1;

        // Save Case Selection
        localStorage.setItem(GROUP.saveName + "caseSelection" + indexCase, GROUP.caseSelection[indexCase]);
        // Save Custom Algorithms
        localStorage.setItem(GROUP.saveName + "customAlgorithms" + indexCase, GROUP.customAlgorithms[indexCase]);
        // Save Algorithm Selection
        localStorage.setItem(GROUP.saveName + "algorithmSelection" + indexCase, GROUP.algorithmSelection[indexCase]);
      }
    }
    // console.log(JSON.stringify(GROUP.solveCounter));
    localStorage.setItem(GROUP.saveName + "solveCounter", JSON.stringify(GROUP.solveCounter));
  }
  */
  // updateHintVisibility();
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

  temp = localStorage.getItem("hintSelection");
  if (temp != null) {
    if (temp == "true") {
      // Select 2 (3D Cube) as default if localStorage is "true" from previous save without 3D Cube option
      hintSelection = 2;
    } else hintSelection = parseInt(temp);
  }

  leftSelection = loadBoolean("leftSelection", leftSelection);
  rightSelection = loadBoolean("rightSelection", rightSelection);
  aufSelection = loadBoolean("aufSelection", aufSelection);
  timerEnabled = loadBoolean("timerEnabled", timerEnabled);

  for (let indexGroup = 0; indexGroup < GROUPS.length; indexGroup++) {
    const GROUP = GROUPS[indexGroup];

    // New Restore Code Start
    GROUP.collapse = loadList(GROUP, "collapse", false);
    /*temp = localStorage.getItem(GROUP.saveName + "collapse");
    if (temp !== null) {
      GROUP.collapse = JSON.parse(temp);
    }*/

    // Load Case Selection
    GROUP.caseSelection = loadList(GROUP, "caseSelection", 0);

    /*
    if (temp !== null) {
      GROUP.caseSelection = JSON.parse(temp);
    } else {
      GROUP.caseSelection = Array(GROUP.numberCases).fill(0);
    }
*/
    // Load Custom Algorithms
    GROUP.customAlgorithms = loadList(GROUP, "customAlgorithms", "");

    /*temp = localStorage.getItem(GROUP.saveName + "customAlgorithms");
    if (temp !== null) {
      tamp = JSON.parse(temp);
      if (temp.length > 0) {
        GROUP.customAlgorithms = temp;
      }
    } else {
      GROUP.customAlgorithms = Array(GROUP.numberCases).fill("");
    }*/

    // Load Algorithm Selection
    GROUP.algorithmSelection = loadList(GROUP, "algorithmSelection", 0);

    /*    temp = localStorage.getItem(GROUP.saveName + "algorithmSelection");
    if (temp !== null && temp.length > 0) {
      GROUP.algorithmSelection = JSON.parse(temp);
    } else {
      GROUP.algorithmSelection = Array(GROUP.numberCases).fill(0);
    }
      */
    // New Restore Code End

    /*    for (let indexCategory = 0; indexCategory < GROUP.categoryCases.length; indexCategory++) {
      temp = localStorage.getItem(GROUP.saveName + "collapse" + indexCategory);
      if (temp !== null && temp == "true") {
        GROUP.collapse.push(true);
      } else {
        GROUP.collapse.push(false);
      }
    }*/

    /*
    for (let indexCase = 0; indexCase < GROUP.numberCases; indexCase++) {
      // Load Case Selection

      temp = localStorage.getItem(GROUP.saveName + "caseSelection" + indexCase);
      if (temp !== null && temp >= 0 && temp <= 2) {
        GROUP.caseSelection.push(temp);
      } else {
        // If site visited first time - set basic cases -> category 1 to "Learning"
        if (indexGroup == 0) {
          if (indexCase == 3) {
            GROUP.caseSelection.push(0);
          } else if (indexCase == 2) {
            GROUP.caseSelection.push(2);
          } else if (indexCase == 0) {
            GROUP.caseSelection.push(1);
          } else if (indexCase == 1) {
            GROUP.caseSelection.push(1);
          } else {
            GROUP.caseSelection.push(0);
          }
        } else {
          GROUP.caseSelection.push(0);
        }
      }

      // Load Custom Algorithms
      temp = localStorage.getItem(GROUP.saveName + "customAlgorithms" + indexCase);
      if (temp !== null) {
        GROUP.customAlgorithms.push(temp);
      } else {
        GROUP.customAlgorithms.push("");
      }

      // Load Algorithm Selection
      temp = localStorage.getItem(GROUP.saveName + "algorithmSelection" + indexCase);
      if (temp !== null) {
        GROUP.algorithmSelection.push(temp);
      } else {
        GROUP.algorithmSelection.push(0);
      }
    }
      */

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
  console.log("saveName = " + group.saveName + saveName);
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

// Export Data is broken with new advanced Cases
function exportUserData() {
  let exportNumberStrs = [];
  let exportAlgSels = [];

  for (let indexGroup = 0; indexGroup < GROUPS.length; indexGroup++) {
    const GROUP = GROUPS[indexGroup];

    // Gernerate Case selection export
    exportNumberStrs[indexGroup] = encodeBase3ToBase62(GROUP.caseSelection);

    // Gernerate Alg selection export
    let exportAlgSel = "";
    for (let indexCase = 0; indexCase < GROUP.numberCases; indexCase++) {
      if (GROUP.algorithmSelection[indexCase] != 0) {
        let temp = indexCase.toString(36);
        if (temp.length == 1) temp = "0" + temp;
        temp += GROUP.algorithmSelection[indexCase];
        exportAlgSel += temp;
      }
    }
    exportAlgSels[indexGroup] = exportAlgSel;
  }

  const URL_EXPORT =
    "https://f2l-trainer.top/?bc=" +
    exportNumberStrs[0] +
    "&bcb=" +
    exportNumberStrs[1] +
    "&ac=" +
    exportNumberStrs[2] +
    "&ec=" +
    exportNumberStrs[3] +
    "&a=" +
    exportAlgSels[0] +
    "&b=" +
    exportAlgSels[1] +
    "&c=" +
    exportAlgSels[2] +
    "&d=" +
    exportAlgSels[3];

  ELEM_INPUT_EXPORT.value = URL_EXPORT;
}

function importUserDataCases(URL_PARAM_CASE_SELECTION) {
  console.log("Importing case selection");
  for (let indexGroup = 0; indexGroup < GROUPS.length; indexGroup++) {
    const GROUP = GROUPS[indexGroup];

    GROUP.caseSelection.length = 0;
    const IMPORT_DATA_STRING = URL_PARAM_CASE_SELECTION[indexGroup];
    console.log(IMPORT_DATA_STRING);
    if (IMPORT_DATA_STRING === undefined) continue;

    const base3Number = decodeBase62ToBase3(IMPORT_DATA_STRING);
    let base3List = Array(GROUP.numberCases).fill(0);
    for (let i = 0; i < base3Number.length; i++) {
      base3List[GROUP.numberCases - 1 - i] = Number(base3Number[base3Number.length - 1 - i]);
    }

    GROUP.caseSelection = base3List;
    localStorage.setItem(GROUP.saveName + "caseSelection", JSON.stringify(GROUP.caseSelection));
  }
}

function importUserDataAlgs(URL_PARAM_ALG_SELECTION) {
  console.log("Importing alg selection");
  for (let indexGroup = 0; indexGroup < GROUPS.length; indexGroup++) {
    const GROUP = GROUPS[indexGroup];
    const IMPORT_DATA_STRING = URL_PARAM_ALG_SELECTION[indexGroup];
    if (IMPORT_DATA_STRING === undefined) continue;

    for (var i = 0; i < IMPORT_DATA_STRING.length; i += 3) {
      const INDEX_CASE = parseInt(IMPORT_DATA_STRING.slice(i, i + 2), 36);
      const ALG_SEL = parseInt(IMPORT_DATA_STRING.slice(i + 2, i + 3), 36);

      if (INDEX_CASE >= GROUP.numberCases) continue;

      // Restoring, editing and savind is not clean but GROUP.algorithmSelection is empty at this point. Restoring from memory fixes it.
      GROUP.algorithmSelection = JSON.parse(localStorage.getItem(GROUP.saveName + "algorithmSelection"));
      GROUP.algorithmSelection[INDEX_CASE] = ALG_SEL;
      localStorage.setItem(GROUP.saveName + "algorithmSelection", JSON.stringify(GROUP.algorithmSelection));
    }
  }
}

/**
 * Encodes a base-3 number into a Base62 string.
 * @param {list} base3Number - A string representing the base-3 number.
 * @returns {string} - The encoded Base62 string.
 */
function encodeBase3ToBase62(base3Number) {
  // Step 1: Convert base-3 string to decimal integer
  console.log("original: " + base3Number.join(""));
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

  console.log("decoded:  " + base3Number);
  return base3Number;
}
