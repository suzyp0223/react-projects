import { Route, Routes } from 'react-router-dom';

import Nav from './components/Nav';
import Issue from './pages/Issue';
/**
 * Context API - 전역적인 정보 prop drilling 없이 사용할때
 * -> 굳이 사용하지 않아도 된다면,
 * hooks로 빼내어 사용한다.
 * -> hooks로 선언한 부분이 반복적으로 네트워크 콜을 유발한다면, cache를 통해서 개선해볼 수있을 것.
 */
function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path='/' element={<Issue />} />
        <Route path='/issue' element={<Issue />} />
      </Routes>
    </>
  );
}

export default App;
