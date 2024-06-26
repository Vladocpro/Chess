import {FC} from 'react';

interface GameDurationIconProps {
   type: string;
   iconStyles?: string;
}

const GameDurationIcon: FC<GameDurationIconProps> = ({type, iconStyles}) => {


   switch (type) {
      case 'bullet': {
         return (
             <svg xmlns="http://www.w3.org/2000/svg" className={`${iconStyles}`}
                  viewBox={'0 0 90 90'}>
                <path
                    d="M16.81 38.64 5 51.61l12.2-8.65c-.28-1.51-.41-2.96-.39-4.32zM27.89 62.33c-.77-.77-1.5-1.57-2.21-2.41L5.1 84.79l24.84-20.56c-.71-.61-1.39-1.24-2.04-1.9h-.01z"
                    fill="#F7C631"/>
                <path
                    d="M74.65 50.89 39.33 15.57 22.71 32.19c-5.55 5.55-.9 19.14 7.64 27.68 3.42 3.42 7.64 6.21 11.84 7.98l14.73-11.51-5.3 6.6c-.09.09-.18.18-.26.29l-3.49 4.38-1.37 1.7h.01l-12.35 15.5 18.81-14.99c2.01-.26 3.76-1 5.06-2.3L74.65 50.9v-.01z"
                    fill="#F7C631"/>
                <path
                    d="m39.33 15.57-5.95 5.95c-1.18 7.3 3.68 18.22 10.39 24.93 6.31 6.31 16.75 11.36 24.31 11.01l6.57-6.57-35.32-35.32z"
                    fill="#CF8D1B"/>
                <path
                    d="M46.97 43.25c8.54 8.54 22.13 13.19 27.68 7.64 10.86-10.86 13.16-36.1 6.97-42.29-6.19-6.19-31.42-3.9-42.29 6.97-5.55 5.55-.9 19.14 7.64 27.68z"
                    fill="#F7C631"/>
                <path
                    d="M25.24 36.23s4.13-1.77 9.44-4.44a28.91 28.91 0 0 1-1.22-4.8c-5.01 5.04-8.22 9.24-8.22 9.24zM36.34 64.7c1.9 1.24 3.88 2.3 5.85 3.14l13.89-10.85c.54-.54 1.06-1.07 1.57-1.6a42.94 42.94 0 0 1-6.68-3.34c-4.15 3.54-9.01 7.74-14.62 12.66l-.01-.01zM60.13 10.36c-6.02.93-12.12 4.4-17.49 8.51-2 1.53-3.9 3.15-5.66 4.76.15 1.97.65 4.09 1.43 6.24 3.2-1.71 6.57-3.64 9.59-5.65 1.36-.9 2.65-1.82 3.82-2.74 9.43-7.41 22.33-12.02 22.33-12.02s-5.82-.36-14.01.9h-.01zM64.49 40.72c-2.44 1.99-5.76 4.74-10 8.32 2.04 1.2 4.13 2.18 6.19 2.9 2.74-3.32 4.72-6.4 6.11-8.91 2.18-3.93 2.93-6.5 2.93-6.5s-1.71 1.32-5.24 4.2l.01-.01z"
                    fill="#FCE26A" opacity=".5"/>
             </svg>

         )
      }
      case'blitz': {
         return (
             <svg xmlns="http://www.w3.org/2000/svg" className={`${iconStyles}`}
                  viewBox={'0 0 90 90'}>
                <path
                    d="m67.85 30.08-12.87 2.44L67.94 7.05V3.19L65.74 0 48.56 6.43 19.94 48.36l2.21 3.19h12.33l-8.11 35.26 2.2 3.19H32l38.06-52.87v-3.86l-2.21-3.19z"
                    fill="#E3AA24"/>
                <path d="M65.74 0v3.86L52.4 30.08h15.45v3.86L29.8 86.81h-3.43l7.71-38.45H19.94L31.89 0h33.85z"
                      fill="#F7C631"/>
                <path d="M41.55 32.79H62.7L34.04 63.95l7.51-31.16zM34.54 3.1H58.4L26.07 38.25 34.54 3.1z"
                      fill="#FCE26A"/>
             </svg>
         );
      }
      default: {
         return (
             <svg xmlns="http://www.w3.org/2000/svg" className={`${iconStyles}`}
                  viewBox={'0 0 90 90'}>
                <path d="M50.42 8.14H39.57v8.36h10.85V8.14z" fill="#5D9948"/>
                <path
                    d="M55.12 0H34.89a2.92 2.92 0 0 0-2.92 2.92v4.41a2.92 2.92 0 0 0 2.92 2.92h20.23a2.92 2.92 0 0 0 2.92-2.92V2.92A2.92 2.92 0 0 0 55.12 0z"
                    fill="#81B64C"/>
                <path
                    d="M45 90c20.97 0 37.97-17 37.97-37.97S65.97 14.06 45 14.06s-37.97 17-37.97 37.97S24.03 90 45 90z"
                    fill="#5D9948"/>
                <path
                    d="M66.58 20.78A37.798 37.798 0 0 0 45 14.05c-20.97 0-37.97 17-37.97 37.98 0 8.99 3.13 17.25 8.35 23.75 27.87-3.52 49.64-26.57 51.21-55h-.01z"
                    fill="#81B64C"/>
                <path
                    d="M45 78.8c14.785 0 26.77-11.985 26.77-26.77S59.785 25.26 45 25.26 18.23 37.245 18.23 52.03 30.215 78.8 45 78.8z"
                    fill="#E8E6E1"/>
                <path
                    d="M64.43 33.62c-4.88-5.15-11.78-8.37-19.43-8.37-14.78 0-26.77 11.98-26.77 26.77 0 8.34 3.81 15.78 9.79 20.69 17.58-6.4 31.24-20.96 36.41-39.09z"
                    fill="#fff"/>
                <path
                    d="m51.19 50.67-5.54-16.08a.622.622 0 0 0-.64-.58c-.3 0-.6.19-.64.58l-5.54 16.08c-.21.64-.33 1.33-.33 2.04a6.521 6.521 0 0 0 13.04 0c0-.71-.12-1.4-.33-2.04h-.02z"
                    fill="#5D9948"/>
                <path
                    d="M45 34.01c-.3 0-.6.19-.64.58l-5.54 16.08c-.21.64-.33 1.33-.33 2.04 0 3.6 2.92 6.52 6.52 6.52V34.01H45z"
                    fill="#81B64C"/>
                <path
                    d="M45 23.98c-15.49 0-28.05 12.56-28.05 28.05S29.51 80.08 45 80.08s28.05-12.56 28.05-28.05S60.49 23.98 45 23.98zm0 54.07c-14.37 0-26.02-11.65-26.02-26.02S30.63 26.01 45 26.01s26.02 11.65 26.02 26.02S59.37 78.05 45 78.05z"
                    fill="#45753C"/>
             </svg>
         );
      }
   }
};

export default GameDurationIcon;
