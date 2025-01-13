import { moveBallsCounterclockwise } from "./gameActions";

const userAddBall = (listToInsert, position, colorBall) => {
    if (listToInsert[position]) return console.error("Posicion ocupada");
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
    moveBallsCounterclockwise();
  };

  export { userAddBall, userMoveBallFrom };
