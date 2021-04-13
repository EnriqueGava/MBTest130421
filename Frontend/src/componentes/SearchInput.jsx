import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Paper, Input, Box, Grid } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search'
const useStyles = makeStyles(theme => ({
    root: {
        borderRadius: '5px',
        padding: theme.spacing(1),
        marginBottom: 16,
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, .5)',
    },
    icon: {
        marginRight: theme.spacing(1),
        color: theme.palette.text.secondary
    },
    input: {
        fontSize: '14px',
        lineHeight: '16px',
        letterSpacing: '-0.05px'
    }
}));
const SearchInput = (props) => {
    const classes = useStyles();
    return (

        <Grid container direction="row" alignItems="flex-end" justify="flex-end">
            <Paper
                className={classes.root}
            >
                <SearchIcon className={classes.icon} />
                <Input
                    className={classes.input}
                    disableUnderline
                    placeholder={props.placeholder}
                />
            </Paper>
        </Grid>


    );

}

export default SearchInput;