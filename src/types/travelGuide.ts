// 目的地
export type Destination = {
  id?: number;
  name: string;
  lon: string;
  lat: string;
};

// 持ち物
export type Belonging = {
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
export type DataChangeProp<T> = (data: T) => void;

// しおり登録パラメータ
export type RegisterGuide = {
  id?: number;
  username: string;
  title: string;
  destinations: Destination[];
  belongings: Belonging[];
  schedules: Schedule[];
};

// しおり詳細
export type GuideDetail = {
  title: string;
  destinations: Destination[];
  belongings: Belonging[];
  schedules: Schedule[];
};
