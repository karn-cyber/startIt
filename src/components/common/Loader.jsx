import React from 'react';
import './common.scss';
import { Spin, Flex } from 'antd';

const App = () => {
//   const [percent, setPercent] = React.useState(-50);
//   const timerRef = React.useRef(null);

//   React.useEffect(() => {
//     timerRef.current = setTimeout(() => {
//       setPercent(v => {
//         const nextPercent = v + 5;
//         return nextPercent > 150 ? -50 : nextPercent;
//       });
//     }, 100);
//     return () => clearTimeout(timerRef.current);
//   }, [percent]);

  return (
    // <Flex justify="center" align="center" style={{ height: '100vh' }}>
    <>
    <div className="loader">
        <p>Loading, Please Wait...</p>
      <Spin size="large" />
      </div>
      </>
    // </Flex>
  );
};

export default App;
