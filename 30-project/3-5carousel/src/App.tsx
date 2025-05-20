import Antd from './components/Antd';
import Responsive from './components/Responsive';
import Slick from './components/Slick';
import './App.css';
import Carousel from './components/Carousel';

function App() {
  return (
    <div>
      <Carousel loop autoLoop autoTime={1000} transitionTime={1000} direction="column">
        {/* <Carousel loop autoLoop autoTime={1000} transitionTime={1000} direction="row"> */}
        {/* <Carousel loop={true}> 와 같은 코드임 */}
        <h1 key="slide-1">hello</h1>
        <h1 key="slide-2">world</h1>
        <h1 key="slide-3">react</h1>
        <h1 key="slide-4">typescript</h1>
        <h1 key="slide-5">project</h1>
        <h1 key="slide-6">carousel</h1>
        <h1 key="slide-7">img</h1>
        <h1 key="slide-8">change</h1>
      </Carousel>
      {/* <div>Antd</div>
      <Antd />
      <div>Responsive</div>
      <Responsive />
      <div>Slick</div>
      <Slick /> */}
    </div>
  );
}

export default App;
