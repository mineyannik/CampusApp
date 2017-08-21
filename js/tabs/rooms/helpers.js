import {Platform, Linking} from 'react-native';

export function openDirections(latitude, longitude) {
    Platform.select({
        ios: () => {
            Linking.openURL('http://maps.apple.com/maps?daddr=' + latitude + ',' + longitude);
        },
        android: () => {
            Linking.openURL('http://maps.google.com/maps?daddr=' + latitude + ',' + longitude);
        }
    })();
}