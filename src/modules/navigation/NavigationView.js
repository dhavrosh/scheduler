import React, {PropTypes} from 'react';
import {
  NavigationExperimental,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
const {
    CardStack: NavigationCardStack,
    Header: NavigationHeader,
    PropTypes: NavigationPropTypes
} = NavigationExperimental;
import AppRouter from '../AppRouter';
import TabBar from '../../components/TabBar';
import Icon from 'react-native-vector-icons/FontAwesome';

import SearchBar from 'react-native-searchbar'

const items = [
    1337,
    'janeway',
    {
        lots: 'of',
        different: {
            types: 0,
            data: false,
            that: {
                can: {
                    be: {
                        quite: {
                            complex: {
                                hidden: [ 'gold!' ],
                            },
                        },
                    },
                },
            },
        },
    },
    [ 4, 2, 'tree' ],
];

// Customize bottom tab bar height here if desired
const TAB_BAR_HEIGHT = 50;

const NavigationView = React.createClass({
    propTypes: {
        onNavigateBack: PropTypes.func.isRequired,
        onNavigateCompleted: PropTypes.func.isRequired,
        navigationState: PropTypes.shape({
            tabs: PropTypes.shape({
                routes: PropTypes.arrayOf(PropTypes.shape({
                    key: PropTypes.string.isRequired,
                    title: PropTypes.string.isRequired
                })).isRequired
            }).isRequired,
            Dashboard: NavigationPropTypes.navigationState.isRequired,
            /*ProfileTab: NavigationPropTypes.navigationState.isRequired*/
        }),
        switchTab: PropTypes.func.isRequired,
        pushRoute: PropTypes.func.isRequired
    },
    // NavigationHeader accepts a prop style
    // NavigationHeader.title accepts a prop textStyle
    renderHeader(sceneProps) {
        return !sceneProps.scene.route.search ? (
            <NavigationHeader
                {...sceneProps}
                onNavigateBack={this.props.onNavigateBack}
                style={[
                    styles.navigation,
                    sceneProps.scene.route.navigationExtended && styles.navigationExtended
                ]}
                renderLeftComponent={() => {
                    if (sceneProps.scene.index === 0 || !this.props.onNavigateBack) {
                        return null;
                    }
                    return (
                        <TouchableOpacity onPress={this.props.onNavigateBack} style={styles.backArrowTouchable}>
                            <Icon name="angle-left" size={35} style={styles.backArrow}/>
                        </TouchableOpacity>
                    )
                }}
                renderTitleComponent={() => {
                    return (
                        <NavigationHeader.Title textStyle={[
                            styles.navigationTitle,
                            sceneProps.scene.route.navigationExtended && styles.navigationTitleLarge
                        ]}>
                            {sceneProps.scene.route.title}
                            </NavigationHeader.Title>
                    );
                }}
                renderRightComponent={() => {
                    if(!sceneProps.scene.route.showRightComponent && !sceneProps.scene.route.iconName){
                        return null
                    }
                    return (
                        <TouchableOpacity
                            onPress={sceneProps.scene.route.rightComponentAction}
                            style={styles.plusButtonTouchable}>
                            <Icon name={sceneProps.scene.route.iconName} size={25} style={styles.plusButton}></Icon>
                        </TouchableOpacity>
                    );
                }}
            />
        ) : (
            <SearchBar
                hideBack={true}
                data={items}
                iconColor="white"
                textColor="white"
                placeholderTextColor="white"
                backgroundColor="steelblue"
                handleResults={(results) => console.log(results)}
                showOnLoad
                fontFamily="System"
                heightAdjust={-5}
            />
        );
    },
    renderScene(sceneProps) {
        // render scene and apply padding to cover
        // for app bar and navigation bar
        return (
            <View style={styles.sceneContainer}>
                {AppRouter(sceneProps)}
            </View>
        );
    },
    render() {
        const {tabs} = this.props.navigationState;
        const tabKey = tabs.routes[tabs.index].key;
        const scenes = this.props.navigationState[tabKey];

        return (
            <View style={styles.container}>
                <NavigationCardStack
                    key={'stack_' + tabKey}
                    onNavigateBack={this.props.onNavigateBack}
                    navigationState={scenes}
                    renderHeader={this.renderHeader}
                    renderScene={this.renderScene}
                />
                <TabBar
                    height={TAB_BAR_HEIGHT}
                    tabs={tabs}
                    currentTabIndex={tabs.index}
                    switchTab={this.props.switchTab}
                />
            </View>
        );
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    navigation: {
        backgroundColor: 'steelblue',

    },
    navigationExtended: {
        height: 120
    },
    navigationTitle: {
        color: 'white'
    },
    navigationTitleLarge: {
        fontSize: 25
    },
    sceneContainer: {
        flex: 1,
        marginBottom: TAB_BAR_HEIGHT
    },
    backArrowTouchable:{
        top: 10,
        left: 10,
        width: 25
    },
    backArrow:{
        color: 'white'
    },
    plusButtonTouchable:{
        top: 15,
        right: 0,
        width: 35
    },
    plusButton:{
        color: 'white',
    }
});

export default NavigationView;
