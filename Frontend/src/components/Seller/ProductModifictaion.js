
import React, { Component } from 'react';
import { addNewProduct, showAddProduct ,getCategoryList } from '../../redux/actions/sellerActions'
import Dialog from '@material-ui/core/Dialog';
import { connect } from 'react-redux';

import "../css/seller.css"
class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id : "",
            name: "",
            price: "",
            category: {
                name: "",
                
            },
            showAddProduct: false,
            description: "",
            discount: "",
            images: [],
            productCatgeoryList: [
                {
                    name: "Mobiles & Accessories"
                },
                {
                    name: "Groceries"
                },
                {
                    name: "Home Appliances"
                },
            ]
        };
        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.priceChangeHandler = this.priceChangeHandler.bind(this);
        this.descriptionChangeHandler = this.descriptionChangeHandler.bind(this);
        this.discountChangeHandler = this.discountChangeHandler.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.changeProductCategory = this.changeProductCategory.bind(this);
        this.showProductCategory = this.showProductCategory.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.addProduct = this.addProduct.bind(this);
        this.addNewProductHtml = this.addNewProductHtml.bind(this);
    }
    componentDidMount()
    {
        this.props.getCategoryList();
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.seller.editProduct && nextProps.seller.editProduct.name )
        {
            let product = nextProps.seller.editProduct;
            let category = {
                name: product.category,
            }
            this.setState({
                id : product._id ,
                name: product.name ,
                price: product.price,
                category: category,
                showAddProduct: true,
                productCatgeoryList: nextProps.seller.categoryList ,
                description: product.description,
                discount: product.discount,
                images: [],
            })
        }
        else
        this.setState({
            showAddProduct: nextProps.seller.showAddProduct,
            id : "" ,
            name: "" ,
            price: "" ,
            category: {
                name: "",
            },
            productCatgeoryList: nextProps.seller.categoryList ,
            description: "",
            discount: "",
            images: [],
        })
    }
    nameChangeHandler(e) {
        this.setState({
            name: e.target.value,
        })
    }
    priceChangeHandler(e) {
        this.setState({
            price: e.target.value,
        })
    }
    descriptionChangeHandler(e) {
        this.setState({
            description: e.target.value,
        })
    }
    discountChangeHandler(e) {
        this.setState({
            discount: e.target.value,
        })
    }
    handleFileChange = (e) => {
        this.setState({
            images: e.target.files
        })
    }
    handleClose() {
        this.setState({
            name: "",
            price: "",
            category: {
                name: "",
            },
            description: "",
            discount: "",
            images: []
        });
        this.props.showAddProduct(false);
    }

    changeProductCategory(e) {
        this.setState({
            category: JSON.parse(e.target.value)
        })
    }
    showProductCategory() {
        let categoryItems = [];
        let deafultCategory =
        {
            name: "",
        }

        this.state.productCatgeoryList.map((category) => {

            categoryItems.push(<option value={JSON.stringify(category)} > {category.name}</option>)
        }
        );

        return (
            <select class="form-control" id="exampleFormControlSelect1" value={JSON.stringify(this.state.category)}

                onChange={this.changeProductCategory}>
                <option value={JSON.stringify(deafultCategory)} > Product Category </option>
                {categoryItems}
            </select>
        )
    }

    addProduct() {
        let fdata = new FormData();
        let data = {
            images: this.state.images
        }
        fdata.append('seller_id', sessionStorage.getItem('id'));
        fdata.append('name', this.state.name);
        fdata.append('description', this.state.description);
        fdata.append('price', this.state.price);
        fdata.append('category', this.state.category.name);
        fdata.append('discount', this.state.discount);
        fdata.append("active" ,true)
        
        if(this.props.seller.editProduct.name)
        {
            let images = [];
            images.push(this.props.seller.editProduct.images)
            fdata.append("images" , images);
            fdata.append("id", this.props.seller.editProduct._id)
        }
        for (let image of this.state.images) {
            fdata.append('pictures', image);
        }

        this.props.addNewProduct(fdata);
    }

    addNewProductHtml() {
        return (
            <div>
             <Dialog class ="addProductDialog" open={this.state.showAddProduct} onClose={this.handleClose} aria-labelledby="form-dialog-title" style = {{     "min-width": "700px"}}>
               
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Provide New Product Details</h5>
                            <button type="button" class="close"  onClick={this.handleClose} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="form-group">
                                    <label id="validationCustomUsername">Product Name</label>
                                    <input type="text" class="form-control" id="validationCustomUsername" value={this.state.name} onChange={this.nameChangeHandler} placeholder="Name" required />

                                </div>
                                <div class="form-group">
                                    <label for="formGroupExampleInput2">Product Price</label>
                                    <input type="number" class="form-control" id="formGroupExampleInput2" value={this.state.price} onChange={this.priceChangeHandler} placeholder="Price" />
                                </div>
                                <div class="form-group">
                                    <label for="exampleFormControlSelect1">Product Category</label>
                                    {this.showProductCategory()}
                                </div>
                                <div class="form-group">
                                    <label for="formGroupExampleInput2">Description</label>
                                    <textarea class="form-control" aria-label="With textarea" value={this.state.description} onChange={this.descriptionChangeHandler} placeholder="Description" ></textarea>
                                </div>
                                <div class="form-group">
                                    <label for="formGroupExampleInput2">Discount</label>
                                    <input type="number" class="form-control" id="formGroupExampleInput2" value={this.state.discount} onChange={this.discountChangeHandler} placeholder="Discount" />
                                </div>
                                <div class="form-group">
                                    <label for="exampleFormControlFile1">Product Image</label>

                                    <input type="file" class="form-control-file" id="exampleFormControlFile1" multiple data-show-upload="true" onChange={this.handleFileChange} data-show-caption="true" />
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" onClick={this.handleClose}>Close</button>
                            <button type="button" class="btn btn-primary" onClick={this.addProduct} >Save changes</button>
                        </div>
                    </div>
           
                 </Dialog>
                </div>
         
        )
    }
    render() {
        return (
            <div>
                {this.state.showAddProduct ? <div>{this.addNewProductHtml()}</div> : null}
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
        getCategoryList : payload => dispatch(getCategoryList()),
        addNewProduct: payload => dispatch(addNewProduct(payload)),
        showAddProduct: payload => dispatch(showAddProduct(payload))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
