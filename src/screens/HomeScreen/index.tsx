import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList, Story} from 'types';
import {RootState} from 'store';
import {getStory, getTopStories} from 'store/storySlice';
import StoryItem from 'components/StoryItem';
import {AppDispatch} from 'store';
import styles from './styles';
type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const dispatch = useDispatch<AppDispatch>();
  const {topStories, stories, loading, error} = useSelector(
    (state: RootState) => state.stories,
  );
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadStories();
  }, []);

  const loadStories = async () => {
    await dispatch(getTopStories());
  };

  useEffect(() => {
    if (topStories.length > 0) {
      topStories.forEach(id => {
        if (!stories[id]) {
          dispatch(getStory(id));
        }
      });
    }
  }, [topStories, dispatch]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadStories();
    setRefreshing(false);
  };

  const navigateToStoryDetail = (story: Story) => {
    navigation.navigate('StoryDetail', {
      storyId: story.id,
      title: story.title,
    });
  };

  // Get all loaded stories and sort by score (ascending)
  const loadedStories = topStories
    .map(id => stories[id])
    .filter(Boolean)
    .sort((a, b) => a.score - b.score);

  if (loading && !refreshing && loadedStories.length === 0) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#ff6600" />
        <Text style={styles.loadingText}>Loading top stories...</Text>
      </View>
    );
  }

  if (error && loadedStories.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={loadedStories}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <StoryItem story={item} onPress={() => navigateToStoryDetail(item)} />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#ff6600']}
          />
        }
        ListEmptyComponent={
          <View style={styles.centered}>
            <Text>No stories available</Text>
          </View>
        }
      />
    </View>
  );
};

export default HomeScreen;
