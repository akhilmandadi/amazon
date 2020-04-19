import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProductCatalog } from '../../redux/actions/customerActions';
import Rating from '@material-ui/lab/Rating';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import '../css/catalog.css'

class Catalog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayResultsOffset: 1,
            searchText: "LEGO",
            category: "Toys",
            style: []
        };
        this.handleOptionChange = this.handleOptionChange.bind(this)
        this.validateCredentials = this.validateCredentials.bind(this);
    }

    componentDidMount() {
        if (!Object.keys(this.props.products).length) {
            let data = {
                searchText: '',
                filterCategory: '',
                displayResultsOffset: '0'
            }

            this.props.getProductCatalog(data)
        }
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

    ratingPopover = (e) => {
        let style = this.state.style
        
        if (e === 'Focus'){
            this.setState({
                style
            })
        }
    }

    calculatePrice = (price, discount) => {
        if (discount) {
            let discountedprice = (price * (100 - discount)) / 100;
            return (Math.round((discountedprice + Number.EPSILON) * 100) / 100).toString().split('.')
        }
        else
            return price.toString().split('.')
    }

    render() {
        let redirectVar = null;
        let productlist = null;
        let sortfilter = null;

        let products = this.props.products
        console.log(products)
        // if (sessionStorage.getItem("email") !== null && sessionStorage.getItem("persona") === "customer") {
        //     redirectVar = <Redirect to="/catalog" />
        // }

        sortfilter = (<div class='sortContainer'>
            <div class='col-md-7'>
                <div class='resultsContainer'>
                    {this.state.displayResultsOffset}-{50 * this.state.displayResultsOffset} results for <span class='searchText'>"{this.state.searchText}","{this.state.category}"</span>
                </div>
            </div>
            <div class='col-md-5'>
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
            </div>
        </div>)

        if (Object.keys(products).length !== 0)
            productlist = (<div>{
                products.map((product, index) => {
                    var price = []
                    price = product.price.toString().split('.');
                    price = this.calculatePrice(product.price, product.discount)
                    console.log(price)
                    return (<span class="product">
                        <div class='col-md-3'>
                            <div class='grid'></div>
                            <div class='imgContainer'>
                                <center>
                                    <img class='img' src={product.images[0]} alt={product.name}></img>
                                </center>
                            </div>
                            <div class='productTitle'>{product.name}</div>
                            <span class='starRating' onFocus={()=>this.ratingPopover('Focus')}>
                                <Rating name="half-rating-read" size='large' defaultValue={product.cumulative_rating} precision={0.1} readOnly />
                            </span>
                            <div style={{width:'220px'}} class={this.state.style[0]}><div class="small-space text-center"><span>{product.cumulative_rating} out of 5 stars</span></div></div>',
                            <span class='rating'>{product.cumulative_rating}</span>
                            {product.discount ? <div>
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
                            <div>{product.description}</div>
                        </div>
                    </span>)
                })
            }</div>)

        return (
            <div class="productContainer">
                {redirectVar}
                {sortfilter}
                {productlist}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        products: state.customer.products
    };
};

function mapDispatchToProps(dispatch) {
    console.log("actioncall")
    return {
        getProductCatalog: payload => dispatch(getProductCatalog(payload))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);