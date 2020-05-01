import React, { Component } from 'react';
import { connect } from "react-redux";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../App.css'

class Loading extends Component {
    render() {
        return (
            <Backdrop open={this.props.loading} style={{ zIndex: "10000" }}>
                <CircularProgress style={{ color: "black" }} />
                <span style={{ color: "black", marginLeft: "10px" }}>
                    {this.props.loadingText ? this.props.loadingText : ""}
                </span>
            </Backdrop>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.common.loading,
        loadingText: state.common.loadingText
    };
};

export default connect(mapStateToProps, null)(Loading);