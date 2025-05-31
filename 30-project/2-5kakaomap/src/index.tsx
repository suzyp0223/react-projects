import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root")!);

const AppWithKakao = <App />;

// ❗React.StrictMode 제거하면 깜빡임 없이 안정적으로 작동
root.render(
  // <React.StrictMode>{AppWithKakao}</React.StrictMode> ← 주석 처리
  AppWithKakao
);
