import React, { Component } from 'react';
import { connect } from "react-redux";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { closeSnackbar } from '../redux/actions/common';
import '../App.css'

class SnackBar extends Component {
    render() {
        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={this.props.snackbar}
                autoHideDuration={6000}
                message={this.props.snackbarText}
                onClose={this.props.closeSnackbar}
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={this.props.closeSnackbar}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
        )
    }
}

const mapStateToProps = state => {
    return {
        snackbar: state.common.snackbar,
        snackbarText: state.common.snackbarText
    };
};

function mapDispatchToProps(dispatch) {
    return {
        closeSnackbar: () => dispatch(closeSnackbar())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SnackBar);