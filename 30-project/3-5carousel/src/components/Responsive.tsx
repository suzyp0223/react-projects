import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

// 케러셀라이브러리 활용
const Responsive = () => {
  return (
    <Carousel infiniteLoop showThumbs={false} showArrows autoPlay>
      <div
        style={{
          height: 200,
          backgroundColor: 'red',
        }}
      >
        <p className="legend">Slide 1</p>
      </div>
      <div
        style={{
          height: 200,
          backgroundColor: 'orange',
        }}
      >
        <p className="legend">Slide 2</p>
      </div>
      <div
        style={{
          height: 200,
          backgroundColor: 'yellow',
        }}
      >
        <p className="legend">Slide 3</p>
      </div>
      <div
        style={{
          height: 200,
          backgroundColor: 'purple',
        }}
      >
        <p className="legend">Slide 4</p>
      </div>
      <div
        style={{
          height: 200,
          backgroundColor: 'blue',
        }}
      >
        <p className="legend">Slide 5</p>
      </div>
    </Carousel>
  );
};

export default Responsive;
