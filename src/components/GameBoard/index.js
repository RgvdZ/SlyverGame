

// ................
// import React from 'react';
// import { animated, useSpring } from 'react-spring';

// const AnimatedButton = ({ disabled, onClick, number, index }) => {
//   const props = useSpring({ opacity: 1, transform: 'scale(1)', from: { opacity: 0, transform: 'scale(0)' }, delay: index * 100, });

//   return (<animated.button style={props} className="number-box" disabled={disabled} onClick={onClick}> {number} </animated.button>);
// };

// export default function GameBoard({ possibleNumbers, makeMove }) {
//   return (
//     possibleNumbers && possibleNumbers.map((number, index) =>
//       number > 0 ?
//         <AnimatedButton
//           key={number}
//           disabled={!number}
//           onClick={() => makeMove(number)}
//           number={number}
//           index={index}
//         />
//         : null
//     )
//   );
// }




// import React from 'react'
// import { TransitionGroup, CSSTransition } from 'react-transition-group';

// const AnimatedButton = ({ disabled, onClick, number, index }) => {
//   return (
//     <button className="number-box" disabled={disabled} onClick={onClick}>
//       {number}
//     </button>
//   );
// };

// export default function GameBoard({ possibleNumbers, makeMove }) {
//   return (
//     <TransitionGroup className="game-container">
//       {possibleNumbers && possibleNumbers.map((number, index) =>
//         number > 0 ?
//           <CSSTransition
//             key={number}
//             timeout={500}
//             classNames="fade"
//           >
//             <AnimatedButton
//               disabled={!number}
//               onClick={() => makeMove(number)}
//               number={number}
//               index={index}
//             />
//           </CSSTransition>
//           : null
//       )}
//     </TransitionGroup>
//   );
// }

export default function GameBoard({ possibleNumbers, makeMove }) {
  return (
    <div className="GameBoard">
      {possibleNumbers && possibleNumbers.map((available, number) =>
        number > 0 ? <button key={number} disabled={!available} onClick={() => makeMove(number)}>{number}</button> : null
      )}
    </div>
  )
}
