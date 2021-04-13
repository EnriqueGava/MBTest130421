import React from 'react'
import { makeStyles, Hidden} from '@material-ui/core';
import SideBar from './../SideBar';
import CajonCu from './CajonCu';
import Routes from '../../../Routes';
import SideBarCu from './SideBarCu';

const estilo = makeStyles(theme =>({
    root: {
        display: 'flex',
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

const Container = () => {

    const [abrir, setAbrir] = React.useState(false);

    const handleDrawerToggle = () => {
        setAbrir(!abrir)
    }

    const classes = estilo();
    return (  
        <div className={classes.root}>
            <SideBarCu handleDrawerToggle={handleDrawerToggle}/>
            <Hidden xsDown>
                <CajonCu
                    variant="permanent"
                    open={true}
                />
            </Hidden>
            <Hidden smUp>
                <CajonCu
                    variant="temporary"
                    open={abrir}
                    onClose={handleDrawerToggle}
                />
            </Hidden>
            
            <div className={classes.content}>
                <div className={classes.toolbar}></div>
                <Routes/>
            </div>
        </div>
    );
}
 
export default Container;