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
   value: string,
   type: 'blitz' | 'bullet' | 'rapid' | 'custom'
}

export const gameDurations: gameDurationType[] = [
   {label: '1 min', value: '1', type: 'bullet'},
   {label: '2 | 1 mins', value: '2|1', type: 'bullet'},
   {label: '3 mins', value: '3', type: 'blitz'},
   {label: '3 | 2 mins', value: '3|2', type: 'blitz'},
   {label: '5 mins', value: '5', type: 'blitz'},
   {label: '10 mins', value: '10', type: 'rapid'},
   {label: '10 | 5 mins', value: '10|5', type: 'rapid'},
   {label: '15 mins', value: '15', type: 'rapid'},
   {label: 'Custom', value: 'Custom', type: 'custom'},
]

export const findGameDuration = (label : string) : gameDurationType | undefined => {
   return gameDurations.find((gameDuration: gameDurationType) => gameDuration.label === label)
}
