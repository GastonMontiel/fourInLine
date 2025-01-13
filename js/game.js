import { blackBall, externalList, internalList, whiteBall } from "./gameConfig.js";
import validateIsWinnerPositions from "./winerValidation.js";
import { userAddBall, userMoveBallFrom } from "./userActions.js";

userAddBall(externalList, 0, blackBall);
userAddBall(externalList, 1, blackBall);
userAddBall(externalList, 2, blackBall);
userAddBall(externalList, 3, blackBall);

const dataToValidateWinner = { externalList, internalList, blackBall, whiteBall }

console.log(validateIsWinnerPositions(dataToValidateWinner));
console.log(externalList, internalList);

