import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { GITHUB_API } from "./../api";
import Button from "./../components/Button";

const CloseIssue = ({ issueNumber, onSuccess }) => {
  // console.log("🔍 CloseIssue 렌더링됨 - issueNumber:", issueNumber); // issueNumber가 있어야 함

  const [isClosing, setIsClosing] = useState(false);
  const [message, setMessage] = useState("");

  const handleClose = async () => {
    console.log("이슈 닫기 실행됨 🚀"); // ✅ 눌렀는지 확인
    console.log("🛠 이슈 닫기 버튼 클릭됨 - 이슈 번호:", issueNumber); //번호 전달됐는지 확인, undefined라면 props 깨짐

    setIsClosing(true);

    try {
      const res = await axios.patch(
        `${GITHUB_API}/repos/suzyp0223/react-projects/issues/${issueNumber}`,
        {
          state: "closed",
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
            "Content-Type": "application/json",
          },
        },
      );

      console.log("이슈 Close 성공✅", res.data);

      // 새로고침 콜백 실행
      if (onSuccess) onSuccess(); // ✅ 여기서 바로 갱신
      alert("이슈 리스트를 갱신합니다 🚀");
    } catch (error) {
      console.error("❌이슈 닫기 실패 ", error);

      setIsClosing(false);
      setMessage(`이슈 #${issueNumber} 가 닫기에 실패 ❌`);
    }
  };

  return (
    <div>
      <Button
        onClick={handleClose}
        style={{
          padding: "8px 12px",
          backgroundColor: "#e55353",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        이슈 닫기
      </Button>
      {message && <p style={{ marginTop: "10px" }}>{message}</p>}
    </div>
  );
};

export default CloseIssue;
