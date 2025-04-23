import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from 'react-native';
import WebView from 'react-native-webview';
import {useSelector, useDispatch} from 'react-redux';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from 'types';
import {RootState} from 'store';
import {getStory, getUser} from 'store/storySlice';
import {formatDate} from 'helper';
import {AppDispatch} from 'store';

type StoryDetailScreenProps = {
  route: RouteProp<RootStackParamList, 'StoryDetail'>;
};

const StoryDetailScreen: React.FC<StoryDetailScreenProps> = ({route}) => {
  const {storyId} = route.params;
  const dispatch = useDispatch<AppDispatch>();

  const story = useSelector(
    (state: RootState) => state.stories.stories[storyId],
  );

  const user = useSelector((state: RootState) =>
    story ? state.stories.users[story.by] : undefined,
  );

  useEffect(() => {
    if (!story) {
      dispatch(getStory(storyId));
    } else if (story && !user && story.by) {
      dispatch(getUser(story.by));
    }
  }, [storyId, story, user, dispatch]);

  if (!story) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#ff6600" />
        <Text style={styles.loadingText}>Loading story...</Text>
      </View>
    );
  }

  const handleOpenUrl = () => {
    if (story.url) {
      Linking.openURL(story.url).catch(err =>
        console.error('Error opening URL:', err),
      );
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>{story.title}</Text>

          {story.url && (
            <TouchableOpacity onPress={handleOpenUrl}>
              <Text style={styles.url}>{story.url}</Text>
            </TouchableOpacity>
          )}

          <View style={styles.metaContainer}>
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreLabel}>Score</Text>
              <Text style={styles.scoreValue}>{story.score}</Text>
            </View>

            <View style={styles.timeContainer}>
              <Text style={styles.timeLabel}>Posted</Text>
              <Text style={styles.timeValue}>{formatDate(story.time)}</Text>
            </View>
          </View>

          <View style={styles.authorContainer}>
            <Text style={styles.authorLabel}>Author</Text>
            <Text style={styles.authorValue}>{story.by}</Text>
            {user && <Text style={styles.karmaValue}>Karma: {user.karma}</Text>}
          </View>
        </View>

        {story.url && (
          <View style={styles.webViewContainer}>
            <Text style={styles.webViewTitle}>Preview</Text>
            <WebView
              source={{uri: story.url}}
              style={styles.webView}
              startInLoadingState={true}
              renderLoading={() => (
                <ActivityIndicator
                  style={styles.webViewLoading}
                  color="#ff6600"
                />
              )}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  header: {
    backgroundColor: 'white',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  url: {
    fontSize: 14,
    color: '#0066cc',
    marginBottom: 16,
  },
  metaContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 16,
  },
  scoreContainer: {
    flex: 1,
  },
  scoreLabel: {
    fontSize: 12,
    color: '#666',
  },
  scoreValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff6600',
  },
  timeContainer: {
    flex: 1,
  },
  timeLabel: {
    fontSize: 12,
    color: '#666',
  },
  timeValue: {
    fontSize: 14,
    color: '#333',
  },
  authorContainer: {
    marginBottom: 8,
  },
  authorLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  authorValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  karmaValue: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  webViewContainer: {
    margin: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    height: 300,
  },
  webViewTitle: {
    padding: 12,
    fontSize: 16,
    fontWeight: '500',
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  webView: {
    flex: 1,
  },
  webViewLoading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StoryDetailScreen;
