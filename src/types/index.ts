export type Story = {
  id: number;
  title: string;
  url: string;
  time: number;
  score: number;
  by: string;
  descendants: number;
  kids?: number[];
  type: string;
};

export type User = {
  id: string;
  karma: number;
  created: number;
  about?: string;
  submitted?: number[];
};

export type RootStackParamList = {
  Home: undefined;
  StoryDetail: {
    storyId: number;
    title: string;
  };
};

export type StoryState = {
  topStories: number[];
  stories: Record<number, Story>;
  users: Record<string, User>;
  loading: boolean;
  error: string | null;
};
