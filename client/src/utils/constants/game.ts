export const defaultCellColors = [
   'white', 'black', 'white', 'black', 'white', 'black', 'white', 'black',
   'black', 'white', 'black', 'white', 'black', 'white', 'black', 'white',
   'white', 'black', 'white', 'black', 'white', 'black', 'white', 'black',
   'black', 'white', 'black', 'white', 'black', 'white', 'black', 'white',
   'white', 'black', 'white', 'black', 'white', 'black', 'white', 'black',
   'black', 'white', 'black', 'white', 'black', 'white', 'black', 'white',
   'white', 'black', 'white', 'black', 'white', 'black', 'white', 'black',
   'black', 'white', 'black', 'white', 'black', 'white', 'black', 'white',
]

export interface gameDurationType {
   label: string,
   value: {
      duration: number,
      increment: number
   },
   type: 'blitz' | 'bullet' | 'rapid',
}

export const gameDurations: gameDurationType[] = [
   {label: '1 min', value: {duration: 60, increment: 0}, type: 'bullet'},
   {label: '2 | 1 mins', value: {duration: 120, increment: 1}, type: 'bullet'},
   {label: '3 mins', value: {duration: 180, increment: 0}, type: 'blitz'},
   {label: '3 | 2 mins', value: {duration: 180, increment: 2}, type: 'blitz'},
   {label: '5 mins', value: {duration: 300, increment: 0}, type: 'blitz'},
   {label: '10 mins', value: {duration: 600, increment: 0}, type: 'rapid'},
   {label: '10 | 5 mins', value: {duration: 600, increment: 5}, type: 'rapid'},
   {label: '15 mins', value: {duration: 900, increment: 0}, type: 'rapid'},
]

