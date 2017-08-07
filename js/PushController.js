import React, {Component} from "react";

import FCM, {FCMEvent} from "react-native-fcm";

export default class PushController extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        FCM.getFCMToken().then(token => {
            console.log("TOKEN (getFCMToken)", token);
        });

        FCM.getInitialNotification().then(notif => {
            console.log("INITIAL NOTIFICATION", notif)
        });

        this.notificationListener = FCM.on(FCMEvent.Notification, notif => {
            console.log("Notification", notif);

            this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, token => {
                console.log("TOKEN (refreshUnsubscribe)", token);
            });
        })
    }

    componentWillUnmount() {
        this.notificationListener.remove();
        this.refreshTokenListener.remove();
    }

    render() {
        return null;
    }
}