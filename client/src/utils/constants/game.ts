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

interface gameDurationType {
   label: string,
   value: string,
   type: 'blitz' | 'bullet' | 'rapid' | 'custom'
}

export const gameDurations: gameDurationType[] = [
   {label: '1 min', value: '1 min', type: 'bullet'},
   {label: '2 | 1 mins', value: '2 | 1 mins', type: 'bullet'},
   {label: '3 mins', value: '3 mins', type: 'blitz'},
   {label: '3 | 2 mins', value: '3 | 2 mins', type: 'blitz'},
   {label: '5 mins', value: '5 mins', type: 'blitz'},
   {label: '10 mins', value: '10 mins', type: 'rapid'},
   {label: '10 | 5 mins', value: '10 | 5 mins', type: 'rapid'},
   {label: '15 mins', value: '15 mins', type: 'rapid'},
   {label: 'Custom', value: 'Custom', type: 'custom'},
]
