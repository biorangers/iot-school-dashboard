export type Schedule = {
  id: string;
  day: string;
  time: string;
  subject: string;
};

export type Homework = {
  id: string;
  name: string;
  dueDate: string;
  description: string;
};

export type Radio = {
  id: string;
  name: string;
  url: string;
};

export type WeatherData = {
  name: string;
  main: {
    temp: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
  }[];
};

export type Config = {
  name: string;
  schedule: Schedule[];
  homeworks: Homework[];
  radios: Radio[];
  city: string;
  openweathermapApiKey: string;
};
