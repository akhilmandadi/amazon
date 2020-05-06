import React, { Component } from 'react';
import { connect } from "react-redux";
import '../css/profile.css';
import mastercard from '../images/mastercard.jpg';
import visa from '../images/visa.png'
import { getCards } from '../../redux/actions/profile';
import { addCard } from '../../redux/actions/profile';
import { deleteCard } from '../../redux/actions/profile';
import { editCard } from '../../redux/actions/profile';
import { Link } from 'react-router-dom';

class CustomerCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expiry: "",
            expiry_month: "",
            expiry_year: "",
            name: "",
            card_number: "",
            cards: [],
            renderAddCard: false,
            renderAddErrorMessage: false,
            renderEditErrorMessage: false,
            nameEdit: "",
            card_numberEdit: "",
            expiry_monthEdit: "",
            expiry_yearEdit: "",
            cvv: ""
        }
        this.inputHandler = this.inputHandler.bind(this);
    }

    inputHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentDidMount() {
        this.props.getCards(sessionStorage.getItem("id"))
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.customerCards)
        this.setState({
            cards: nextProps.customerCards
        })
    }

    submitForm = (e) => {
        this.setState({ renderAddCard: false, renderAddErrorMessage: false })
        const data = {
            name: this.state.name,
            card_number: this.state.card_number,
            expiry: this.state.expiry_month + "/" + this.state.expiry_year,
            cvv: this.state.cvv,
            customer_id: sessionStorage.getItem("id")
        }
        this.props.addCard(data);
    }

    EditCard = (id) => {
        const data = {
            _id: id,
            name: this.state.nameEdit,
            card_number: this.state.card_numberEdit,
            expiry: this.state.expiry_monthEdit + "/" + this.state.expiry_yearEdit,
            cvv: this.state.cvvEdit,
            customer_id: sessionStorage.getItem("id")
        }
        this.props.editCard(data);
    }

    DeleteCard = (id) => {
        const data = {
            card_id: id,
            customer_id: sessionStorage.getItem("id")
        }
        this.props.deleteCard(data);
    }

    validateDetails = () =>{
        if(this.state.card_numberEdit.length === 16 && this.state.nameEdit.length !== 0 && this.state.expiry_monthEdit > 0 && this.state.expiry_monthEdit < 13 && this.state.expiry_yearEdit > 2019 && JSON.stringify(this.state.cvvEdit).length===3 && this.state.expiry_monthEdit.length === 2){
            return false
        } else {
            return true
        }
    }

    render() {
        let displayAddErrorMessage =
            (<div>
                <p style={{ fontSize: "13px", color: "#111111" }}>Please enter valid card details.</p>
            </div>)
        let displayEditErrorMessage =
            (<div>
                <p style={{ fontSize: "13px", color: "#111111" }}>Please enter valid card details.</p>
            </div>)
        let displayCards =
            (
                this.state.cards.map(card => {
                    return (
                        <div style={{ marginBottom: "10px" }}>
                            <div className=" well well-cards well-lg" style={{ cursor: "pointer", minHeight: "30px", maxHeight: "30px", marginBottom: "0px" }} data-toggle="collapse" href={'#' + card._id + "Add"} role="button" >
                                <div className="row" style={{ marginTop: "-10px", fontSize: "13px" }}>
                                    <div className="col-md-1">
                                    </div>
                                    <div className="col-md-5" style={{ color: "#111111" }}>
                                        Card ending in {(card.card_number.slice(12, 16))}
                                    </div>
                                    <div className="col-md-3">
                                        {card.expiry}
                                    </div>
                                    <div className="col-md-2">
                                        ** {JSON.stringify(card.cvv).slice(2, 3)}
                                    </div>
                                    <div className="col-md-1">
                                        <span class="glyphicon glyphicon-chevron-down"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="row  collapse multi-collapse" id={card._id + "Add"} style={{ border: "2px solid", boxShadow: "0 0.5px 1px 0 rgba(0,0,0,.16)", borderRadius: "2px", borderColor: "#f3f3f3", fontSize: "13px" }}>
                                <div style={{ marginTop: "10px", marginLeft: "15px" }}>
                                    <p style={{ fontWeight: "700" }}>Name on card</p>
                                    <p>{card.name}</p>
                                    <div className="row" style={{ marginBottom: "10px" }}>
                                        <div className="col-md-9">
                                        </div>
                                        <div className="col-md-1">
                                            <button type="button" class="btn btn-secondary btn-info btn-lg btn-block" onClick={() => this.setState({ nameEdit: card.name, card_numberEdit: card.card_number, cvvEdit: card.cvv, expiry_monthEdit: card.expiry.slice(0, 2), expiry_yearEdit: card.expiry.slice(3, 7) })} data-toggle="modal" data-target={'#' + card._id} style={{ fontSize: "13px", padding: "5px", borderColor: "#111111", height: "30px", background: "#e7e9ec", borderRadius: "2px", width: "150%", color: "#555555" }}>Edit</button>
                                        </div>
                                        <div className="col-md-2">
                                            <button type="button" class="btn btn-secondary btn-lg btn-block" onClick={() => this.DeleteCard(card._id)} style={{ fontSize: "13px", padding: "5px", borderColor: "#111111", height: "30px", background: "#e7e9ec", borderRadius: "2px", width: "80%" }}>Remove</button>
                                        </div>

                                        <div id={card._id} class="modal fade" role="dialog">
                                            <div class="modal-dialog " style={{ width: "800px" }}>
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                                                        <p class="modal-title" style={{ fontSize: "13px", fontWeight: "700" }}>Edit Payment Method</p>
                                                    </div>
                                                    <div class="modal-body">
                                                        <div className="row">
                                                            <div className="col-md-3">
                                                                <label style={{ fontSize: "13px", fontWeight: "700", color: "#111111" }}>Payment method</label>
                                                                <p style={{ fontSize: "13px", color: "#111111" }}>Card ending in {(card.card_number.slice(12, 16))} </p>
                                                            </div>
                                                            <div class="col-md-2 form-group" style={{ marginBottom: "22px" }}>
                                                                <label style={{ fontSize: "13px", fontWeight: "700", color: "#111111" }}>Name on card</label>
                                                                <input onChange={this.inputHandler} type="text" class="form-control" name="nameEdit" value={this.state.nameEdit} />
                                                            </div>
                                                            <div class="col-md-3 form-group" style={{ marginBottom: "22px" }}>
                                                                <label style={{ fontSize: "13px", fontWeight: "700", color: "#111111" }}>Card number</label>
                                                                <input style={{ width: "110%" }} onChange={this.inputHandler} type="number" class="form-control" name="card_numberEdit" value={this.state.card_numberEdit} />
                                                            </div>
                                                            <div class="col-md-3 form-group" style={{ marginBottom: "22px" }}>
                                                                <div><label style={{ fontSize: "13px", fontWeight: "700", color: "#111111" }}>Expiration date</label></div>
                                                                <input style={{ width: "35%", display: "inline", marginRight: "10px" }} onChange={this.inputHandler} type="number" class="form-control" name="expiry_monthEdit" value={this.state.expiry_monthEdit} />
                                                                <input style={{ width: "45%", display: "inline" }} onChange={this.inputHandler} type="number" class="form-control" name="expiry_yearEdit" value={this.state.expiry_yearEdit} />
                                                            </div>
                                                            <div class="col-md-1 form-group" style={{ marginBottom: "22px", marginLeft: "-10px" }}>
                                                                <label style={{ fontSize: "13px", fontWeight: "700", color: "#111111" }}>CVV</label>
                                                                <input style={{ width: "180%" }} onChange={this.inputHandler} type="number" class="form-control" name="cvvEdit" value={this.state.cvvEdit} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="modal-footer" style={{ padding: "0px" }}>
                                                        <div className="row">
                                                            <div className="col-md-7">
                                                            </div>
                                                            <div className="col-md-2">
                                                                <button type="button" style={{ cursor: "pointer", width: "100%", marginRight: "-60px", fontSize: "13px", marginBottom: "20px", padding: "3px", borderColor: "#111111", background: "#e7e9ec", borderRadius: "2px", textAlign: "center", marginTop: "20px" }} class="btn btn-default" data-dismiss="modal">Cancel</button>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <button disabled={this.validateDetails()} type="button" id="editCard" style={{ width: "60%", fontSize: "13px", marginBottom: "20px", padding: "3px", borderColor: "#111111", background: "#f0c14b", borderRadius: "2px", textAlign: "center", marginTop: "20px" }} class="btn btn-default" data-dismiss="modal" onClick={() => this.EditCard(card._id)}>Save</button>
                                                            </div>
                                                        </div>
                                                        <div class="row" style={{ alignContent: "left" }}>
                                                            {this.state.renderEditErrorMessage === true ? displayEditErrorMessage : ""}
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            )
        let addCard =
            (
                <div className="row">
                    <div class="col-md-2 form-group" style={{ marginBottom: "22px" }}>
                        <label style={{ fontSize: "13px", fontWeight: "700", color: "#111111" }}>Name on card</label>
                        <input onChange={this.inputHandler} type="text" class="form-control" name="name" />
                    </div>
                    <div class="col-md-3 form-group" style={{ marginBottom: "22px" }}>
                        <label style={{ fontSize: "13px", fontWeight: "700", color: "#111111" }}>Card number</label>
                        <input onChange={this.inputHandler} type="number" class="form-control" name="card_number" />
                    </div>
                    <div class="col-md-3 form-group" style={{ marginBottom: "22px" }}>
                        <div><label style={{ fontSize: "13px", fontWeight: "700", color: "#111111" }}>Expiration date</label></div>
                        <input style={{ width: "35%", display: "inline", marginRight: "10px" }} onChange={this.inputHandler} type="number" class="form-control" name="expiry_month" />
                        <input style={{ width: "45%", display: "inline" }} onChange={this.inputHandler} type="number" class="form-control" name="expiry_year" />
                    </div>
                    <div class="col-md-1 form-group" style={{ marginBottom: "22px", marginRight: "20px" }}>
                        <label style={{ fontSize: "13px", fontWeight: "700", color: "#111111" }}>CVV</label>
                        <input style={{ width: "180%" }} onChange={this.inputHandler} type="number" class="form-control" name="cvv" />
                    </div>
                    <div class="col-md-2">
                        <button type="button" class="btn btn-secondary" onClick={() => (this.state.card_number.length === 16 && this.state.name.length !== 0 && this.state.expiry_month > 0 && this.state.expiry_month < 13 && this.state.expiry_year > 2019 && this.state.cvv.length === 3 && this.state.expiry_month.length === 2) ? this.submitForm() : this.setState({ renderAddErrorMessage: true })} style={{ fontSize: "13px", marginBottom: "20px", padding: "3px", borderColor: "#111111", background: "#f0c14b", borderRadius: "2px", textAlign: "center", marginTop: "20px" }}>
                            <span style={{ textAlign: "center", paddingTop: "3px" }}>Add your card</span>
                        </button>
                    </div>
                </div>
            )
        return (
            <div class="container" style={{ marginTop: "30px", width: "60%" }}>
                <Link to="/customer/account" className="linkColor"><p style={{ fontSize: "13px", display: "inline" }}>Your Account</p></Link>
                <p style={{ fontSize: "13px", color: "#C45500", display: "inline" }}>  &nbsp;>&nbsp;  Your Cards</p>
                <p style={{ marginTop: "10px", marginBottom: "20px", fontSize: "17px", color: "#111111", fontWeight: "700" }}>Your credit and debit cards</p>
                {displayCards}
                <hr />
                <p style={{ marginTop: "10px", marginBottom: "1px", fontSize: "17px", color: "#111111", fontWeight: "700" }}>Credit or Debit Cards</p>
                <div className="row">
                    <div className="col-md-9">
                        <p style={{ fontSize: "13px", color: "#111111" }}>Amazon accepts all major credit and debit cards.</p>
                    </div>
                    <div className="col-md-3">
                        <img src={visa} height="30px" width="50px" />
                        <img src={mastercard} height="40px" width="80px" />
                    </div>
                </div>
                <span style={{ display: "inline", marginRight: "5px" }} class="glyphicon glyphicon-chevron-down"></span><a><p onClick={() => this.setState({ renderAddCard: this.state.renderAddCard === true ? false : true })} style={{ fontSize: "13px", color: "#0066C0", display: "inline", cursor: "pointer", verticalAlign: "top" }}>Add a card</p></a>
                {this.state.renderAddCard === true ? addCard : ""}
                {this.state.renderAddErrorMessage === true ? displayAddErrorMessage : ""}
                <hr />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        customerCards: state.profile.customerCards
    };
};

function mapDispatchToProps(dispatch) {
    return {
        getCards: payload => dispatch(getCards(payload)),
        addCard: payload => dispatch(addCard(payload)),
        deleteCard: payload => dispatch(deleteCard(payload)),
        editCard: payload => dispatch(editCard(payload))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerCards);