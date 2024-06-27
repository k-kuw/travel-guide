// 目的地
export type Destination = {
  id: number;
  name: string;
  lon: string;
  lat: string;
};

// 持ち物
export type Item = {
  id: number;
  name: string;
};

// スケジュール
export type Schedule = {
  time: string;
  place: string;
  activity: string;
  note: string;
};

// しおり登録画面入力内容設定
export type DataChangeProp<T> = {
  onDataChange: (data: T) => void;
};
