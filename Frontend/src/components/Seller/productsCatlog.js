import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNewProduct, getSellerProductCatalog, showEditProduct } from '../../redux/actions/sellerActions'
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import AddProduct from "./ProductModifictaion";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Dialog from '@material-ui/core/Dialog';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import '../css/catalog.css'
import Pagination from "@material-ui/lab/Pagination";
import Rating from '@material-ui/lab/Rating';
import Loading from '../loading';

class SellerCatalog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            count: 0,
            displayResultsOffset: 1,
            currPage: 1,
            pageCount: 1,
            searchText: this.props.location.state ? this.props.location.state.search : '',
            category: "Toys"
        };
        this.handleOptionChange = this.handleOptionChange.bind(this)
        this.validateCredentials = this.validateCredentials.bind(this);
        this.showAllProducts = this.showAllProducts.bind(this);
        this.handlePaginationChange = this.handlePaginationChange.bind(this);
        this.getPaginationDetail = this.getPaginationDetail.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        let sch = nextProps.location.state ? nextProps.location.state.search : '';
        if (this.state.searchText != sch) {
            let data = {
                searchText: sch,
                filterCategory: '',
                displayResultsOffset: '1'
            }
            this.props.getSellerProductCatalog(data);
        }
        this.setState({
            products: nextProps.seller.products,
            searchText: nextProps.location.state ? nextProps.location.state.search : '',
            currPage: nextProps.seller.currPage,
            pageCount: nextProps.seller.pageCount,
            count: nextProps.seller.count,
        })
    }
    handlePaginationChange(event, value) {
        let data = {
            searchText: this.props.location.state ? this.props.location.state.search : '',
            filterCategory: '',
            displayResultsOffset: ((value - 1) * 50) + 1
        }

        this.props.getSellerProductCatalog(data)
        this.setState({
            currPage: value,

        })
    }
    getPaginationDetail() {
        let start = (this.state.currPage - 1) * this.props.seller.productsPerPage;
        let end = start + this.props.seller.productsPerPage;
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
    componentDidMount() {
        // if (!Object.keys(this.props.seller.products).length) {
        let data = {
            searchText: this.props.location.state ? this.props.location.state.search : '',
            filterCategory: '',
            displayResultsOffset: '1'
        }

        this.setState({
            searchText: this.props.location.state ? this.props.location.state.search : '',

        })
        this.props.getSellerProductCatalog(data)
        // }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        const data = {
            persona: this.state.persona,
            email: this.state.mail,
            password: this.state.password,
        }
        this.props.login(data);
    }

    handleOptionChange = (e) => {
        this.setState({
            persona: e.target.value
        })
    }

    sortfun = (e) => {

    }

    validateCredentials = () => {
        if (this.state.mail !== "" && this.state.password !== "") return false
        else return true
    }

    calculatePrice = (price, discount) => {
        if (discount) {
            let discountedprice = (price * (100 - discount)) / 100;
            return (Math.round((discountedprice + Number.EPSILON) * 100) / 100).toString().split('.')
        }
        else
            return price.toString().split('.')
    }


    showAllProducts() {
        let productlist = [];
        this.state.products.map((product, index) => {
            var price = []
            price = product.price.toString().split('.');
            price = this.calculatePrice(product.price, product.discount)
            productlist.push(<ProductDetail price={price} product={product} showEditProduct={this.props.showEditProduct} addNewProduct={this.props.addNewProduct} seller={this.props.seller}></ProductDetail>)
        })
        return productlist;
    }

    render() {
        let redirectVar = null;
        let productlist = null;
        let sortfilter = null;

        // if (sessionStorage.getItem("email") !== null && sessionStorage.getItem("persona") === "customer") {
        //     redirectVar = <Redirect to="/catalog" />
        // }

        sortfilter = (<div class='sortContainer'>
            <div class='col-md-7'>
                <div class='resultsContainer'>
                    {this.state.count < this.state.displayResultsOffset ? this.state.count : this.state.displayResultsOffset}-{50 * this.state.displayResultsOffset > this.state.count ? this.state.count : 50 * this.state.displayResultsOffset} results {this.state.searchText ? <span>for <span class='searchText'>"{this.state.searchText}"</span></span> : ""} of {this.state.count}
                </div>
            </div>
            {/* <div class='col-md-5'>
                <div class='dropdownConatiner'>
                    <div class="dropdown">
                        <button class="btn btn-secondary btn-sm dropdown-toggle dropButton" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span class='dropLabel'>Sort by</span>
                            <span class='arrowIcon'>
                                <svg
                                    t="1582611929385"
                                    class="chevron"
                                    viewBox="0 0 1024 1024"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    p-id="902"
                                    width="20px"
                                    height="16px"
                                    fill="currentColor"
                                >
                                    <path
                                        d="M316.16 366.08 512 561.92 707.84 366.08 768 426.666667 512 682.666667 256 426.666667 316.16 366.08Z"
                                        p-id="903"
                                    ></path>
                                </svg></span>
                        </button>
                        <div class="dropdown-menu customMenu" aria-labelledby="dropdownMenuButton">
                            <a class="dropdown-item dropItem" onClick={this.sortfun()}>Price:Low to High</a><br />
                            <a class="dropdown-item dropItem" onClick={this.sortfun()}>Price:High to Low</a><br />
                            <a class="dropdown-item dropItem" onClick={this.sortfun()}>Avg Customer Review</a>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>)



        return (
            <div>
                <Loading />
                <div class="productContainer">
                    {redirectVar}
                    {sortfilter}
                </div>
                <div class="row" style={{ padding: "40px", paddingTop: "0px" }}>
                    {this.showAllProducts()}

                </div>
                <div class="row" style={{ padding: "40px", paddingTop: "0px" }}>
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
        this.showEditProduct = this.showEditProduct.bind(this);
        this.onShowDelete = this.onShowDelete.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.ratingPopover = this.ratingPopover.bind(this);
    }
    componentWillReceiveProps() {
        this.setState({
            showDelete: this.props.seller.showDelete
        })
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

    showEditProduct() {
        this.props.showEditProduct(this.props.product);

    }
    handleClose() {
        this.setState({
            showDelete: false
        })
    }
    onShowDelete() {
        this.setState({
            showDelete: true
        })
    }

    deleteProduct() {
        let product = this.props.product;
        let fdata = new FormData();
        fdata.append('seller_id', sessionStorage.getItem('id'));
        fdata.append('name', product.name);
        fdata.append('description', product.description);
        fdata.append('price', product.price);
        fdata.append('category', product.category.categoryName);
        fdata.append('discount', product.discount);
        fdata.append("active", false)


        let images = [];
        images.push(product.images)
        fdata.append("images", images);
        fdata.append("id", product._id)

        this.props.addNewProduct(fdata);
    }


    showDeleteProduct() {
        return (
            <div>
                <Dialog open={this.state.showDelete} onClose={this.handleClose} aria-labelledby="form-dialog-title" style={{ "min-width": "700px" }}>
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Delete Product</h5>
                        <button type="button" class="close" onClick={this.handleClose} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="row">
                                Do you want to remove {this.props.product.name} from your catlog ?

                                </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" onClick={this.handleClose}>No</button>
                        <button type="button" class="btn btn-primary" onClick={this.deleteProduct} >Yes</button>
                    </div>
                </Dialog>
            </div>
        )
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
        // var price = []
        // price = product.discountedPrice.toString().split('.');
        return (
            <div class='col-md-3'>
                <div class="product" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                    <div class='grid'></div>
                    <Link class='productlink' to={"/product/" + product._id}>
                        <div class='imgContainer'>
                            <center>
                                <img class='img' src={product.images[0]} alt={product.name}></img>
                            </center>
                        </div>
                        <div class='productTitle'>
                            {product.name}
                        </div></Link>
                    <div class="row" style={{ minHeight: "30px" }}>
                        <div class="col-md-11" style ={{ paddingLeft : "0px"}}>
                            <span class='starRating' onMouseEnter={() => this.ratingPopover('Focus')} onMouseLeave={() => this.ratingPopover('onFocusOut')}>
                                <Rating name="half-rating" size='large' value={product.cumulative_rating} precision={0.1} readOnly />
                            </span>
                        </div>
                        <div class="col-md-1" style={{ padding: "0px", cursor: "pointer" }}>
                            {this.state.showEditIcon ? <EditTwoToneIcon color="primary" fontSize="large" onClick={this.showEditProduct}></EditTwoToneIcon> : ""}
                        </div>

                    </div>
                    <div class="row" style={{ minHeight: "30px" }}>
                        <div class="col-md-11" style ={{ paddingLeft : "0px"}}>
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
                       
                        <div class="col-md-1" style={{ padding: "0px", cursor: "pointer" }}>
                            {this.state.showEditIcon ? <DeleteForeverIcon color="primary" fontSize="large" onClick={this.onShowDelete}></DeleteForeverIcon> : ""}

                        </div>
                        {this.showDeleteProduct()}
                    </div>

                </div>
            </div>)
        // return (
        //     <div>
        //         <div onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
        //             <div class='col-md-3' style={{
        //                 "padding-left": "30px",
        //                 "padding-right": "30px"
        //             }}  >

        //                 <div >


        //                     {product.images.length ? <img src={product.images[0]} alt={product.name} style={{ maxHeight: "295px", minHeight: "295px", width: "100%" }}></img> : ""}
        //                 </div>
        //                 <div class="row" style={{ "padding-top": "5px" }}>
        //                     <div class="col-md-11" style={{ padding: "0px" }}>
        //                         <div class='sellerProductTitle'>
        //                             {product.name}
        //                         </div>
        //                     </div>
        //                     <div class="col-md-1" style={{ padding: "0px", cursor: "pointer" }}>
        //                         {this.state.showEditIcon ? <EditTwoToneIcon color="primary" fontSize="large" onClick={this.showEditProduct}></EditTwoToneIcon> : ""}

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
        //                 <div class="row" style={{ minHeight: "30px" }}>
        //                     <div class="col-md-11" style={{ padding: "0px" }}>
        //                         {product.description}
        //                     </div>
        //                     <div class="col-md-1" style={{ padding: "0px" }}>
        //                         {this.state.showEditIcon ? <DeleteForeverIcon color="primary" fontSize="large" onClick={this.onShowDelete}></DeleteForeverIcon> : ""}

        //                     </div>
        //                     {this.showDeleteProduct()}
        //                 </div>

        //             </div>
        //         </div>
        //     </div>
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
        getSellerProductCatalog: payload => dispatch(getSellerProductCatalog(payload)),
        addNewProduct: payload => dispatch(addNewProduct(payload)),
        showEditProduct: payload => dispatch(showEditProduct(payload)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SellerCatalog);