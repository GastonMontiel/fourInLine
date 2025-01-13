import { externalList, internalList } from "./gameConfig.js";

const moveBallsCounterclockwise = () => {
    const firstBallInExternalList = externalList.shift();
    externalList.push(firstBallInExternalList);
    const firstBallInInternalList = internalList.shift();
    internalList.push(firstBallInInternalList);
};


export { moveBallsCounterclockwise };
