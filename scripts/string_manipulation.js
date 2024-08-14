let __moves = [
  ["R", "L'"],
  ["R2", "L2'"],
  ["L", "R'"],
  ["L2", "R2'"],
  ["F", "F'"],
  ["B", "B'"],
  ["r", "l'"],
  ["r2", "l2'"],
  ["l", "r'"],
  ["l2", "r2'"],
  ["f", "f'"],
  ["b", "b'"],
  ["U", "U'"],
  ["D", "D'"],
  ["u", "u'"],
  ["d", "d'"],
  ["y", "y'"],
  ["S", "S'"],
];

function mirrorAlg(alg) {
  alg = alg.replace(/\(/g, "( "); // Add space after "("
  alg = alg.replace(/\)/g, " )"); // Add space before ")"
  let algList = alg.split(" ");

  for (let indexAlg = 0; indexAlg < algList.length; indexAlg++) {
    for (let indexMirror = 0; indexMirror < __moves.length; indexMirror++) {
      if (algList[indexAlg] == __moves[indexMirror][0]) {
        algList[indexAlg] = __moves[indexMirror][1];
        continue;
      }
      if (algList[indexAlg] == __moves[indexMirror][1]) {
        algList[indexAlg] = __moves[indexMirror][0];
        continue;
      }
    }
  }
  let myMirroredAlg = algList.join(" ");
  myMirroredAlg = myMirroredAlg.replace(/ \)/g, ")"); // Remove space before ")"
  myMirroredAlg = myMirroredAlg.replace(/\( /g, "("); // Remove space after "("
  return myMirroredAlg;
}


function addRandomUMove(alg) {
  const AUF = Math.floor(Math.random() * 4);
  const algList = alg.split(" ");
  const lastMove = algList[algList.length - 1];

  if (lastMove.includes("U")) {
    algList.pop();
  }

  if (AUF === 1) {
    algList.push("U");
  } else if (AUF === 2) {
    algList.push("U2");
  } else if (AUF === 3) {
    algList.push("U'");
  }

  return algList.join(" ");
}
