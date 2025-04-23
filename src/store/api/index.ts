import {Story, User} from 'types';

const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

export const fetchTopStories = async (): Promise<number[]> => {
  try {
    const response = await fetch(`${BASE_URL}/topstories.json`);
    if (!response.ok) {
      throw new Error('Failed to fetch top stories');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching top stories:', error);
    throw error;
  }
};

export const fetchStory = async (id: number): Promise<Story> => {
  try {
    const response = await fetch(`${BASE_URL}/item/${id}.json`);
    if (!response.ok) {
      throw new Error(`Failed to fetch story with id ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching story ${id}:`, error);
    throw error;
  }
};

export const fetchUser = async (id: string): Promise<User> => {
  try {
    const response = await fetch(`${BASE_URL}/user/${id}.json`);
    if (!response.ok) {
      throw new Error(`Failed to fetch user with id ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error);
    throw error;
  }
};
