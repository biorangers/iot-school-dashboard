export type Schedule = {
  id: string;
  place: string;
  name: string;
  time: {
    start: string;
    end: string;
  };
};

export type Config = {
  name: string;
  schedule: Schedule[];
};
