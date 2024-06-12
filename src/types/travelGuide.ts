export type Destination = {
  id: string;
  name: string;
};

export type Item = {
  id: string;
  name: string;
};

export type Schedule = {
  id: string;
  time: string;
  place: string;
  activity: string;
  note: string;
};

export type ItemslDataProps = {
  onDataChange: (data: Item[]) => void;
};

export type DestinationsDataProps = {
  onDataChange: (data: Destination[]) => void;
};
export type SchedulesDataProps = {
  onDataChange: (data: Schedule[]) => void;
};
