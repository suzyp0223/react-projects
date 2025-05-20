import { Carousel } from 'antd';

// 케러셀라이브러리 활용
const Antd = () => {
  return (
    <Carousel style={{ width: '500px' }}>
      <div>
        <div
          style={{
            height: '160px',
            color: '#fff',
            lineHeight: '160px',
            textAlign: 'center',
            background: '#364d79',
          }}
        >
          <img src="https://camo.githubusercontent.com/f6bf5ee2b30310ad83a81212b9be69bdc2bb577f2ebe868ad89f8586b4721ffc/68747470733a2f2f67772e616c697061796f626a656374732e636f6d2f7a6f732f726d73706f7274616c2f4b4470677667754d704766716148506a6963524b2e737667" />
        </div>
      </div>
      <div
        style={{
          height: '160px',
          color: '#fff',
          lineHeight: '160px',
          textAlign: 'center',
          background: '#364d79',
        }}
      >
        fastcampus
      </div>
      <div
        style={{
          height: '160px',
          color: '#fff',
          lineHeight: '160px',
          textAlign: 'center',
          background: '#364d79',
        }}
      >
        react
      </div>
      <div
        style={{
          height: '160px',
          color: '#fff',
          lineHeight: '160px',
          textAlign: 'center',
          background: '#364d79',
        }}
      ></div>
    </Carousel>
  );
};

export default Antd;
