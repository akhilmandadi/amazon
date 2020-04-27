import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import greyimg from '../images/greyimg.png';
import edit from '../images/edit.png';
import profilepicavatar from '../images/profilepicavatar.jpeg';
import { uploadCustomerCoverpic, uploadCustomerProfilepic, fetchCustomerProfile, fetchCustomerRatings, updateCustomerInfo } from '../../redux/actions/profile'
import Myreviews from './Myreviews';

//import '../css/profile.css';

class CustomerProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            location: "",
            email: "",
            phonenumber: "",
            profileimage: "",
            coverimage: "",
            persona: "customer",
            file: "",
        };
        this.onChangepic = this.onChangepic.bind(this)
        this.submitInfo = this.submitInfo.bind(this)
        this.uploadcoverpic = this.uploadcoverpic.bind(this)
        this.uploadprofilepic = this.uploadprofilepic.bind(this)

    }
    onChangepic(e) {
        this.setState({ file: e.target.files[0] });
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    componentDidMount() {
        this.props.fetchCustomerProfile(sessionStorage.getItem('id'));
        this.props.fetchCustomerRatings(sessionStorage.getItem('id'));
    }
    componentWillReceiveProps(nextProps) {

        if (nextProps.customerProfile) {
            var { customerProfile } = nextProps;
            if (customerProfile[0]) {
                var userData = {
                    name: customerProfile[0].name || this.state.name,
                    email: customerProfile[0].email || this.state.email,
                    location: customerProfile[0].location || this.state.location,
                    phonenumber: customerProfile[0].phonenumber || this.state.phonenumber,
                    profileimage: customerProfile[0].profileimage || this.state.profileimage,
                    coverimage: customerProfile[0].coverimage || this.state.coverimage,

                };
                this.setState(userData);
            }


        }
    }
    uploadcoverpic = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('id', sessionStorage.getItem('id'))
        formData.append('pictype', 'cover')
        formData.append('profilepic', this.state.file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        this.props.uploadCustomerCoverpic(formData, config)
    }
    uploadprofilepic = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('id', sessionStorage.getItem('id'))
        formData.append('pictype', 'profile')
        formData.append('profilepic', this.state.file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        this.props.uploadCustomerProfilepic(formData, config);
    }
    submitInfo = (e) => {
        const data = {
            id: sessionStorage.getItem('id'),
            name: this.state.name,
            email: this.state.email,
            location: this.state.location,
            phonenumber: this.state.phonenumber,

        }
        this.props.updateCustomerInfo(data)
    }

    render() {
        let coverimage = null;
        let profileimage = null;
        let editbutton = null;
        let cimage = this.props.customerProfile ? this.props.customerProfile[0] ? this.props.customerProfile[0].coverimage ? this.props.customerProfile[0].coverimage : this.state.coverimage : this.state.coverimage : this.state.coverimage;
        let pimage = this.props.customerProfile ? this.props.customerProfile[0] ? this.props.customerProfile[0].profileimage ? this.props.customerProfile[0].profileimage : this.state.profileimage : this.state.profileimage : this.state.profileimage;
        coverimage = (<div>
            <div class="desktop-cover-photo" style={{
                height: "300px", "background-color": "#f6fafb",
                "margin": "0 auto", "width": "860px", "position": "relative", "line-height": "15px"
            }}>

                {(cimage === "" || cimage === undefined) ? (
                    <img src={greyimg} alt="coverpic" style={{ height: "300px", "width": "860px", cursor: "pointer" }}  ></img>
                ) : (
                        <img src={this.state.coverimage} alt="coverpic" style={{ height: "300px", "width": "860px", cursor: "pointer" }}  ></img>
                    )}
                <img src={edit} alt="editicon" style={{
                    cursor: "pointer", position: "absolute", width: "40px", bottom: "13px", right: "15px"
                }} data-toggle="modal" data-target="#myModal"></img>
            </div>

            <div style={{ "width": "200px", "height": "10px" }}>

                <div class="modal fade" id="myModal" role="dialog" style={{ "height": "500px" }}  >
                    <div class="modal-dialog" style={{ "width": "300px" }}>


                        <div class="modal-content">
                            <div >
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title"><br></br>&nbsp;upload cover pic</h4>
                            </div>
                            <div class="modal-body">
                                <form onSubmit={this.uploadcoverpic}>
                                    <input type="file" class="form-control-file" name="image"
                                        id="exampleFormControlFile1" onChange={this.onChangepic} /><br></br>
                                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> &nbsp;
                                      <button type="submit" class="btn btn-success" onClick={this.uploadcoverpic} data-dismiss="modal" >Save</button>


                                </form>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
        )

        profileimage = (<div>
            <div id="customer-profile-avatar-image" style={{ "padding-left": "5px", top: "175px", left: "40px", cursor: "pointer", position: "absolute" }}>
                {(pimage === "" || pimage === undefined) ?
                    (<img src={profilepicavatar} alt="coverpic" variant="circle" style={{
                        position: "relative",
                        height: "220px", width: "220px", "box-shadow": "0 0 0 4px #fff", "border-radius": "50%"
                    }}></img>

                    ) : (<img src={this.state.profileimage} alt="profilepic" variant="circle" style={{
                        position: "relative", height: "220px", width: "220px", "box-shadow": "0 0 0 4px #fff", "border-radius": "50%"
                    }}></img>)}

                <img src={edit} alt="editicon" style={{ cursor: "pointer", position: "absolute", width: "40px", bottom: "20px", left: "90px" }} data-toggle="modal" data-target="#myModal1"></img>
            </div>
            <div style={{ "width": "200px", "height": "10px" }}>

                <div class="modal fade" id="myModal1" role="dialog" style={{ "height": "500px" }}  >
                    <div class="modal-dialog" style={{ "width": "300px" }}>
                        <div class="modal-content">
                            <div >
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title"><br></br>&nbsp;upload profile pic</h4>
                            </div>
                            <div class="modal-body">
                                <form onSubmit={this.uploadprofilepic}>
                                    <input type="file" class="form-control-file" name="image"
                                        id="exampleFormControlFile1" onChange={this.onChangepic} /><br></br>
                                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> &nbsp;
                                     <button type="submit" class="btn btn-success" onClick={this.uploadprofilepic} data-dismiss="modal">Save</button>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        )
        editbutton = (<div>
            <div style={{ "padding-left": "600px", "padding-top": "50px" }}>
                <button data-toggle="modal" data-target="#myModal2" style={{
                    "font-size": "13px",
                    "textAlign": "center", "width": "250px", "height": "30px", "background-color": "#f0c14b", "margin-right": "10px", "padding": "3px 10px 3px", "border": "1px solid #a88734"
                }}>


                    Edit your Profile </button>
            </div>
            <div style={{ "width": "200px", "height": "10px" }}>

                <div class="modal fade" id="myModal2" role="dialog" style={{ "height": "500px" }}  >
                    <div class="modal-dialog" style={{ "width": "600px" }}>


                        <div class="modal-content">
                            <div >
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title"><br></br>&nbsp;Edit profile details</h4>
                            </div>
                            <div class="modal-body">
                                <form onSubmit={this.submitInfo}>
                                    <label for="name"> Name:</label>
                                    <input type="text" name="name" id="name" value={this.state.name} onChange={this.onChange} class="form-control" required />
                                    <label for="name"> Mail Id:</label>
                                    <input type="email" name="email" id="email" value={this.state.email} onChange={this.onChange} class="form-control" required />
                                    <label for="name"> Location</label>
                                    <input type="text" name="location" id="location" value={this.state.location} onChange={this.onChange} class="form-control" required />
                                    <label for="name"> Phonenumber</label>
                                    <input type="number" name="phonenumber" id="phonenumber" value={this.state.phonenumber} onChange={this.onChange} class="form-control" required />
                                    <br></br>
                                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> &nbsp;
                <button type="submit" class="btn btn-success" onClick={this.submitInfo} data-dismiss="modal">Edit</button>


                                </form>
                            </div>
                        </div>

                    </div>
                </div>

            </div></div>)


        return (
            <div>
            <div class="row">
                <div class="card" style={{
                    "border-spacing": "60px", "background-color": "#fff", "min-width": "860px", "margin": "0 auto", "width": "860px", height: "525px", "position": "relative", "border-style": "solid",
                    "border-width": "1px", "border-color": "#bbbbbb"
                }}>

                    {coverimage}
                    {profileimage}
                    <div class="text-atright" style={{ "padding-left": "300px" }}>
                        <h3>{this.props.customerProfile[0] ? this.props.customerProfile[0].name ? this.props.customerProfile[0].name : this.state.name : this.state.name}
                         &nbsp;<i class='fas fa-pencil-alt' data-toggle="modal" data-target="#myModal2" style={{ "font-size": "20px" }}></i></h3>
                        <h3>{this.props.customerProfile[0] ? this.props.customerProfile[0].location ? this.props.customerProfile[0].location : this.state.location : this.state.location}</h3>

                    </div>
                    {editbutton}
                    </div> 
                    </div>
                  
                    <div class="row" style={{"margin-top":"10px" }}>
                    <div class='col-md-4' style={{"padding-left": "290px" }}>
                    <div class="card" style={{"padding-top":"35px", "textAlign":"center","background-color": "#fff", "margin": "0 auto", "width": "340px", height: "120px", "position": "relative", "border-style": "solid",
                    "border-width": "1px", "border-color": "#bbbbbb","fontSize":"22px"}}>  <Link to={'/Myreviews'}>
                                My Reviews</Link></div></div>
                     <div class='col-md-6'style={{"padding-left": "130px" }}>
                    <div class="card" style={{"background-color": "#fff", "margin": "0 auto", "width": "500px", height: "120px", "position": "relative", "border-style": "solid",
                    "border-width": "1px", "border-color": "#bbbbbb"}}> 
                    <div class="insight"  style={{"fontWeight":"600","fontSize":"15px","padding-left": "10px","padding-top": "10px","padding-bottom": "10px" }}>Insights</div>
                    <div class="row">
                    <div class="col-md-3">
                    <div style={{"padding-left":"10px"}}> {this.props.customerRating?this.props.customerRating.c1:0}</div>
                    <Link to={'/Myreviews'}>
                                helpful votes</Link>
                     <div>public</div>
                    </div>
                    <div class="col-md-2">
                    <div style={{"padding-left":"10px"}}> {this.props.customerRating?this.props.customerRating.c2:0}</div>
                   
                    <Link to={'/Myreviews'}>
                                reviews</Link>
                    <div>public</div>
                    </div>
                    <div class="col-md-2">
                    <div style={{"padding-left":"10px"}}>0</div>
                    hearts
                     <div>public</div>
                    </div>
                    <div class="col-md-3">
                    <div style={{"padding-left":"10px"}}>0</div>
                    idea lists
                    <div>public</div>
                    </div>
                    <div class="col-md-1"> 
                    <div style={{"padding-left":"10px"}}>0</div>

                    followers
                    <div>public</div>
                    </div>
                    </div>

                    
                    
                    
                    
                    </div>
                    </div>
                    </div>
                    </div>
           

           


        );
    }
}

const mapStateToProps = state => {
    return {
        customerProfile: state.profile.customerProfile,
        customerRating: state.profile.customerRating

    };
};

export default connect(mapStateToProps, { uploadCustomerCoverpic,fetchCustomerRatings,uploadCustomerProfilepic, updateCustomerInfo, fetchCustomerProfile })(CustomerProfile);



