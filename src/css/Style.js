import { StyleSheet } from 'react-native';

const color1 = '#FFF'; // Button Text Color
const color2 = '#d50000'; // Diff Button Background Color
const color3 = '#212121'; // Main Button Background
const color4 = '#757575'; // Main Button Background
const color5 = '#424242'; // Status bar Background Color

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
    item_disabled: {
        backgroundColor: color4
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
    },
    avatar_img_medium: {
        width: 165,
        height: 165,
        borderRadius: 82.5
    },
    avatar_img_large: {
        width: 190,
        height: 190,
        borderRadius: 95
    },
    avatar_border: {
        borderWidth: 4,
        borderColor: '#FFF'
    },
    border_diff: {
        borderColor: color2
    },
    border_color3: {
        borderColor: color3
    },
    list_item_title: {
        fontSize: 16,
        fontWeight: '700'
    },
    list_item_description: {
        fontSize: 12,
        color: '#424242'
    },
    footer: {
        height: 60,
        borderTopWidth: 0.4,
        borderTopColor: '#c3c3c3'
    },
    tab_footer: {
        backgroundColor: '#FFF',
        padding: 15
    },
    button_on_footer: {
        alignSelf: 'center',
        height: 40
    },
    text_inside_button_on_footer: {
        color: '#FFF',
        fontSize: 14
    },
    container: {
        padding: 20
    },
    margin_paragraph: {
        marginTop: 20
    },
    title_gamecycle: {
        fontSize: 18,
        color: '#FFF'
    },
    big_title_gamecycle: {
        fontSize: 22,
        color: '#FFF'
    },
    paragraph_gamecycle: {
        fontSize: 14,
        color: '#FFF'
    },
    align_center: {
        alignSelf: 'center'
    },
    button_gamecycle: {
        minWidth: 80,
        justifyContent: 'center'
    },
    badge_bottom_avatar_view: {
        position: 'absolute',
        bottom: 25,
        right: 0
    },
    badge_top_avatar_view: {
        position: 'absolute',
        top: 0,
        right: 0
    }
});