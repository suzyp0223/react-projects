import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

// 케러셀라이브러리 활용
// 마우스 슬라이더 + 인디케이터
const Slick = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      <div>
        <h3 style={{ height: 100, backgroundColor: 'pink' }}>1</h3>
      </div>
      <div>
        <h3 style={{ height: 100, backgroundColor: 'bricks' }}>2</h3>
      </div>
      <div>
        <h3 style={{ height: 100, backgroundColor: 'gray' }}>3</h3>
      </div>
      <div>
        <h3 style={{ height: 100, backgroundColor: 'skyblue' }}>4</h3>
      </div>
      <div>
        <h3 style={{ height: 100, backgroundColor: 'tan' }}>5</h3>
      </div>
      <div>
        <h3 style={{ height: 100, backgroundColor: 'darkgreen' }}>6</h3>
      </div>
    </Slider>
  );
};

export default Slick;
