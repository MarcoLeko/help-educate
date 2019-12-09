import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import './home.scss';
import SwipeableViews from 'react-swipeable-views';
import DonationsOverview from "../about-us/about-us";
import clsx from 'clsx';
import MapOverlay from "../donations-map/map-overlay";
import {connect} from "react-redux";
import ToggleableMenu from "./toggleable-menu";
import SideBar, {drawerWidth} from './side-bar';
import {makeStyles} from '@material-ui/core/styles';
import LiveDonations from "../live-donations/live-donations";
import {useScrollTrigger} from "@material-ui/core";
import {useEffect} from "react";

const useStyles = makeStyles(theme => ({
    appBar: {
        transition: theme.transitions.create(['transform', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: 0,
    },
    appBarShift: {
        transition: theme.transitions.create(['margin'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: -drawerWidth,
    },
    content: {
        flexGrow: 1,
        height: '100%',
        width: '100%',
        transition: theme.transitions.create(['margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        position: 'relative',
        marginLeft: 0,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: -drawerWidth,
    },
    indicator: {
        height: 4
    }
}));

function Home({canSwipe, isOpen}) {
    const classes = useStyles();
    const trigger = useScrollTrigger({threshold: 0});
    const [tabIndex, setTabIndex] = React.useState(0);

    function handleChange(event, newValue) {
        setTabIndex(newValue);
    }

    function handleChangeIndex(index) {
        setTabIndex(index);
    }

    function transitionY() {
        if (tabIndex === 1) {
            return 48;
        } else {
            if (!trigger) {
                return 0;
            } else {
                return 48;
            }
        }
    }

    return (
        <React.Fragment>
            <AppBar
                position="sticky"
                color="default"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: isOpen,
                }, "background")}
                style={{
                    boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2)',
                    transform: `translateY(-${transitionY()}px)`
                }}
            >
                    <ToggleableMenu trigger={trigger} tabIndex={tabIndex}/>
                <Tabs
                    value={tabIndex}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    classes={{
                        indicator: classes.indicator
                    }}
                >
                    <Tab label="Live"/>
                    <Tab label="Donations"/>
                    <Tab label="About us"/>
                </Tabs>
            </AppBar>
            <SwipeableViews
                className={clsx(classes.content, {
                    [classes.contentShift]: isOpen,
                })}
                index={tabIndex}
                style={
                    Object.assign({
                        height: '100%',
                        width: '100%',
                    }, tabIndex === 1 && {
                        marginTop: '-48px',
                        position: 'fixed'
                    }
                    )
                }
                containerStyle={{height: '100%', width: '100%'}}
                onChangeIndex={handleChangeIndex}
                disabled={!canSwipe}
                slideStyle={{overflow: 'hidden'}}
            >
                <LiveDonations/>
                <MapOverlay/>
                <DonationsOverview/>
            </SwipeableViews>
            <SideBar/>
        </React.Fragment>
    );
}

const mapStateToProps = store => ({
    canSwipe: store.uiReducer.canSwipe,
    isOpen: store.uiReducer.isOpen
});

export default connect(mapStateToProps)(Home);
