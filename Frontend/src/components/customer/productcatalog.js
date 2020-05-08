import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProductCatalog, fetchProducts } from '../../redux/actions/customerActions';
import { getCustomerCart } from '../../redux/actions/cart';
import Rating from '@material-ui/lab/Rating';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import '../css/catalog.css'
import _ from 'lodash';
import Pagination from '@material-ui/lab/Pagination';
import Loading from '../loading';
// import { browserHistory } from 'react-router';

class Catalog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayResultsOffset: 1,
            searchText: "",
            filterCategory: "",
            sortType: "",
            stylePopover: [''],
            products: [],
            categories: [],
            count: 0,
            cumulative_rating: 0,
            month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        };
        this.handleOptionChange = this.handleOptionChange.bind(this)
        this.validateCredentials = this.validateCredentials.bind(this);
        // this.fetchProductsbyCategory = this.fetchProductsbyCategory(this);
    }

    componentDidMount() {
            let data = {
            // searchText: this.props.location.state?this.props.location.state.productSearchInput?this.props.location.state.productSearchInput:this.props.productSearchInput:this.props.productSearchInput,
            searchText : this.props.productSearchInput,
            filterCategory: this.props.filterCategory,
            displayResultsOffset: this.props.displayResultsOffset?this.props.displayResultsOffset:'1',
            sortType: this.props.sortType}

            console.log(data)
            this.props.getProductCatalog(data);
            this.props.getCustomerCart(sessionStorage.getItem("id"))
            // this.props.history.replace({
            //     pathname: '/catalog',
            //     state: {home:false}
            // });
    }

    componentWillReceiveProps(nextProps) {
        // let sch = nextProps.location.state ? nextProps.location.state.productSearchInput : '';
        // let home = nextProps.location.state ? nextProps.location.state.home : '';
        // if (this.state.searchText !== sch) {
        //     let data = {
        //         searchText: sch,
        //         filterCategory: '',
        //         displayResultsOffset: '1'
        //     }
        //     this.props.getProductCatalog(data);
        // }
        // else if (home && !(this.state.searchText === "" && this.state.filterCategory === "" && this.state.displayResultsOffset === 1 && this.state.sortType === "")){
        //     let data = {
        //         searchText: '',
        //         filterCategory: '',
        //         displayResultsOffset: '1'
        //     }
        //     this.props.getProductCatalog(data);
        // }
        console.log(nextProps)
        this.setState({
            products: nextProps.products,
            categories: nextProps.categories,
            searchText: nextProps.location.state ? nextProps.location.state.productSearchInput : nextProps.productSearchInput,
            filterCategory: nextProps.filterCategory,
            displayResultsOffset: nextProps.displayResultsOffset,
            sortType: nextProps.sortType,
            count: nextProps.count
        });

        // this.props.history.replace({
        //     pathname: '/catalog',
        //     state: {}
        // });
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

    sortFun = (sortType) => {
        let data = {
            searchText: this.state.searchText,
            filterCategory: this.state.filterCategory,
            // displayResultsOffset: this.state.displayResultsOffset,
            displayResultsOffset: 1,
            sortType: sortType
        }

        this.props.fetchProducts(data)
    }

    fetchProductsbyCategory = (category) => {
        let data = {
            searchText: this.state.searchText,
            filterCategory: category,
            // displayResultsOffset: this.state.displayResultsOffset,
            displayResultsOffset: 1,
            sortType: this.state.sortType
        }

        this.props.fetchProducts(data)
    }

    fetchProductsbyRating = (category) => {
        let data = {
            searchText: this.state.searchText,
            filterCategory: category,
            // displayResultsOffset: this.state.displayResultsOffset,
            displayResultsOffset: 1,
            sortType: this.state.sortType
        }

        this.props.fetchProducts(data)
    }

    validateCredentials = () => {
        if (this.state.mail !== "" && this.state.password !== "") return false
        else return true
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

    handleChangePage = (event,value)=>{
        let data = {
            searchText: this.state.searchText,
            filterCategory: this.state.filterCategory,
            displayResultsOffset: value,
            sortType: this.state.sortType
        }
        this.props.fetchProducts(data)
    }

    render() {
        let redirectVar = null;
        let productlist = null;
        let sortfilter = null;
        let categorylist = null;
        let pagination = null;

        let date = new Date();
        date.setDate(date.getDate() + 7);

        let products = this.state.products
        let categories = this.state.categories

        sortfilter = (<div class='sortContainer'>
            <div class='col-md-7'>
                {(this.state.searchText && this.state.filterCategory) ?
                    <div class='resultsContainer'>
                        {((this.state.displayResultsOffset-1)*48)+1}-{(this.state.count > (48 * this.state.displayResultsOffset)) ? (48 * this.state.displayResultsOffset) : this.state.count} of over {this.state.count} results for <span class='searchText'>"{this.state.searchText}","{this.state.filterCategory}"</span>
                    </div> : (this.state.searchText) ?
                        <div class='resultsContainer'>
                            {((this.state.displayResultsOffset-1)*48)+1}-{(this.state.count > (48 * this.state.displayResultsOffset)) ? (48 * this.state.displayResultsOffset) : this.state.count} of over {this.state.count} results for <span class='searchText'>"{this.state.searchText}"</span>
                        </div> : (this.state.filterCategory) ?
                            <div class='resultsContainer'>
                                {((this.state.displayResultsOffset-1)*48)+1}-{(this.state.count > (48 * this.state.displayResultsOffset)) ? (48 * this.state.displayResultsOffset) : this.state.count} of over {this.state.count} results for <span class='searchText'>"{this.state.filterCategory}"</span>
                            </div> : <div class='resultsContainer'>
                                {((this.state.displayResultsOffset-1)*48)+1}-{(this.state.count > (48 * this.state.displayResultsOffset)) ? (48 * this.state.displayResultsOffset) : this.state.count} of over {this.state.count} products
                    </div>}
            </div>
            <div class='col-md-5'>
                <div class='dropdownContainer'>
                    <div class="dropdown">
                        <button class="btn btn-secondary btn-sm dropdown-toggle dropButton" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span class='dropLabel'>Sort by: {(this.state.sortType === "PriceLowtoHigh") ? <span>Price:Low to High</span> : (this.state.sortType === "PriceHightoLow") ? <span>Price:High to Low</span> : (this.state.sortType === "AvgReview") ? <span>Avg Customer Review</span> : ""}</span>
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
                            <button class="dropdown-item dropItem" onClick={() => this.sortFun('PriceLowtoHigh')}>Price:Low to High</button><br />
                            <button class="dropdown-item dropItem" onClick={() => this.sortFun('PriceHightoLow')}>Price:High to Low</button><br />
                            <button class="dropdown-item dropItem" onClick={() => this.sortFun('AvgReview')}>Avg Customer Review</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>)

        // if (Object.keys(products).length !== 0) {
        productlist = (<div>{
            products.map((product, index) => {
                var price = []
                price = product.discountedPrice.toString().split('.');
                return (
                    <div class='col-md-3' style={{minHeight:"402px",maxHeight:"402px"}}>
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
                            <div class='desc'>
                                <div>Get it as soon as <span class='etaDate'>{this.state.day[date.getDay()]},{this.state.month[date.getMonth()]} {date.getDate()}</span></div>
                                <div class='description'>FREE Shipping on orders over $25 shipped by Amazon</div>
                            </div>
                        </div>
                    </div>)
            })
        }</div>)
        // }

        // if (Object.keys(categories).length !== 0) {
        categorylist = (<div>
            <div class="categoryContainer" >
                {this.state.filterCategory ? <div class='depHead' onClick={() => this.fetchProductsbyCategory("")}>
                    <span class="s-back-arrow aok-inline-block glyphicon glyphicon-chevron-left">   </span>&nbsp;
                <span class="a-size-base a-color-base depHead" dir="auto"> Any Department</span></div> :
                    <div class='depHead'>Departments</div>}
                {console.log(this.state.category)}
                <div class='depLines'>{
                    categories.map((category, index) => {
                        return (<div class={(this.state.filterCategory === category.name) ? 'depHead' : 'depLine'} onClick={() => this.fetchProductsbyCategory(category.name)}>
                            {category.name}
                        </div>
                        )
                    })
                }
                </div>
            </div>
            <div class='depHead'>Avg. Customer Review</div>
            {this.state.cumulative_rating ? <div class="ratinglinestar" onClick={() => this.fetchProductsbyRating("")}>Clear</div> : <div></div>}
            <div class="ratinglinestar"><Rating name="half-rating" size='large' value={4} precision={1} readOnly /><span class='ratingline'>& Up</span></div>
            <div class="ratinglinestar"><Rating name="half-rating" size='large' value={3} precision={1} readOnly /><span class='ratingline'>& Up</span></div>
            <div class="ratinglinestar"><Rating name="half-rating" size='large' value={2} precision={1} readOnly /><span class='ratingline'>& Up</span></div>
            <div class="ratinglinestar"><Rating name="half-rating" size='large' value={1} precision={1} readOnly /><span class='ratingline'>& Up</span></div>
        </div>)
        // }

        pagination = (<div class='paginationContainer'>
            <Pagination count={Math.ceil(this.state.count/48)} 
                            page={this.state.displayResultsOffset}
                            onChange={this.handleChangePage} 
                            variant="outlined" 
                            shape="rounded" />
        </div>)

        return (
            <div class="productContainer">
                <Loading />
                {redirectVar}
                {sortfilter}
                <div class='row'>
                    <div class='col-md-2 filtersContainer'>
                        {categorylist}
                    </div>
                    <div class='col-md-10'>
                        <div className='row'>
                            {productlist}
                        </div>
                        <div className='row' style={{marginTop:"10px"}}>
                            {pagination}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        products: state.customer.products,
        categories: state.customer.categories,
        count: state.customer.count,
        productSearchInput: state.customer.productSearchInput,
        filterCategory: state.customer.filterCategory,
        displayResultsOffset: state.customer.displayResultsOffset,
        sortType: state.customer.sortType
    };
};

function mapDispatchToProps(dispatch) {
    return {
        getProductCatalog: payload => dispatch(getProductCatalog(payload)),
        fetchProducts: payload => dispatch(fetchProducts(payload)),
        getCustomerCart: payload => dispatch(getCustomerCart(payload))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);