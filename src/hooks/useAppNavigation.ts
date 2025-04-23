import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import {RootStackParamList} from 'types';

type RootStackNavigation = NavigationProp<RootStackParamList>;

export const useAppRootRoute = <T extends keyof RootStackParamList>() => {
  return useRoute<RouteProp<RootStackParamList, T>>();
};

export const useAppRootNavigation = () => useNavigation<RootStackNavigation>();
