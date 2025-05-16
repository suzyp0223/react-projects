/**
 * 중복을 피하기위해서 기존에 정의한 타입을 새로운 타입으로
 */
type OptionsFlags<T> = {
  [Property in keyof T]: boolean;
};

type Input = {
  value: string;
  onChange: () => void;
  disabled: boolean;
};

// 키는 동일한테 타입만 다른 InputOptions 타입.
type InputOptions = {
  value: boolean;
  onChange: boolean;
  disabled: boolean;
};

// Input의 모든 프로퍼티들을 keyof T 로 가져오면
// 키(value, onChange...)가 유니언타입으로 keyof T에 들어가게됨.
// 그리고 키가 불린으로 맵핑됨.
type InputOptionType = OptionsFlags<Input>;

//readonly 속성자 제거 -readonly
type CreateMutable<T> = {
  -readonly [Property in keyof T]-?: T[Property];
};

type Input2 = {
  readonly value?: string;
  readonly onChange?: () => void;
  readonly disabled?: boolean;
};

type InputOptions2 = CreateMutable<Input>;