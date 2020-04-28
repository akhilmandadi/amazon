import React, { Component } from 'react';
import { connect } from "react-redux";
import '../css/profile.css';
import { getCards } from '../../redux/actions/profile';
import { addCard } from '../../redux/actions/profile';

class CustomerCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expiry: "",
            expiry_month: "",
            expiry_year: "",
            name: "",
            card_number: "",
            cards: []
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
        e.preventDefault();
        const data = {
            name: this.state.name,
            card_number: this.state.card_number,
            expiry: this.state.expiry_month + "/" + this.state.expiry_year,
            customer_id: sessionStorage.getItem("id")
        }
        this.props.addCard(data);
    }

    render() {
        let displayCards =
            (
                this.state.cards.map(card => {
                    return (
                        <div style={{ marginBottom: "10px" }}>
                            <div className=" well well-cards well-lg" style={{ cursor: "pointer", minHeight: "30px", maxHeight: "30px", marginBottom: "0px" }} data-toggle="collapse" href={'#' + card.card_number} role="button" >
                                <div className="row" style={{ marginTop: "-10px", fontSize: "13px" }}>
                                    <div className="col-md-1">
                                    </div>
                                    <div className="col-md-7" style={{ color: "#111111" }}>
                                        Card ending in {(card.card_number.slice(12, 16))}
                                    </div>
                                    <div className="col-md-3">
                                        {card.expiry}
                                    </div>
                                    <div className="col-md-1">
                                        <span class="glyphicon glyphicon-chevron-down"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="row  collapse multi-collapse" id={card.card_number} style={{ border: "2px solid", boxShadow: "0 0.5px 1px 0 rgba(0,0,0,.16)", borderRadius: "2px", borderColor: "#f3f3f3", fontSize: "13px" }}>
                                <div style={{ marginTop: "10px", marginLeft: "15px" }}>
                                    <p style={{ fontWeight: "700" }}>Name on card</p>
                                    <p>{card.name}</p>
                                </div>
                            </div>
                        </div>
                    )
                })
            )
        let addCard =
            (
                <div className="row">
                    <div class="col-md-2 form-group" style={{ marginBottom: "22px"}}>
                        <label style={{ fontSize: "13px", fontWeight: "700", color: "#111111" }}>Name on card</label>
                        <input onChange={this.inputHandler} type="text" class="form-control" name="name" />
                    </div>
                    <div class="col-md-3 form-group" style={{ marginBottom: "22px"}}>
                        <label style={{ fontSize: "13px", fontWeight: "700", color: "#111111" }}>Card number</label>
                        <input onChange={this.inputHandler} type="number" class="form-control" name="card_number" />
                    </div>
                    <div class="col-md-3 form-group" style={{ marginBottom: "22px" }}>
                        <p><label style={{ fontSize: "13px", fontWeight: "700", color: "#111111",marginBottom:"-30px" }}>Expiration date</label></p>
                        <input style={{width:"35%",display:"inline",marginRight:"10px"}} onChange={this.inputHandler} type="number" class="form-control" name="expiry_month" />
                        <input style={{width:"45%",display:"inline"}} onChange={this.inputHandler} type="number" class="form-control" name="expiry_year" />
                    </div>
                    <div class="col-md-3">
                    <button type="button" class="btn btn-secondary" onClick={this.submitForm} style={{fontSize: "13px", marginBottom: "20px", padding: "3px", borderColor: "#111111", background: "#f0c14b", borderRadius: "2px", textAlign: "center" }}>
                        <span style={{ textAlign: "center", paddingTop: "3px" }}>Add your card</span>
                    </button>
                    </div>
                </div>
            )
        return (
            <div class="container" style={{ marginTop: "30px", width: "60%" }}>
                <p style={{ fontSize: "13px", color: "#555555", display: "inline" }}>Your Account  &nbsp;>&nbsp;  </p>
                <p style={{ fontSize: "13px", color: "#C45500", display: "inline" }}>Your Cards</p>
                <p style={{ marginTop: "10px", marginBottom: "20px", fontSize: "17px", color: "#111111", fontWeight: "700" }}>Your credit and debit cards</p>
                {displayCards}
                <hr/>
                <p style={{ marginTop: "10px",marginBottom:"1px",fontSize: "17px", color: "#111111", fontWeight: "700" }}>Credit or Debit Cards</p>
                <p style={{ fontSize: "13px", color: "#111111"}}>Amazon accepts all major credit and debit cards.</p>
                {addCard}
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
        addCard: payload => dispatch(addCard(payload))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerCards);