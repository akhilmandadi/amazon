import React, { Component } from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import { saveSellerAddress, saveSellerProfilePic, getSellerProductCatalog, getSellerProfileDetails } from '../../redux/actions/sellerActions'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import "../css/seller.css"
import { Card } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { Link } from 'react-router-dom';
import Rating from '@material-ui/lab/Rating';
import Loading from '../loading';
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
            stylePopover: [''],
            editNameIcon: false,
            editName: false,
            notSeller: false,
            cumulative_rating: 0,
            month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
   


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
        this.showAllProducts = this.showAllProducts.bind(this);
        this.handlePaginationChange = this.handlePaginationChange.bind(this);
        this.getPaginationDetail = this.getPaginationDetail.bind(this);
        this.ratingPopover = this.ratingPopover.bind(this);


    }
    componentDidMount() {
        if (this.props.location.state) {
            this.props.getSellerProfileDetails(this.props.location.state.seller._id);
            let data = {
                searchText: '',
                filterCategory: '',
                displayResultsOffset: '1',
                id: this.props.location.state.seller._id
            }
            this.setState({
                notSeller: true
            })

            this.props.getSellerProductCatalog(data)
        }
        else
            this.props.getSellerProfileDetails();

    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            name: nextProps.seller.profile.name,
            address: nextProps.seller.profile.address,
            image: nextProps.seller.profile.image,
            open: false,
            showAddAddress: false,
            editName: false,



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
                            <button type="button" class="btn btn-primary" disabled = {!(this.state.dummyaddress.address1  && this.state.dummyaddress.address2 &&  this.state.dummyaddress.city && this.state.dummyaddress.state && this.state.dummyaddress.zip )} onClick={this.saveAddress} >Save changes</button>
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
        if(sessionStorage.getItem('persona') === "seller" )
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

    calculatePrice = (price, discount) => {
        if (discount) {
            let discountedprice = (price * (100 - discount)) / 100;
            return (Math.round((discountedprice + Number.EPSILON) * 100) / 100).toString().split('.')
        }
        else
            return price.toString().split('.')
    }
    handlePaginationChange(event, value) {
        // let data = {
        //     searchText: '',
        //     filterCategory: '',
        //     displayResultsOffset: ((value-1)*50)+1
        // }

        // this.props.getSellerProductCatalog(data)
        let data = {
            searchText: '',
            filterCategory: '',
            displayResultsOffset: ((value - 1) * 50) + 1,
            id: this.props.location.state.seller._id
        }

        this.props.getSellerProductCatalog(data)

    }
    getPaginationDetail() {
        let start = (this.state.currPage - 1) * this.props.seller.productsPerPage;
        let end = start + this.props.seller.productsPerPage;
        let total = this.props.seller.count;
        if (this.props.seller.pageCount < 2)
            end = total
        if (total)
            return (
                <div class="row">


                    <div class="col-md-10">
                        <Pagination count={this.props.seller.pageCount} page={this.props.seller.currPage} onChange={this.handlePaginationChange} />
                    </div>

                </div>)
    }
    ratingPopover = (e, index) => {
        let stylePopover = this.state.stylePopover
        if (e === 'Focus') {
            stylePopover[index] = 'popoverDisplay'
            this.setState({
                stylePopover: stylePopover
            })
        } else if (e === 'onFocusOut') {
            stylePopover[index] = 'popoverNone'
            this.setState({
                stylePopover: stylePopover
            })
        }
    }
    showAllProducts() {
        let date = new Date();
        let  productlist = (<div>{
            this.props.seller.products.map((product, index) => {
                var price = []
                price = product.discountedPrice.toString().split('.');
                return (
                    <div class='col-md-3'>
                        <div class="product">
                            <div class='grid'></div>
                            <Link class='productlink' to={"/product/"+product._id}>
                            <div class='imgContainer'>
                                <center>
                                    <img class='img' src={product.images[0]} alt={product.name}></img>
                                </center>
                            </div>
                            <div class='productTitle'>{product.name}</div></Link>
                            <span class='starRating' onMouseEnter={() => this.ratingPopover('Focus', index)} onMouseLeave={() => this.ratingPopover('onFocusOut', index)}>
                                <Rating name="half-rating" size='large' value={product.cumulative_rating} precision={0.1} readOnly />
                            </span>
                            <span stylePopover={{ width: '220px' }} class={this.state.stylePopover[index] ? this.state.stylePopover[index] : 'popoverNone'}><Rating name="half-rating-read" size='large' value={product.cumulative_rating} precision={0.1} readOnly /><span class='ratingNote'>{product.cumulative_rating?product.cumulative_rating:0} out of 5 stars</span></span>
                            {(product.discountedPrice !== product.price) ? <div>
                                <span class="priceSymbol">$</span>
                                <span class='price'>{price[0]}</span>
                                <span class="priceSymbol">{price[1]}</span>
                                <span class="oldprice">${product.price}</span>
                            </div> :
                                <div>
                                    <span class="priceSymbol">$</span>
                                    <span class='price'>{price[0]}</span>
                                    <span class="priceSymbol">{price[1]}</span>
                                </div>}
                          
                        </div>
                    </div>)
            })
        }</div>)
        // let productlist = [];
        // this.props.seller.products.map((product, index) => {
        //     var price = []
        //     price = product.price.toString().split('.');
        //     price = this.calculatePrice(product.price, product.discount)
        //     productlist.push(<ProductDetail price={price} product={product} showEditProduct={this.props.showEditProduct} addNewProduct={this.props.addNewProduct} seller={this.props.seller}></ProductDetail>)
        // })
        return productlist;
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
                <div class="col-md-2">
                    {sessionStorage.getItem('persona') === "seller" && this.state.editNameIcon ? <EditTwoToneIcon color="primary" fontSize="large" onClick={this.showEditName}></EditTwoToneIcon> : ""}
                </div>



            </div>
            {!this.state.editName ? <div class="col-md-10">
                <center>
                    <h3> {this.state.name} </h3>
                </center>
            </div> :
                <div>
                    <div class="form-group" style={{ padding: "20px" }}>
                        <label for="inputAddress">Name</label>
                        <input type="text" class="form-control" id="inputAddress" placeholder="Name" value={this.state.dummyName} onChange={this.onNameChange} />
                    </div>
                    <div class="row">
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" onClick={this.handleNameClose}>Close</button>
                            <button type="button" class="btn btn-primary" disabled = {!this.state.dummyName} onClick={this.saveName} >Save</button>
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
                    <button type="button" class="btn btn-primary" disabled = {!this.state.uploadedImage} onClick={this.saveSellerProfilePic} >Save </button>
                </div>
            </Dialog>
        </div>)
    }
    render() {
        return (
            <div>
                  <Loading />
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
                <div class="row" style={{ padding: "40px" }}>
                    {this.state.notSeller ? (

                        <div>
                            <div className="row" style={{ marginBottom: "15px" }}>
                                <div className="col-md-4" style={{ padding: "0px" }}>
                                    <p style={{ fontSize: "25px" }}>Showing {this.props.location.state.seller.name} Products</p>
                                </div>

                            </div>
                            <div class="row" style={{ padding: "40px" }}>

                                {this.showAllProducts()}

                            </div>
                            <div class="row" style={{ padding: "40px" }}>

                                {this.getPaginationDetail()}

                            </div>

                        </div>) : ""}</div>
            </div>
        )
    }
}
class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showEditIcon: false,
            showDelete: false,
        }
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
    }
    componentWillReceiveProps() {

    }
    onMouseEnter() {
        this.setState({
            showEditIcon: true,
        })
    }
    onMouseLeave() {
        this.setState({
            showEditIcon: false,
        })
    }







    render() {
        return("")
    //     let product = this.props.product;
    //     let price = this.props.price;
    //     return (<div class='col-md-3'>
    //     <div class="product">
    //         <div class='grid'></div>
    //         <Link class='productlink' to={"/product/"+product._id}>
    //         <div class='imgContainer'>
    //             <center>
    //                 <img class='img' src={product.images[0]} alt={product.name}></img>
    //             </center>
    //         </div>
    //         <div class='productTitle'>{product.name}</div></Link>
    //         <span class='starRating' onMouseEnter={() => this.ratingPopover('Focus', index)} onMouseLeave={() => this.ratingPopover('onFocusOut', index)}>
    //             <Rating name="half-rating" size='large' value={product.cumulative_rating} precision={0.1} readOnly />
    //         </span>
    //         <span stylePopover={{ width: '220px' }} class={this.state.stylePopover[index] ? this.state.stylePopover[index] : 'popoverNone'}><Rating name="half-rating-read" size='large' value={product.cumulative_rating} precision={0.1} readOnly /><span class='ratingNote'>{product.cumulative_rating?product.cumulative_rating:0} out of 5 stars</span></span>
    //         {(product.discountedPrice !== product.price) ? <div>
    //             <span class="priceSymbol">$</span>
    //             <span class='price'>{price[0]}</span>
    //             <span class="priceSymbol">{price[1]}</span>
    //             <span class="oldprice">${product.price}</span>
    //         </div> :
    //             <div>
    //                 <span class="priceSymbol">$</span>
    //                 <span class='price'>{price[0]}</span>
    //                 <span class="priceSymbol">{price[1]}</span>
    //             </div>}
    //         <div class='desc'>
    //             <div>Get it as soon as <span class='etaDate'>{this.state.day[date.getDay()]},{this.state.month[date.getMonth()]} {date.getDate()}</span></div>
    //             <div class='description'>FREE Shipping on orders over $25 shipped by Amazon</div>
    //         </div>
    //     </div>
    // </div>
        // )
    }
}
const mapStateToProps = state => {
    return {
        seller: state.sellerReducer
    };
};

function mapDispatchToProps(dispatch) {
    return {
        getSellerProductCatalog: payload => { dispatch(getSellerProductCatalog(payload)) },
        getSellerProfileDetails: payload => dispatch(getSellerProfileDetails(payload)),
        saveSellerAddress: payload => dispatch(saveSellerAddress(payload)),
        saveSellerProfilePic: payload => dispatch(saveSellerProfilePic(payload))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SellerProfile);
