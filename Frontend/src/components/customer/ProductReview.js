import React, { Component } from 'react';
import { connect } from 'react-redux';
import Rating from '@material-ui/lab/Rating';
import StarIcon from '@material-ui/icons/Star';
import CheckIcon from '@material-ui/icons/Check';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { postReview, reviewPostingSuccess } from '../../redux/actions/customerActions'
import Loading from '../loading';

class ProductReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productImage: "",
            productName: "",
            productId: "",
            rating: "",
            headline: "",
            review: ""
        };
    }

    componentWillUnmount() {
        this.props.reviewPostingSuccess()
    }

    componentDidMount() {
        this.setState({
            productName: this.props.location.state.productName,
            productImage: this.props.location.state.productImage,
            productId: this.props.location.state.productId
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    postReview = (e) => {
        e.preventDefault();
        this.props.postReview({
            "product_id": this.state.productId,
            "customer_id": sessionStorage.getItem("id"),
            "timestamp": new Date().toISOString(),
            "rating": this.state.rating,
            "headline": this.state.headline,
            "review": this.state.review
        });
    }

    changeRating = (event, newValue) => {
        this.setState({
            rating: newValue
        })
    }

    validateReview = () => {
        return this.state.rating === "" && this.state.headline === "" && this.state.review === ""
    }

    render() {
        let reviewPage = null;
        if (this.props.reviewPosted === true) {
            reviewPage = (
                <div className="container" style={{ width: "65%", marginTop: "50px", border: "1px solid green", padding: "20px", borderRadius: "5px", boxShadow: "0px 0px 3px 1px green" }}>
                    <div className="col-md-1">
                        <CheckIcon style={{ fontSize: "40px", color: "green" }} />
                    </div>
                    <div className="col-md-11">
                        <div style={{ fontSize: "13px", color: "#007600" }}><b>Review submitted - Thank you!</b></div>
                        <span style={{ fontSize: "12px" }}>We are processing your review. This may take several days, so we appreciate your patience.
                        We will notify you when this is complete. Please note that if the review is about your
                        experience with a third-party seller, we may move it to the seller’s profile page.</span>
                    </div>
                    <div className="row" style={{ textAlign: "center" }} onClick={this.props.reviewPostingSuccess}>
                        <Link to='/your-account/order-history'>
                            <span class="linkColor"  >
                                Go back to your orders
                            </span>
                        </Link>
                    </div>
                </div>
            )
        } else {
            reviewPage = (
                <div className="container" style={{ width: "60%", align: "center", marginTop: "10px" }}>
                    <span style={{ fontSize: "21px", fontWeight: "700" }}>Create Review</span>
                    <div className="row" style={{ marginTop: "20px" }}>
                        <div className="col-md-1">
                            <img src={this.state.productImage} style={{ height: "60px", width: "60px" }} />
                        </div>
                        <div className="col-md-10">
                            <span style={{ fontSize: "13px", lineHeight: "50px", marginLeft: "20px" }}>{this.state.productName}</span>
                        </div>
                    </div>
                    <hr />
                    <div style={{ fontSize: "17px", fontWeight: "700" }}>Overall Rating</div>
                    <div>
                        <Rating
                            style={{ marginTop: "10px" }}
                            name="hover-feedback"
                            value={this.state.rating}
                            precision={1}
                            onChange={this.changeRating}
                            size="large"
                            display="flex"
                            icon={<StarIcon style={{ fontSize: "50px" }} />}
                        />
                    </div>
                    <hr />
                    <form onSubmit={this.postReview}>
                        <div style={{ fontSize: "17px", fontWeight: "700", marginBottom: "10px" }}>Add a headline</div>
                        <div class="form-group">
                            <input
                                autoComplete="off"
                                type="text"
                                required
                                class="form-control"
                                id="exampleInputPassword1"
                                name="headline"
                                onChange={this.onChange}
                                placeholder="What's most important to know?" />
                        </div>
                        <div style={{ fontSize: "17px", fontWeight: "700", margin: "30px 0px 10px" }}>Write your review</div>
                        <textarea
                            class="form-control"
                            id="message"
                            name="review"
                            rows="5"
                            required
                            autoComplete="off"
                            onChange={this.onChange}
                            placeholder="What did you like or dislike? What did you use this product for?"
                        >
                        </textarea>
                        <div style={{ margin: "20px 0px 20px", textAlign: "right" }}>
                            <button style={{ backgroundColor: "#f0c14b", height: "30px", color: "black", padding: "3px 10px 3px", border: "1px solid #a88734" }}
                                type="submit" class="btn" disabled={this.validateReview()} >
                                Submit
                        </button>
                        </div>
                    </form>
                </div>
            )
        }
        return (
            <div >
                <Loading />
                {reviewPage}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        reviewPosted: state.customer.reviewPosted
    };
};

function mapDispatchToProps(dispatch) {
    return {
        postReview: (payload) => dispatch(postReview(payload)),
        reviewPostingSuccess: () => dispatch(reviewPostingSuccess())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductReview);