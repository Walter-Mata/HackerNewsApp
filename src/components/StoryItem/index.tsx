import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import {Story} from 'types';
import {useAppSelector} from 'store';
import {formatDate} from 'helper';

type StoryItemProps = {
  story: Story;
  onPress: () => void;
};

const StoryItem: React.FC<StoryItemProps> = ({story, onPress}) => {
  const user = useAppSelector(state => state.stories.users[story.by]);

  const handleUrlPress = () => {
    if (story.url) {
      Linking.openURL(story.url).catch(err =>
        console.error('Error opening URL:', err),
      );
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}>
      <View style={styles.scoreContainer}>
        <Text style={styles.score}>{story.score}</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{story.title}</Text>

        {story.url && (
          <TouchableOpacity onPress={handleUrlPress}>
            <Text style={styles.url} numberOfLines={1}>
              {story.url}
            </Text>
          </TouchableOpacity>
        )}

        <View style={styles.metaContainer}>
          <Text style={styles.metaText}>
            By: <Text style={styles.author}>{story.by}</Text>
            {user && ` (Karma: ${user.karma})`}
          </Text>
          <Text style={styles.metaText}>Posted: {formatDate(story.time)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  scoreContainer: {
    backgroundColor: '#ff6600',
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  score: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  contentContainer: {
    flex: 1,
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  url: {
    fontSize: 12,
    color: '#0066cc',
    marginBottom: 8,
  },
  metaContainer: {
    marginTop: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  author: {
    fontWeight: '500',
  },
});

export default StoryItem;
