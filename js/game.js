const externalList = Array.from(Array(12).keys());
const internalList = Array.from(Array(4).keys());
const blackBall = "black";
const whiteBall = "white";
let currentTurn = "white";
const allWhiteBalls = Array.from(Array(8).keys());
const allBlackBalls = Array.from(Array(8).keys());

const ballHtml = (color) => {
  return `<div class="flex justify-center items-center"><div draggable="true" class="circle-${color} h-[38px] w-[38px]"></div></div>`
}



const drake = dragula([document.getElementById("used-balls"), ...document.querySelectorAll("[data-group='space']"), document.getElementById("availableBalls")])
drake.on('drop', function (el, target, source, sibling) {
   
  let {listToInsert, position} = target.id.includes("internal") ? {listToInsert: internalList, position: target.id.replace("internal-grid-position-", "")} : {listToInsert: externalList, position: target.id.replace("external-grid-position-", "")};
  //si el elemento y el target tienen los dos grid-position quiere decir que se esta moviendo una bola del rival analizar si es dentro de la misma lista o de otra
  //ademas se deben actualizar las listas ya existe el metodo userMoveBallFrom
  userAddBall(listToInsert, parseInt(position), currentTurn);
})

drake.on('dragend', function (el) {
  changeTurn()
  console.log(externalList, internalList);
  
})


const runGame = () => {
  document.getElementById("board").classList.remove("hidden");
  document.getElementById("startGame").classList.add("hidden");
  showTurnAndAvailableBalls();
};

const changeTurn = () => {
  validateIsWinnerPositions({ externalList, internalList, blackBall, whiteBall });
  moveBallsCounterclockwise();
  updateDomList(externalList, internalList);
  currentTurn = currentTurn === "white" ? "black" : "white";
  showTurnAndAvailableBalls();
  //deshabilitar todas las bolas del jugador actual para qu eno pueda moverlas dentro de la mesa
};

const updateDomList = (externalList, internalList) => {
  externalList.forEach((ball, index) => {
    document.getElementById(`external-grid-position-${index}`).innerHTML = ball ? ballHtml(ball) : "";
  });
  internalList.forEach((ball, index) => {    
    document.getElementById(`internal-grid-position-${index}`).innerHTML = ball ? ballHtml(ball) : "";
  });
}

const showTurnAndAvailableBalls = () => {
  document.getElementById("currentTurn").textContent = currentTurn;
  let availableBalls = "";

  document.getElementById("availableBalls").innerHTML = '';

  if (currentTurn === "white") {
    allWhiteBalls.forEach((ball) => { availableBalls += ballHtml(whiteBall) });
  } else {
    allBlackBalls.forEach((ball) => { availableBalls += ballHtml(blackBall) });
  }


  document.getElementById("availableBalls").innerHTML = availableBalls;
};



const userAddBall = (listToInsert, position, colorBall) => {
  console.log(typeof listToInsert[position]);
  
  if (typeof listToInsert[position] !== "number") return console.error("Posicion ocupada");
  listToInsert[position] = colorBall;
};

const userMoveBallFrom = (
  originOfBallList,
  originPosition,
  destinationList,
  destinationPosition
) => {
  if (destinationList[destinationPosition])
    return console.error(
      " usermoveball: Posicion ocupada",
      destinationPosition,
      destinationList[destinationPosition]
    );
  destinationList[destinationPosition] = originOfBallList[originPosition];
  originOfBallList[originPosition] = null;
};

const moveBallsCounterclockwise = () => {
  const firstBallInExternalList = externalList.shift();
  externalList.push(firstBallInExternalList);
  const firstBallInInternalList = internalList.shift();
  internalList.push(firstBallInInternalList);
};




const validateIsWinnerPositions = ({
  externalList,
  internalList,
  blackBall,
  whiteBall,
}) => {
  const allConvinationsToWin = {
    ...horizontalValidations(externalList, internalList),
    ...verticalValidations(externalList, internalList),
    ...diagonalsValidations(externalList, internalList),
  };

  for (const key in allConvinationsToWin) {
    if (
      allConvinationsToWin[key].length === 1 &&
      (allConvinationsToWin[key][0] === blackBall ||
        allConvinationsToWin[key][0] === whiteBall)
    ) {
      return { winner: key, color: allConvinationsToWin[key][0] };
    }

    return { winner: false };
  }
};

const horizontalValidations = (externalList, internalList) => {
  const horizontalOne = removeDuplicates([
    externalList[0],
    externalList[1],
    externalList[2],
    externalList[3],
  ]);
  const horizontalTwo = removeDuplicates([
    externalList[11],
    internalList[0],
    internalList[1],
    externalList[4],
  ]);
  const horizontalThree = removeDuplicates([
    externalList[10],
    internalList[2],
    internalList[3],
    externalList[5],
  ]);
  const horizontalFour = removeDuplicates([
    externalList[9],
    externalList[8],
    externalList[7],
    externalList[6],
  ]);
  return { horizontalOne, horizontalTwo, horizontalThree, horizontalFour };
};

const verticalValidations = (externalList, internalList) => {
  const verticalOne = removeDuplicates([
    externalList[0],
    externalList[11],
    externalList[10],
    externalList[9],
  ]);
  const verticalTwo = removeDuplicates([
    externalList[1],
    internalList[0],
    internalList[2],
    externalList[8],
  ]);
  const verticalThree = removeDuplicates([
    externalList[2],
    internalList[1],
    internalList[3],
    externalList[7],
  ]);
  const verticalFour = removeDuplicates([
    externalList[3],
    externalList[4],
    externalList[5],
    externalList[6],
  ]);

  return { verticalOne, verticalTwo, verticalThree, verticalFour };
};

const diagonalsValidations = (externalList, internalList) => {
  const diagonalOne = removeDuplicates([
    externalList[0],
    internalList[0],
    internalList[3],
    externalList[6],
  ]);
  const diagonalTwo = removeDuplicates([
    externalList[9],
    internalList[2],
    internalList[1],
    externalList[3],
  ]);

  return { diagonalOne, diagonalTwo };
};

const removeDuplicates = (list) => {
  return [...new Set(list)];
};


