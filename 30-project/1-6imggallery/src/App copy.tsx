import React, { useRef, useState } from 'react';
import './App.css';
import ImageBox from './components/ImageBox';

function App() {
  const inpRef = useRef<HTMLInputElement>(null);

  const [imgList, setImgList] = useState<string[]>([]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;
    if (!files || files.length === 0) return;

    const fileList = Array.from(files);
    const urls = fileList.map(file => URL.createObjectURL(file));

    // ✅ 안전하게 이전 상태에 추가
    setImgList(prev => [...prev, ...urls]);
  };

  const openFileDialog = () => {
    inpRef.current?.click();
  };

  return (
    <div className='container'>
      <div className='gallery-box'>
        
        <div className="text-center">
          이미지가 없습니다. <br />
          이미지를 추가해주세요.
        </div>
        <input
          type="file"
          ref={inpRef}
          style={{ display: 'none' }}
          onChange={handleImageChange}
          multiple // ✅ 다중 업로드 허용
          accept="image/*"
        />

        <div className="plus-box" onClick={openFileDialog}>
          +
        </div>
      </div>
    </div >
  );
}
export default App;
