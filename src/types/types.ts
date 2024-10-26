export type Schedule = {
  id: string;
  place: string;
  name: string;
  time: {
    start: string;
    end: string;
  };
};

export type Homework = {
  id: string;
  name: string;
  deadline: string;
};

export type Radio = {
  name: string;
  url: string;
};

export type Config = {
  name: string;
  schedule: Schedule[];
  radios: Radio[];
};
