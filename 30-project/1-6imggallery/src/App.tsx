import { useCallback, useState } from 'react';
import './App.css';
import ImageBox from './components/ImageBox';
import { useDropzone } from 'react-dropzone';

function App() {
  const [imageList, setImageList] = useState<string[]>([]);

  // ✅ 파일을 base64 문자열로 변환하는 비동기 함수
  const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // ✅ 드롭 또는 파일 선택 시 처리 함수
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const base64Images = await Promise.all(
      acceptedFiles.map(file => readFileAsDataURL(file))
    );

    setImageList(prev => [...prev, ...base64Images]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: true,
  });

  return (
    <div className="container">
      <div className={`gallery-box ${imageList.length > 0 ? 'row' : ''}`}>
        {imageList.length === 0 && (
          <div className="text-center">
            이미지가 없습니다. <br />
            이미지를 추가해주세요.
          </div>
        )}

        {imageList.map((el, idx) => (
          <ImageBox key={el + idx} src={el} />
        ))}

        {/* 클릭 + 드래그 가능한 업로드 박스 */}
        <div className="plus-box" {...getRootProps()}>
          <input {...getInputProps()} />
          +
        </div>
      </div>
    </div>
  );
}

export default App;
