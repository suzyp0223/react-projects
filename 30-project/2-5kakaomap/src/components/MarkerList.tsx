import type { MarkerData } from "../App";

interface Props {
  markerList: MarkerData[];
}

const MarkerList = ({ markerList }: Props) => {
  return (
    <div style={{ width: "50%", padding: "1rem", backgroundColor: "#f0f0f0" }}>
      <h2>📍 마커 목록</h2>
      <ul>
        {markerList.map((marker) => (
          <li key={marker.id}>
            {/* {marker.name} - ({marker.lat.toFixed(5)}, {marker.lng.toFixed(5)}) */}
            {marker.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MarkerList;
