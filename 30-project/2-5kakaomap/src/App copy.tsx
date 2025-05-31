// src/App.tsx
import { useState } from "react";

import "./App.css";

import KakaoMap from "./components/KakaoMap";
import MarkerList from "./components/MarkerList";

export interface MarkerData {
  id: number;
  lat: number;
  lng: number;
  name: string;
}

function App() {
  const [markerList, setMarkerList] = useState<MarkerData[]>([]);

  return (
    <div style={{ display: "flex" }}>
      <header>
        <h1>카카오맵 테스트</h1>
      </header>

      <main>
        <KakaoMap markerList={markerList} setMarkerList={setMarkerList} />
        <MarkerList markerList={markerList} />
      </main>

      <footer>
        <p>© 2025 Suzy Park</p>
      </footer>
    </div>
  );
}

export default App;
