import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategoryList, getAdminProductCatalog, addCategory, removeCategory } from '../../redux/actions/adminActions'
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import Pagination from "@material-ui/lab/Pagination";
import Divider from '@material-ui/core/Divider';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Dialog from '@material-ui/core/Dialog';
import '../css/catalog.css'
import { Link } from 'react-router-dom';
import Loading from '../loading';
import Rating from '@material-ui/lab/Rating';
const _ = require('lodash');
class InventryListings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: {
                _id: "1",
                name: "All",


            },
            count: 0,
            displayResultsOffset: 1,
            currPage : 1,
            pageCount : 1,
            showAddCategory: false,
            catError: false,
            newCategory: "",
            productCatgeoryList: [
            ],
            currentProducts: [

            ]
        };
        this.filters = this.filters.bind(this);
        this.onChange = this.onChange.bind(this);
        this.changeFilter = this.changeFilter.bind(this);
        this.newCatChangeHandler = this.newCatChangeHandler.bind(this);
        this.showAddCategory = this.showAddCategory.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.addCategory = this.addCategory.bind(this);
        this.removeCategory = this.removeCategory.bind(this);
        this.showAllProducts = this.showAllProducts.bind(this);
        this.handlePaginationChange = this.handlePaginationChange.bind(this);
        this.getPaginationDetail = this.getPaginationDetail.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            productCatgeoryList: nextProps.admin.categoryList,
            category: nextProps.admin.currentCategory,
            currentProducts: nextProps.admin.productsList,
            currPage : nextProps.admin.currPage ,
            pageCount : nextProps.admin.pageCount ,
            count: nextProps.admin.count,
        })
    }

    handlePaginationChange(event, value) {
        // let data = {
        //     searchText: this.props.location.state ? this.props.location.state.search : '',
        //     filterCategory: '',
        //     displayResultsOffset: ((value-1)*50)+1
        // }
        let data = {
            searchText: '',
            filterCategory: {
                name: this.props.admin.currentCategory.name
            },
            displayResultsOffset: ((value-1)*50)+1
        }
        this.props.getAdminProductCatalog(data);
        this.props.getCategoryList();
        // this.setState({
        //     currPage: value,
           
        // })
    }
    getPaginationDetail() {
        let start = (this.state.currPage - 1) * this.props.admin.productsPerPage;
        let end = start + this.props.admin.productsPerPage;
        let total = this.state.count;
        if (this.state.pageCount < 2)
            end = total
        if (total)
            return (
                <div class="row">
                   

                    <div class="col-md-10">
                        <Pagination count={this.state.pageCount} page={this.state.currPage} onChange={this.handlePaginationChange} />
                    </div>

                </div>)
    }
    calculatePrice = (price, discount) => {
        if (discount) {
            let discountedprice = (price * (100 - discount)) / 100;
            return (Math.round((discountedprice + Number.EPSILON) * 100) / 100).toString().split('.')
        }
        else
            return price.toString().split('.')
    }
    componentDidMount() {
        let data = {
            searchText: '',
            filterCategory: {
                name: "All"
            },
            displayResultsOffset: '1'
        }
        this.props.getAdminProductCatalog(data);
        this.props.getCategoryList();
    }
    changeFilter = (e) => {

        this.setState({
            category: JSON.parse(e.target.value)
        });
        let data = {
            searchText: '',
            filterCategory: JSON.parse(e.target.value),
            displayResultsOffset: '1'
        }
        this.props.getAdminProductCatalog(data);
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    newCatChangeHandler(e) {
        this.setState({
            newCategory: e.target.value,
            catError: false
        })
    }
    addNewCategoryDialog() {
        return (
            <div>
                <Dialog class="addNewCategoryDialog" open={this.state.showAddCategory} onClose={this.handleClose} aria-labelledby="form-dialog-title" style={{ "min-width": "700px" }}>

                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Add New Category</h5>
                            <button type="button" class="close" onClick={this.handleClose} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form>

                                <div class="form-group">
                                    <label id="validationCustomUsername">Category Name</label>
                                    <input type="text" class="form-control" id="validationCustomUsername" value={this.state.newCategory} onChange={this.newCatChangeHandler} placeholder="Category Name" required />
                                    <div class="invalid-feedback" style={{ color: "red" }}>
                                        {this.state.catError ? "Category Allready Exists" : ""}
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" onClick={this.handleClose}>Close</button>
                            <button type="button" class="btn btn-primary" disabled = {!this.state.newCategory} onClick={this.addCategory} >Save changes</button>
                        </div>
                    </div>

                </Dialog>
            </div>
        )
    }
    removeCategory() {


        this.props.removeCategory(this.state.category)

    }
    addCategory() {
        let catName = this.state.newCategory;

        let index = _.findIndex(this.state.productCatgeoryList, function (o) { return o.name === catName });
        if (index === -1) {
            let newCat = {
                name: this.state.newCategory
            }

            this.props.addCategory(newCat);
            this.setState({
                showAddCategory: false
            })
        }
        else {
            this.setState({
                catError: true
            })
        }
    }
    showAddCategory() {
        this.setState({
            showAddCategory: true,
            catError: false,
            newCategory: ""
        })
    }
    handleClose() {
        this.setState({
            showAddCategory: false,
            catError: false
        })
    }

    filters() {
        let options = [];
        let defaultCategory = {
            name: "All"
        }
        this.state.productCatgeoryList.map(category => {
            options.push(<option value={JSON.stringify(category)} > {category.name}</option>)

        })

        return (
            <div>
                <Loading></Loading>
                <div className="row" style={{ marginBottom: "15px" }}>
                    <div className="col-md-4" style={{ padding: "0px" }}>
                        <p style={{ fontSize: "25px" }}>Showing {this.state.category.name} Products</p>
                    </div>


                    <div className="col-md-4" >
                        <select class="form-control" id="exampleFormControlSelect1" value={JSON.stringify(this.state.category)}

                            onChange={this.changeFilter}>
                            <option value={JSON.stringify(defaultCategory)} > {defaultCategory.name}</option>
                            {options}
                        </select>
                    </div>
                    <div className="col-md-2" >
                        <button style={{ height: "33px", backgroundColor: "#5e5e5e" }} type="button" class="btn btn-" onClick={this.showAddCategory}>
                            <b style={{ fontSize: "14px", color: "white" }}>Add Category</b>
                        </button>
                    </div>
                    <div className="col-md-2" >
                        {this.state.currentProducts.length === 0 && this.state.category.name !== "All" ? <button style={{ height: "33px", backgroundColor: "#5e5e5e" }} type="button" class="btn btn-" onClick={this.removeCategory}>
                            <b style={{ fontSize: "14px", color: "white" }}>Remove Category</b>
                        </button> : ""}


                    </div>
                </div>
                <Divider light style={{ margin: "2px 0px 15px" }} />
            </div>
        )
    }
    showAllProducts() {
        let productlist = [];
        this.state.currentProducts.map((product, index) => {
            var price = []
            price = product.price.toString().split('.');
            price = this.calculatePrice(product.price, product.discount)

            productlist.push(<ProductDetail price={price} product={product} showEditProduct={this.props.showEditProduct} addNewProduct={this.props.addNewProduct} seller={this.props.admin}></ProductDetail>)
        })
        return productlist;
    }

    render() {



        return (
            <div>
                <div class="row" style={{ padding: "40px" }}>

                    {this.filters()}
                </div>
                {this.addNewCategoryDialog()}
                <div class="row" style={{ padding: "40px" , paddingTop : "0px" }}>
                    {this.showAllProducts()}

                </div>
                <div class ="row" style={{ padding: "40px" , paddingTop : "0px" }}>
                {this.getPaginationDetail()}
                </div>

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
            stylePopover: "popoverNone"
        }
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.ratingPopover = this.ratingPopover.bind(this);
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

    ratingPopover = (e) => {
        if (e === 'Focus') {
            this.setState({
                stylePopover: "popoverDisplay"
            })
        } else if (e === 'onFocusOut') {
            this.setState({
                stylePopover: "popoverNone"
            })
        }
    }





    render() {
        let product = this.props.product;
        let price = this.props.price;
        return(
            <div class='col-md-3' style={{minHeight:"402px",maxHeight:"402px"}}>
            <div class="product">
                <div class='grid'></div>
                <Link class='productlink' to={"/product/" + product._id}>
                    <div class='imgContainer'>
                        <center>
                            <img class='img' src={product.images[0]} alt={product.name}></img>
                        </center>
                    </div>
                    <div class='productTitle'>{product.name}</div></Link>
                <span class='starRating' onMouseEnter={() => this.ratingPopover('Focus')} onMouseLeave={() => this.ratingPopover('onFocusOut')}>
                    <Rating name="half-rating" size='large' value={product.cumulative_rating} precision={0.1} readOnly />
                </span>
                <span stylePopover={{ width: '220px' }} class={this.state.stylePopover}><Rating name="half-rating-read" size='large' value={product.cumulative_rating} precision={0.1} readOnly /><span class='ratingNote'>{product.cumulative_rating ? product.cumulative_rating : 0} out of 5 stars</span></span>
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
        
        // return (
        //     <div>
        //         <div onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
        //             <div class='col-md-3' style={{
        //                 "padding-left": "30px",
        //                 "padding-right": "30px"
        //             }} >
        //                 <div class="">


        //                     {product.images.length ? <img class='' src={product.images[0]} alt={product.name} style={{ maxHeight: "295px", minHeight: "295px", width: "100%" }}></img> : ""}
        //                 </div>
        //                 <div class="row" style={{ "padding-top": "5px" }}>
        //                     <div class="col-md-11" style={{ padding: "0px" }}>
        //                         <div class='sellerProductTitle'>
        //                             {product.name}
        //                         </div>
        //                     </div>



        //                 </div>
        //                 <div class="row" style={{ "padding-top": "5px" }}>
        //                     <div class="col-md-11" style={{ padding: "0px" }}>
        //                         <div class=''>
        //                             {product.seller_id ? <span>Sold By: <Link to={{
        //                                                     pathname: "/seller/profile",
        //                                                     state: {
        //                                                         seller: product.seller_id,
        //                                                         isSeller: false,
        //                                                     }
        //                                                 }}  className="linkColor">{product.seller_id.name}</Link> </span> : ""}
        //                         </div>
        //                     </div>



        //                 </div>


        //                 <div class="stars-outer">
        //                     <div class="stars-inner"></div>
        //                 </div>
        //                 <div>
        //                 </div>
        //                 {product.discount ? <div>
        //                     <span class="priceSymbol">$</span>
        //                     <span class='price'>{price[0]}</span>
        //                     <span class="priceSymbol">{price[1]}</span>
        //                     <span class="oldprice">${product.price}</span>
        //                 </div> :
        //                     <div>
        //                         <span class="priceSymbol">$</span>
        //                         <span class='price'>{price[0]}</span>
        //                         <span class="priceSymbol">{price[1]}</span>
        //                     </div>}
        //                 <div class="row" style={{ minHeight: "25px" }}>
        //                     <div class="col-md-11" style={{ padding: "0px" }}>
        //                         {product.description}
        //                     </div>

        //                 </div>

        //             </div>
        //         </div>
        //     </div>
        // )
    }
}


const mapStateToProps = state => {
    return {
        admin: state.admin,
        common: state.common
    };
};

function mapDispatchToProps(dispatch) {
    return {
        removeCategory: payload => dispatch(removeCategory(payload)),
        addCategory: payload => dispatch(addCategory(payload)),
        getCategoryList: payload => dispatch(getCategoryList(payload)),
        getAdminProductCatalog: payload => dispatch(getAdminProductCatalog(payload)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InventryListings);