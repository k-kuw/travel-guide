export type Destination = {
  id: number;
  name: string;
  lon: string;
  lat: string;
};

export type Item = {
  id: number;
  name: string;
};

export type Schedule = {
  time: string;
  place: string;
  activity: string;
  note: string;
};

export type DaySchedule = {
  date: string;
  schedule: [];
};

export type TitleDataProps = {
  onDataChange: (data: string) => void;
};

export type DestinationsDataProps = {
  onDataChange: (data: Destination[]) => void;
};

export type ItemslDataProps = {
  onDataChange: (data: Item[]) => void;
};

export type SchedulesDataProps = {
  onDataChange: (data: Schedule[]) => void;
};
