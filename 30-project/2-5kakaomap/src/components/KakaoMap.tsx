import { useEffect, useRef, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import type { MarkerData } from "../App";

interface Props {
  markerList: MarkerData[];
  setMarkerList: React.Dispatch<React.SetStateAction<MarkerData[]>>;
}

declare global {
  interface Window {
    kakao: any;
  }
}

const KakaoMap = ({ markerList, setMarkerList }: Props) => {
  const [mapType, setMapType] = useState<kakao.maps.MapTypeId | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [center, setCenter] = useState({ lat: 33.450701, lng: 126.570667 });
  const [rightClickMarkers, setRightClickMarkers] = useState<
    { id: number; lat: number; lng: number; name: string; icon?: string }[]
  >([]);

  const mapRef = useRef<kakao.maps.Map | null>(null);
  const markerIdRef = useRef(0);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_API_KEY}&autoload=false&libraries=services`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        setMapType(window.kakao.maps.MapTypeId.ROADMAP);
        setIsLoaded(true);
      });
    };

    document.head.appendChild(script);
  }, []);

  if (!isLoaded) return <div>지도를 불러오는 중입니다...</div>;

  const locations = [
    { name: "제주", lat: 33.450701, lng: 126.570667 },
    { name: "서울시청", lat: 37.5662952, lng: 126.9779451 },
    { name: "부산시청", lat: 35.1795543, lng: 129.0756416 },
  ];

  const getDistance = (
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number
  ) => {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371e3;
    const φ1 = toRad(lat1);
    const φ2 = toRad(lat2);
    const Δφ = toRad(lat2 - lat1);
    const Δλ = toRad(lng2 - lng1);

    const a =
      Math.sin(Δφ / 2) ** 2 +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  const handleRightClick = (
    map: kakao.maps.Map,
    mouseEvent: kakao.maps.event.MouseEvent
  ) => {
    const latlng = mouseEvent.latLng;
    const geocoder = new window.kakao.maps.services.Geocoder();

    geocoder.coord2Address(
      latlng.getLng(),
      latlng.getLat(),
      (result: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          // const regionName = result[0].address_name; // 행정구역 이름 (예: 제주특별자치도 제주시 연동)
          const road = result[0]?.road_address;
          const jibun = result[0]?.address;

          // 1순위: 건물 이름, 2순위: 도로명 주소, 3순위: 지번 주소
          const buildingName = road?.building_name;
          const roadName = road?.address_name;
          const jibunName = jibun?.address_name;

          const name = buildingName || roadName || jibunName || "이름없음";

          const newMarker = {
            id: markerIdRef.current++,
            lat: latlng.getLat(),
            lng: latlng.getLng(),
            name: name,
          };

          setRightClickMarkers((prev) => [...prev, newMarker]);
          setMarkerList((prev) => [...prev, newMarker]);
        }
      }
    );
  };

  const handleDeleteMarker = (id: number) => {
    setMarkerList((prev) => prev.filter((marker) => marker.id !== id));
  };

  const handleMove = (lat: number, lng: number) => {
    setCenter({ lat, lng });
  };

  const toggleMapType = () => {
    if (!mapRef.current || !mapType) return;

    const nextType =
      mapType === window.kakao.maps.MapTypeId.ROADMAP
        ? window.kakao.maps.MapTypeId.HYBRID
        : window.kakao.maps.MapTypeId.ROADMAP;

    mapRef.current.setMapTypeId(nextType);
    setMapType(nextType);
  };

  const handleMarkerClick = (id: number) => {
    const newName = prompt("새로운 마커 이름을 입력하세요:");
    if (!newName) return;

    setRightClickMarkers((prev) => prev.filter((marker) => marker.id !== id));
    setMarkerList((prev) => prev.filter((marker) => marker.id !== id));
  };

  const handleDelete = (id: number) => {
    setMarkerList((prev) => prev.filter((marker) => marker.id !== id));
  };

  return (
    <div>
      <Map
        center={center}
        style={{ width: "100%", height: "400px" }}
        level={3}
        onCreate={(mapInstance) => {
          mapRef.current = mapInstance;
        }}
        onRightClick={handleRightClick}
      >
        {locations.map((loc) => (
          <MapMarker key={loc.name} position={{ lat: loc.lat, lng: loc.lng }}>
            <div style={{ padding: "5px", color: "#000" }}>{loc.name}</div>
          </MapMarker>
        ))}

        {markerList.map((marker) => (
          <MapMarker
            key={marker.id}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => handleDeleteMarker(marker.id)}
          >
            <div style={{ fontSize: "12px" }}>{marker.name}</div>
          </MapMarker>
        ))}
      </Map>

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        {locations.map((loc) => (
          <button
            key={loc.name}
            onClick={() => handleMove(loc.lat, loc.lng)}
            style={{
              margin: "0 10px",
              padding: "10px 20px",
              cursor: "pointer",
            }}
          >
            {loc.name}로 이동
          </button>
        ))}
        <div style={{ marginTop: "20px" }}>
          <button onClick={toggleMapType}>
            {mapType === window.kakao.maps.MapTypeId.ROADMAP
              ? "위성지도 보기"
              : "일반지도 보기"}
          </button>
        </div>
      </div>

      {/* ✅ 마커 리스트 UI */}
      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <h3>📌 등록된 마커 목록</h3>
        {markerList.length === 0 && <p>등록된 마커가 없습니다.</p>}
        <ul style={{ listStyle: "none", padding: 0 }}>
          {markerList.map((marker) => (
            <li key={marker.id} style={{ marginBottom: "10px" }}>
              <strong>{marker.name}</strong>
              {/* ({marker.lat.toFixed(4)},
              {marker.lng.toFixed(4)}) */}
              <button
                style={{ marginLeft: "10px" }}
                onClick={() => handleMarkerClick(marker.id)}
              >
                이름 수정
              </button>
              <button
                style={{ marginLeft: "5px" }}
                onClick={() => handleDelete(marker.id)}
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default KakaoMap;
