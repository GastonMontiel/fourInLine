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

export default validateIsWinnerPositions;
