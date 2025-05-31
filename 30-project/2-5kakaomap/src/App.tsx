import { useEffect } from "react";
import "./App.css";

declare global {
  interface Window {
    kakao: any;
  }
}

function App() {
  useEffect(() => {
    // ✅ 이미 로드된 경우 중복 로딩 방지
    if (document.getElementById("kakao-script")) return;

    const script = document.createElement("script");
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=b0aa2fb4d2b2a4d20a261281c0a191bc&autoload=false";
    script.async = true;

    script.onload = () => {
      // 스크립트 로딩 후 kakao 객체 접근
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        if (!container) return;

        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };

        new window.kakao.maps.Map(container, options);
      });
    };

    document.head.appendChild(script);
  }, []);

  return (
    <div className="App">
      <h1>카카오맵 테스트</h1>
      <div id="map" style={{ width: 300, height: 300 }}></div>
    </div>
  );
}

export default App;
