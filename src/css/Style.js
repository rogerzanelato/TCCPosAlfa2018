import { StyleSheet } from 'react-native';

const color1 = '#FFF'; // Button Text Color
const color2 = '#d50000'; // Diff Button Background Color
const color3 = '#212121'; // Main Button Background
const color4 = 'steelblue'; // Main Background
const color5 = '#424242'; // Header Background Color
const color6 = '#000'; // Status Bar

const font1 = 14;

export default StyleSheet.create({
    text_default: {
        fontSize: font1,
        color: color1
    },
    container_init: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    item_menu: {
        width: 200,
        color: color1,
        fontSize: font1,
        padding: 10,
        margin: 10,
        textAlign: 'center',
        height: 40,
        backgroundColor: color3,
        borderRadius: 5
    },
    item_diff: {
        backgroundColor: color2
    },
    bg_color3: {
        backgroundColor: color3
    },
    header_main: {
        backgroundColor: color5
    },
    title_main_color: {
        color: color1
    },
    text_inside_box: {
        fontSize: 13,
        color: color1,
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 15,
        marginRight: 10
    },
    avatar_view: {
        alignItems: 'center',
        margin: 10
    },
    avatar_img: {
        width: 85,
        height: 85,
        borderRadius: 42.5,
        marginBottom: 10
    }
});