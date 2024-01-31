export interface CellComponentProps {
   key: string;
   cell: Cell;
   selected: boolean;
   cellColor: string;
   height: number;
   width: number;
   click: (cell: Cell) => void;
}

export interface Cell {
   square: 'a8';
   type: 'r';
   color: 'b';
}
