import { StyleSheet } from 'react-native';

const BLOCK_HEIGHT = 50;
const PADDING_LEFT = 15;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containerCenter: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    margin: {
        marginTop: BLOCK_HEIGHT
    },
    description:{
        alignSelf: 'stretch',

    },
    labelContainer: {
        paddingLeft: PADDING_LEFT,
        height: BLOCK_HEIGHT,
        justifyContent: "flex-start",
        flexDirection: "row",
        alignItems: 'center',
    },
    fieldContainer: {
        alignSelf: 'stretch',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'lightgray',
        paddingLeft: PADDING_LEFT
    },
    classItem: {
        backgroundColor: 'white',
        height: 60,
        paddingHorizontal: PADDING_LEFT,
        borderColor: 'lightgray',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    dashboardItem: {
        justifyContent: 'space-between'
    },
    classItemBordered: {
        borderTopWidth: 1
    },
    classText: {
        fontSize: 18,
        color: '#595959',
    },
    textInput:{
        height: BLOCK_HEIGHT,
        color: '#393939',
    },
    messageMargin: {
        marginTop: 220
    },
    fieldUnderlined: {
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray'
    },
    arrowRight:{
        marginRight: 8,
        marginLeft: 5,
        bottom: 2
    },
    button:{
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: 'center',
        height: BLOCK_HEIGHT
    },
    buttonText:{
        fontSize: 14,
        color: '#393939',
    },
    arrowAndDb:{
        flexDirection: "row",
    },
    timeText: {
        marginRight: 8
    },
    textRight:{
        marginRight: 4
    },
    deleteButton:{
        height: BLOCK_HEIGHT,
        alignItems: 'center',
        flexDirection: "row",
        justifyContent : 'center'
    },
    deleteButtonText:{
        marginLeft: 5,
        fontSize: 14,
        color: 'red'
    },
    dayButton: {
        alignSelf: 'stretch',
        height: BLOCK_HEIGHT,
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
        justifyContent: 'center'
    },
    daysContainer: {
        backgroundColor: 'white',
        paddingLeft: PADDING_LEFT,
        marginTop: BLOCK_HEIGHT,
        borderColor: 'lightgray',
        borderWidth: 1,
    },
    dayRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dayCheckedIcon: {
        marginRight: 10
    }
});

export default styles;