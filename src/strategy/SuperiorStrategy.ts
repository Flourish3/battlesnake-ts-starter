import { dir } from "console";
import { coordInDirection, isOutside, isSnakePart, closestFood, isNextToBiggerSnakeHead } from "../functions/BoardFunctions";
import { boardState } from "../tests/GameStateGenerator";
import { Direction, Outcome } from "../types/strategy";
import { DirectionResult, Strategy } from "../types/strategyTypes";
import { GameState, MoveResponse } from "../types/types";

export class SuperiorStrategy implements Strategy {

  nextMove(gameState: GameState): MoveResponse {
    const head = gameState.you.body[0];

    const closestFoodCoord = closestFood(head, gameState.board);
    console.log('Closest food: %s', closestFoodCoord);
    //Figure out direction to move to food
    let horDirection;

    if( !!closestFoodCoord && head.x > closestFoodCoord.x) {
        horDirection = Direction.LEFT;
    } else if (!!closestFoodCoord && head.x == closestFoodCoord.x){
        horDirection = null;
    } else {
        horDirection = Direction.RIGHT;
    }

    let vertDirection;
    if( !!closestFoodCoord && head.y > closestFoodCoord.y) {
        vertDirection = Direction.DOWN;
    } else if (!!closestFoodCoord && head.y == closestFoodCoord.y){
        vertDirection = null;
    } else {
        vertDirection = Direction.UP;
    }
    console.log('hor: %s, vert: %s', horDirection, vertDirection);

    const possibleDirections = [horDirection, vertDirection]
        .filter((direction) => !!direction)
        .filter((direction) => !isSnakePart(coordInDirection(head, direction!), gameState.board) && 
            !isOutside(coordInDirection(head, direction!), gameState.board) &&
            !isNextToBiggerSnakeHead(coordInDirection(head, direction!), gameState, gameState.you.length)
        );

    console.log('possible directions: %s', possibleDirections);

    return { move: possibleDirections[0]!};

  }
}