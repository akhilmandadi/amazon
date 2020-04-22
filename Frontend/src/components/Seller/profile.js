import React, { Component } from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import { saveSellerAddress, saveSellerProfilePic ,getSellerProfileDetails} from '../../redux/actions/sellerActions'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import "../css/seller.css"
import { Card } from '@material-ui/core';
class SellerProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            address: {},
            dummyaddress: {},
            uploadedImage: "",
            image: "",
            dummyName: "",
            open: "",
            editNameIcon: false,
            editName: false,

            showAddAddress: false
        };
        this.onMainAddChange = this.onMainAddChange.bind(this);
        this.onStateChange = this.onStateChange.bind(this);
        this.onZipChange = this.onZipChange.bind(this);
        this.onAdd2Change = this.onAdd2Change.bind(this);
        this.onCityChange = this.onCityChange.bind(this);
        this.saveAddress = this.saveAddress.bind(this);
        this.showAddress = this.showAddress.bind(this);
        this.showEditAddress = this.showEditAddress.bind(this);
        this.handleAddClose = this.handleAddClose.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.showBAsicDetails = this.showBAsicDetails.bind(this);
        this.saveAddress = this.saveAddress.bind(this);
        this.saveSellerProfilePic = this.saveSellerProfilePic.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handlePictureClose = this.handlePictureClose.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.showEditName = this.showEditName.bind(this);
        this.showEditNameSubmissions = this.showEditNameSubmissions.bind(this);
        this.handleNameClose = this.handleNameClose.bind(this);
        this.closeEditNameIcon = this.closeEditNameIcon.bind(this);
        this.saveName = this.saveName.bind(this);



    }
    componentDidMount()
    {
        this.props.getSellerProfileDetails();

    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            name: nextProps.seller.profile.name,
            address: nextProps.seller.profile.address,
            image: nextProps.seller.profile.image,
            open: false,
            showAddAddress: false,
            editName : false,



        })
    }
    onMainAddChange(e) {
        this.setState({
            dummyaddress: {
                ...this.state.dummyaddress,
                address1: e.target.value
            }
        })
    }
    onAdd2Change(e) {
        this.setState({
            dummyaddress: {
                ...this.state.dummyaddress,
                address2: e.target.value
            }
        })
    }
    onStateChange(e) {
        this.setState({
            dummyaddress: {
                ...this.state.dummyaddress,
                state: e.target.value
            }
        })
    }
    onCityChange(e) {
        this.setState({
            dummyaddress: {
                ...this.state.dummyaddress,
                city: e.target.value
            }
        })
    }
    onZipChange(e) {
        this.setState({
            dummyaddress: {
                ...this.state.dummyaddress,
                zip: e.target.value
            }
        })
    }

    handleAddClose() {
        this.setState({
            dummyaddress: {},
            showAddAddress: false
        })
    }
    saveAddress() {
        let body = {
            id: sessionStorage.getItem('id'),
            name: this.state.name,
            address: this.state.dummyaddress
        }
        this.props.saveSellerAddress(body);
        this.setState({
            showAddAddress: false,
            address: this.state.dummyaddress
        })
    }

    saveName() {
        let body = {
            id: sessionStorage.getItem('id'),
            name: this.state.dummyName,
            address: this.state.address
        }
        this.props.saveSellerAddress(body);
        this.setState({
            showAddAddress: false,
            address: this.state.dummyaddress
        })
    }
    saveSellerProfilePic() {
        let fdata = new FormData();
        fdata.append("id", sessionStorage.getItem('id'));
        fdata.append('picture', this.state.uploadedImage)

        this.props.saveSellerProfilePic(fdata)
    }

    showAddress() {

        if (this.state.showAddAddress)
            return (
                <div style={{ padding: "20px" }}>
                    <div class="form-group">
                        <label for="inputAddress">Address</label>
                        <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" value={this.state.dummyaddress.address1} onChange={this.onMainAddChange} />
                    </div>
                    <div class="form-group">
                        <label for="inputAddress2">Address 2</label>
                        <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" value={this.state.dummyaddress.address2} onChange={this.onAdd2Change} />
                    </div>
                    <div class="row">
                        <div class="form-group col-md-6" style={{ paddingLeft: "0px" }}>
                            <label for="inputCity">City</label>
                            <input type="text" class="form-control" id="inputCity" placeholder="City" value={this.state.dummyaddress.city} onChange={this.onCityChange} />

                        </div>
                        <div class="form-group col-md-4">
                            <label for="inputState">State</label>
                            <input type="text" class="form-control" id="inputState" placeholder="State" value={this.state.dummyaddress.state} onChange={this.onStateChange} />
                        </div>
                        <div class="form-group col-md-2" style={{ paddingRight: "0px" }}>
                            <label for="inputZip">Zip</label>
                            <input type="text" class="form-control" id="inputZip" placeholder="Zip" value={this.state.dummyaddress.zip} onChange={this.onZipChange} />
                        </div>
                    </div>
                    <div class="row">
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" onClick={this.handleAddClose}>Close</button>
                            <button type="button" class="btn btn-primary" onClick={this.saveAddress} >Save changes</button>
                        </div>

                    </div>

                </div>
            )
        else {
            return (
                <div >
                    <div style={{ paddingLeft: "20px", fontSize: "20px" }} >


                        <h3> Address </h3>
                        {
                            this.state.address.address1 ? <div class="row">
                                Main Address : {this.state.address.address1}
                            </div> : ""
                        }
                        {
                            this.state.address.city ? <div class="row">
                                City : {this.state.address.city}
                            </div> : ""
                        }
                        {
                            this.state.address.state ? <div class="row">
                                State : {this.state.address.state}
                            </div> : ""
                        }
                        {
                            this.state.address.zip ? <div class="row">
                                Zip : {this.state.address.zip}
                            </div> : ""
                        }
                    </div>
                    <hr></hr>
                    {sessionStorage.getItem('persona') === "seller" ? <div class="row" style={{ paddingBottom: "20px", cursor: "pointer" }} onClick={this.showEditAddress}> <center>{this.state.address.address1 ? "Edit Address" : "Add Address"}</center> </div> : ""}
                </div>
            )
        }
    }
    showEditAddress() {
        this.setState({
            showAddAddress: true,
            dummyaddress: this.state.address
        })
    }
    handleFileChange(e) {
        this.setState({
            uploadedImage: e.target.files[0]
        })
    }

    handlePictureClose() {
        this.setState({
            uploadedImage: "",
            open: false
        })
    }

    handleClickOpen() {
        this.setState({
            open: true,
        })
    }
    onNameChange(e) {
        this.setState({
            dummyName: e.target.value,
        })
    }
    handleNameClose() {
        this.setState({
            editName: false,
            dummyName: ""

        })
    }
    showEditName() {
        this.setState({
            editName: true,
            dummyName: this.state.name
        })
    }
    showEditNameSubmissions() {
        this.setState({
            editNameIcon: true,
        })
    }
    closeEditNameIcon() {
        this.setState({
            editNameIcon: false,
        })
    }


    showBAsicDetails() {
        return (<div class="row" onMouseEnter={this.showEditNameSubmissions} onMouseLeave={this.closeEditNameIcon} >
            <div >
               
                <div class="col-md-10">
                    <center>
                        {this.state.image ? <Avatar alt="Cindy Baker" src={this.state.image} className="imageSIze" onClick={this.handleClickOpen} />
                            : <Avatar alt="Cindy Baker" className="imageSIze" onClick={this.handleClickOpen} > Add </Avatar>
                        }
                    </center>
                </div>
                <div class = "col-md-2">
                {this.state.editNameIcon ? <EditTwoToneIcon color="primary" fontSize="large" onClick={this.showEditName}></EditTwoToneIcon> : ""}
              </div>
                
                  

            </div>
            {!this.state.editName ? <div class="col-md-10">
                <center>
                    <h3> {this.state.name} </h3>
                </center>
            </div> :
                <div>
                    <div class="form-group" style = {{ padding : "20px"}}>
                        <label for="inputAddress">Name</label>
                        <input type="text" class="form-control" id="inputAddress" placeholder="Name" value={this.state.dummyName} onChange={this.onNameChange} />
                    </div>
                    <div class="row">
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" onClick={this.handleNameClose}>Close</button>
                            <button type="button" class="btn btn-primary" onClick={this.saveName} >Save</button>
                        </div>

                    </div>
                </div>
            }
            <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title"> Upload your Photo.   </DialogTitle>
                <DialogContent>
                    <input type="file" onChange={this.handleFileChange}>
                    </input>
                </DialogContent>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onClick={this.handlePictureClose}>Close</button>
                    <button type="button" class="btn btn-primary" onClick={this.saveSellerProfilePic} >Save </button>
                </div>
            </Dialog>
        </div>)
    }
    render() {
        return (
            <div class="row" style={{ padding: "40px" }}>

                <div class="col-md-3">
                    <Card>
                        {this.showBAsicDetails()}
                    </Card>
                </div>
                <div class="col-md-9">
                    <Card>
                        {this.showAddress()}
                    </Card>

                </div>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        seller: state.sellerReducer
    };
};

function mapDispatchToProps(dispatch) {
    return {
        getSellerProfileDetails : payload => dispatch(getSellerProfileDetails(payload)),
        saveSellerAddress: payload => dispatch(saveSellerAddress(payload)),
        saveSellerProfilePic: payload => dispatch(saveSellerProfilePic(payload))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SellerProfile);
