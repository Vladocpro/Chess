export interface GameDurationProps {
   type: 'blitz' | 'bullet' | 'rapid' | 'custom';
   size: 'sm' | 'lg';
   isWithLabel: boolean;
   labelText?: string;
}
