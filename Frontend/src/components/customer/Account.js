import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';



class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div>
                <div class="row">
                    <div class="col-md-2"></div>
                    <div class="col-md-3">

                        <div style={{ "font-weight": "400", "font-size": "28px", "line-height": "1.2" }}><h1>Your Account</h1></div>

                        <div class="row1" style={{ paddingTop:"10px","display": "table", "height": "100%", "margin-bottom": "20px", "width": "100%" }}>



                            <div class="innercell" style={{ diaplay: "table-cell", "height": "100%",  "width": "320px", "box-sizing": "border-box", "display": "block", "border-radius": "4px", "border": "1px #ddd solid", "background-color": "#fff" }}>


                                <div class="a-box" style={{ "display": "block", "border-radius": "4px", "border": "1px #ddd solid", "background-color": "#fff" }}>


                                    <div class="row">
                                        <div class="col-md-2">
                                            <img alt="Your Orders" src="https://images-na.ssl-images-amazon.com/images/G/01/x-locale/cs/ya/images/Box._CB485927553_.png"
                                                style={{ "padding-top": "10px", width: "90px", height: "60px", "vertical-align": "top" }}></img>



                                        </div>
                                        <div class="col-md-2"></div>
                                        <div class="col-md-8">
                                            <div style={{ "font-size": "19px" ,paddingTop:"10px" }}>Your Orders</div>
                                            <div style={{ "font-size": "14px" ,height:"70px"}}>Track, return, or buy things</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="innercell" style={{ "height": "100%", "padding-left": "0px", "width": "320px", "box-sizing": "border-box", "display": "block", "border-radius": "4px", "border": "1px #ddd solid", "background-color": "#fff" }}>


                            <div class="a-box" style={{ "display": "block", "border-radius": "4px", "border": "1px #ddd solid", "background-color": "#fff" }}>


                                <div class="row">
                                    <div class="col-md-2">
                                    <img alt="Gift cards" src="https://images-na.ssl-images-amazon.com/images/G/01/x-locale/cs/ya/images/blackgc2._CB446992237_.png"
                            
                                            style={{ "padding-top": "10px", width: "90px", height: "60px", "vertical-align": "top" }}></img>



                                    </div>
                                    <div class="col-md-2"></div>
                                    <div class="col-md-8">
                                        <div style={{  "font-size": "19px" ,paddingTop:"10px" }}>Gift cards</div>
                                        <div style={{ "font-size": "14px" ,height:"70px" }}>view balance or redeem a card</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="col-md-3">
                        <div style={{ "margin-top":"52px","font-weight": "400", "font-size": "28px", "line-height": "1.2" }}><h1></h1></div>

                        <div class="row1" style={{  paddingTop:"10px","display": "table", "height": "100%", "margin-bottom": "20px", "width": "100%" }}>



                            <div class="innercell" style={{ diaplay: "table-cell", "height": "100%", "padding-left": "0px", "width": "320px", "box-sizing": "border-box", "display": "block", "border-radius": "4px", "border": "1px #ddd solid", "background-color": "#fff" }}>


                                <div class="a-box" style={{ "display": "block", "border-radius": "4px", "border": "1px #ddd solid", "background-color": "#fff" }}>


                                    <div class="row">
                                        <div class="col-md-2">
                                        <img alt="Login &amp; security" src="https://images-na.ssl-images-amazon.com/images/G/01/x-locale/cs/ya/images/sign-in-lock._CB485931485_.png"
                                          style={{ "padding-top": "10px", width: "100px", height: "60px", "vertical-align": "top" }}></img>



                                        </div>
                                        <div class="col-md-2"></div>
                                        <div class="col-md-8">
                                       
                                        
                                            <div style={{ "font-size": "19px" ,paddingTop:"10px" }}> <Link to={'/customerprofile'}>
                                Profile</Link></div>
                                            <div style={{ "font-size": "14px" ,height:"70px"}}>Edit login, name, and mobile number</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="innercell" style={{ "height": "100%", "padding-left": "0px", "width": "320px", "box-sizing": "border-box", "display": "block", "border-radius": "4px", "border": "1px #ddd solid", "background-color": "#fff" }}>


                            <div class="a-box" style={{ "display": "block", "border-radius": "4px", "border": "1px #ddd solid", "background-color": "#fff" }}>


                                <div class="row">
                                    <div class="col-md-2">
                                    <img alt="All things Alexa" src="https://images-na.ssl-images-amazon.com/images/G/01/x-locale/cs/ya/images/alexa_logo_ya._CB466291315_.png"
                                
                                            style={{ "padding-top": "10px", width: "90px", height: "60px", "vertical-align": "top" }}></img>



                                    </div>
                                    <div class="col-md-2"></div>
                                    <div class="col-md-8">
                                        <div style={{ "font-size": "19px" ,paddingTop:"10px" }}>All things Alexa</div>

                                        <div style={{  "font-size": "14px" ,height:"70px"}}>Get the most out of your Alexa enabeled devices</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="col-md-3">
                        <div style={{ "margin-top":"52px","font-weight": "400", "font-size": "28px", "line-height": "1.2" }}><h1></h1></div>

                        <div class="row1" style={{  paddingTop:"10px","display": "table", "height": "100%", "margin-bottom": "20px", "width": "100%" }}>



                            <div class="innercell" style={{ diaplay: "table-cell", "height": "100%", "padding-left": "0px", "width": "320px", "box-sizing": "border-box", "display": "block", "border-radius": "4px", "border": "1px #ddd solid", "background-color": "#fff" }}>


                                <div class="a-box" style={{ "display": "block", "border-radius": "4px", "border": "1px #ddd solid", "background-color": "#fff" }}>


                                    <div class="row">
                                        <div class="col-md-2">
                                        <img alt="Prime" src="https://images-na.ssl-images-amazon.com/images/G/01/x-locale/cs/ya/images/Prime_clear-bg._CB423472251_.png"
                        
                                                style={{ "padding-top": "10px", width: "70px", height: "60px", "vertical-align": "top" }}></img>



                                        </div>
                                        <div class="col-md-2"></div>
                                        <div class="col-md-8">
                                            <div style={{"font-size": "19px" ,paddingTop:"10px"}}>Prime</div>
                                            <div style={{  "font-size": "14px" ,height:"70px"}}>View benefits and payment settings</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="innercell" style={{ "height": "100%", "padding-left": "0px", "width": "320px", "box-sizing": "border-box", "display": "block", "border-radius": "4px", "border": "1px #ddd solid", "background-color": "#fff" }}>


                            <div class="a-box" style={{ "display": "block", "border-radius": "4px", "border": "1px #ddd solid", "background-color": "#fff" }}>


                                <div class="row">
                                    <div class="col-md-2">
                                    <img alt="Your devices and content" src="https://images-na.ssl-images-amazon.com/images/G/01/x-locale/cs/ya/images/manageYourDevices._CB456085159_.png"

                                            style={{ "padding-top": "10px", width: "90px", height: "60px", "vertical-align": "top" }}></img>



                                    </div>
                                    <div class="col-md-2"></div>
                                    <div class="col-md-8">
                                        <div style={{ "font-size": "19px" ,paddingTop:"10px"}}>Your devices and content</div>
                                        <div style={{  "font-size": "14px" ,height:"40px"}}>Manage your Amazon devices </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>


            </div>















        )
    }
}



export default Account;