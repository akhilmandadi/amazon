import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProductCatalog } from '../../redux/actions/customerActions'
import { addNewProduct, getSellerProductCatalog ,showEditProduct } from '../../redux/actions/sellerActions'
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import AddProduct from "./productModifictaion";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Dialog from '@material-ui/core/Dialog';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import '../css/catalog.css'

class SellerCatalog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            displayResultsOffset: 1,
            searchText: "LEGO",
            category: "Toys"
        };
        this.handleOptionChange = this.handleOptionChange.bind(this)
        this.validateCredentials = this.validateCredentials.bind(this);
        this.showAllProducts = this.showAllProducts.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            products: nextProps.seller.products,
        })
    }

    componentDidMount() {
        if (!Object.keys(this.props.seller.products).length) {
            let data = {
                searchText: '',
                filterCategory: '',
                displayResultsOffset: '0'
            }

            this.props.getSellerProductCatalog(data)
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
            console.log(price)
            productlist.push(<ProductDetail price={price} product={product} showEditProduct = {this.props.showEditProduct} addNewProduct = {this.props.addNewProduct} seller = {this.props.seller}></ProductDetail>)
        })
        return productlist;
    }

    render() {
        let redirectVar = null;
        let productlist = null;
        let sortfilter = null;

        let products = this.props.seller.products
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



        return (
            <div>
                <AddProduct></AddProduct>
                <div class="productContainer">
                    {redirectVar}
                    {sortfilter}
                </div>
                <div class="row">
                    {this.showAllProducts()};

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
            showDelete : false,
        }
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.showEditProduct = this.showEditProduct.bind(this);
        this.onShowDelete = this.onShowDelete.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
    }
    componentWillReceiveProps()
    {
        this.setState({
            showDelete : this.props.seller.showDelete
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

    showEditProduct()
    {
        this.props.showEditProduct(this.props.product);

    }
    handleClose()
    {
        this.setState({
            showDelete : false
        })
    }
     onShowDelete()
     {
         this.setState({
             showDelete : true 
         })
     }

     deleteProduct()
     {
        let product = this.props.product;
        let fdata = new FormData();
        fdata.append('seller_id', sessionStorage.getItem('id'));
        fdata.append('name', product.name);
        fdata.append('description', product.description);
        fdata.append('price', product.price);
        fdata.append('category', product.category.categoryName);
        fdata.append('discount', product.discount);
        fdata.append("active" ,false)
        
        
            let images = [];
            images.push(product.images)
            fdata.append("images" , images);
            fdata.append("id", product._id)

        this.props.addNewProduct(fdata);
     }


    showDeleteProduct()
    {
        return(
            <div>
            <Dialog open={this.state.showDelete} onClose={this.handleClose} aria-labelledby="form-dialog-title" style = {{     "min-width": "700px"}}>
                    <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Delete Product</h5>
                            <button type="button" class="close"  onClick={this.handleClose} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class ="row">
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
    render() {
        let product = this.props.product;
        let price = this.props.price;
        return (
            <div>
                <div class="product" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                    <div class='col-md-3'>
                        <div class='grid'></div>
                        <div class = "productImgBorder">

                       
                       {product.images.length ?<img class='productimg' src={product.images[0]} alt={product.name}></img>:""}
                        </div>
                        <div class="row" style = {{    "padding-top": "5px"}}>
                            <div class="col-md-11" style = {{padding : "0px"}}>
                                <div class='sellerProductTitle'>
                                    {product.name}
                                </div>
                            </div>
                            <div class="col-md-1" style = {{padding : "0px" , cursor : "pointer"}}>
                                {this.state.showEditIcon ? <EditTwoToneIcon color="primary" fontSize="large" onClick={this.showEditProduct}></EditTwoToneIcon> : ""}

                            </div>

                        </div>


                        <div class="stars-outer">
                            <div class="stars-inner"></div>
                        </div>
                        <div>
                        </div>
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
                        <div class ="row"  style = {{ minHeight : "25px"}}>
                            <div class = "col-md-11" style = {{ padding : "0px"}}>
                            {product.description}
                            </div>
                            <div class = "col-md-1" style = {{ padding : "0px"}}>
                            {this.state.showEditIcon ? <DeleteForeverIcon color="primary" fontSize="large" onClick={this.onShowDelete}></DeleteForeverIcon> : ""}

                            </div>
                          {this.showDeleteProduct()}
                            </div>
                            
                    </div>
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
    console.log("actioncall")
    return {
        getSellerProductCatalog: payload => dispatch(getSellerProductCatalog(payload)),
        addNewProduct: payload => dispatch(addNewProduct(payload)),
        showEditProduct : payload => dispatch ( showEditProduct(payload)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SellerCatalog);