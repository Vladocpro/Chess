import {Figure, FigureNames} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
const blackLogo = require("../../assets/bq.png");
const whiteLogo = require("../../assets/wq.png");

export class Queen extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.Queen;
    }

    getAvailableCells() {
        let cellsToMove : Cell[] = [];
        let attackingCellsToMove : Cell[] = [];
        this.cell.horizontalAndVertical(cellsToMove, attackingCellsToMove)
        this.cell.diagonal(cellsToMove, attackingCellsToMove);
        this.cellsToMove = cellsToMove;
        this.attackingCellsToMove = attackingCellsToMove;
    }

    // canMove(target:Cell) : boolean {
    //     if(!super.canMove(target)) return false;
    //     if(this.cell.isEmptyVertical(target)) return true
    //     if(this.cell.isEmptyHorizontal(target)) return true
    //     if(this.cell.isEmptyDiagonal(target)) return true
    //     return false;
    // }

}