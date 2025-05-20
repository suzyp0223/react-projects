import styled from '@emotion/styled';
import { ReactNode, useEffect, useState } from 'react';

const CarouselContainer = styled.div<{ direction: 'column' | 'row' }>`
  width: 300px;
  height: 300px;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: ${({ direction }) => direction};
  background-color: lightyellow;
`;
const CarouselWrapper = styled.div<{
  offset: number;
  transitionTime: number;
  direction: 'column' | 'row';
}>`
  display: flex;
  flex-direction: ${({ direction }) => (direction === 'column' ? 'column' : 'row')};
  transition: transform ${({ transitionTime }) => transitionTime}ms ease-in-out;

  /* transform: translate ${({ direction }) => (direction === 'row' ? 'X' : 'Y')}
    (${({ offset }) => -offset * 100}%); // ✅ 변경: 전체 슬라이드를 좌우로 이동 */
  transform: ${({ direction, offset }) =>
    direction === 'row'
      ? `translateX(-${offset * 100}%)`
      : `translateY(-${offset * 100}%)`}; // ✅ 변경: row는 가로 방향 X축, column은 세로 방향 Y축 이동

  // ✅ 추가: 높이 설정으로 안 보이는 문제 해결
  // ✅ 슬라이드 하나 크기로 고정
  width: ${({ direction }) => (direction === 'row' ? '300px' : 'auto')};
  height: ${({ direction }) => (direction === 'column' ? '300px' : 'auto')};
`;

const CarouselItem = styled.div`
  width: 300px;
  height: 300px;
  flex-shrink: 0; // ✅ 변경: 슬라이드 크기 고정
`;

//<{ position: 'left' | 'right' }>: 제네릭 타입 문법, 스타일드 컴포넌트에 props 타입을 명시하는 문법
const CarouselButton = styled.div<{ position: 'left' | 'right'; direction: 'column' | 'row' }>`
  z-index: 999;
  cursor: pointer;
  width: 50px;
  height: 50px;
  background-color: #555;
  color: white;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;

  // ✅ 세로 슬라이드일 때 위/아래 정렬
  ${({ direction, position }) =>
    direction === 'column' &&
    position === 'left' &&
    `
      top: 0;
      left: calc(50% - 25px);
    `}
  ${({ direction, position }) =>
    direction === 'column' &&
    position === 'right' &&
    `
      bottom: 0;
      left: calc(50% - 25px);
    `}

  // ✅ 가로 슬라이드일 때 좌/우 정렬
  ${({ direction, position }) =>
    direction === 'row' &&
    position === 'left' &&
    `
      top: calc(50% - 25px);
      left: 0;
    `}
  ${({ direction, position }) =>
    direction === 'row' &&
    position === 'right' &&
    `
      top: calc(50% - 25px);
      right: 0;
    `}

  ${({ direction }) => direction === 'column' && 'transform: rotate(90deg);'} // 세로 방향일 때 회전
`;

interface CarouselProps {
  children: ReactNode | ReactNode[];
  loop?: boolean;
  autoLoop?: boolean;
  autoTime?: number;
  transitionTime?: number;
  direction?: 'column' | 'row';
}

const Carousel = ({
  children: propsChildren,
  loop,
  autoLoop,
  autoTime = 1000,
  transitionTime = 300,
  direction = 'column',
}: CarouselProps) => {
  const children = Array.isArray(propsChildren) ? propsChildren : [propsChildren];
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (autoLoop) {
      const interval = setInterval(() => {
        // setIdx(idx + 1); 이렇게 하면 close가 되서 idx는 0으로 계속 찍힌다
        setIdx(prev => (prev < children.length - 1 ? prev + 1 : 0));
      }, autoTime);

      return () => clearInterval(interval);
    }
  }, [autoLoop, autoTime, propsChildren]);

  const handlePrev = () => {
    if (idx > 0) {
      setIdx(prev => prev - 1);
    } else if (loop) {
      setIdx(children.length - 1);
    }
  };
  const handleNext = () => {
    if (idx < children.length - 1) {
      setIdx(prev => prev + 1);
    } else if (loop) {
      setIdx(0);
    }
  };

  return (
    <CarouselContainer direction={direction}>
      <CarouselButton direction={direction} onClick={handlePrev} position="left">
        {'<'}
      </CarouselButton>

      {/* ✅ 변경: children 전체를 CarouselWrapper로 감싸고, 이동 offset 적용 */}
      <CarouselWrapper direction={direction} transitionTime={transitionTime} offset={idx}>
        {children.map((child, idx) => {
          const key =
            typeof child === 'object' && child !== null && 'key' in child
              ? (child as any).key
              : idx;
          return <CarouselItem key={key}>{child}</CarouselItem>;
        })}
      </CarouselWrapper>

      <CarouselButton direction={direction} onClick={handleNext} position="right">
        {'>'}
      </CarouselButton>
    </CarouselContainer>
  );
};

export default Carousel;
