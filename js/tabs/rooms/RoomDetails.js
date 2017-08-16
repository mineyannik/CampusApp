import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { bigFont, smallFont, listViewRowPaddingHorizontal, listViewRowPaddingVertical } from '../../util/Constants';
import Colors from '../../util/Colors';

export default class RoomDetails extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return(
            <View style={styles.container}>
                <View style={styles.section}>
                    <Image style={styles.icons} resizeMode='contain' source={require('./img/rooms-icon-head.png')} />
                    <View style={styles.textSection}>
                        <Text style={styles.heading}>{this.props.room["Begriff 1"]}</Text>
                        <Text style={styles.subHeading}>{this.props.room["Begriff 2"]}</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Image style={styles.icons} resizeMode='contain' source={require('./img/rooms-icon-location.png')}/>
                    <View style={styles.textSection}>
                        <Text style={styles.heading}>{this.props.room["Raum"]}</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Image style={styles.icons} resizeMode='contain' source={require('./img/rooms-icon-tags.png')}/>
                    <View style={styles.textSection}>
                        {/*<Text style={styles.location}>Tags:  {this._getTags(this.props.room).join(', ')}</Text>*/}
                    </View>
                </View>
            </View>
        );
    }
    _getTags(room) {
        return Object(room).keys.map(key => {
            if(
                key == 'Gebäude' ||
                key == 'Begriff 1' ||
                key == 'Begriff 2' ||
                key == 'Begriff 3' ||
                key == 'Begriff 4'
            ) {
                return this.props.room[key];
            }
        });
    }

}


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: listViewRowPaddingHorizontal,
        paddingVertical: listViewRowPaddingVertical,
    },
    heading: {
        fontSize: bigFont
    },
    subHeading: {
        fontSize: smallFont
    },
    icons: {
        width: 40,
        height: 40,
        flex: 1,
    },
    section: {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center'
    },
    textSection: {
        flex: 4
    }
});