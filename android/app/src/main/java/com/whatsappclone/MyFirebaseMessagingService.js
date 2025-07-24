import messaging from '@react-native-firebase/messaging';
import { Alert, Platform } from 'react-native';

async function requestPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

useEffect(() => {
  requestPermission();
  
  // Foreground
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    Alert.alert(remoteMessage.notification.title, remoteMessage.notification.body);
  });

  return unsubscribe;
}, []);
