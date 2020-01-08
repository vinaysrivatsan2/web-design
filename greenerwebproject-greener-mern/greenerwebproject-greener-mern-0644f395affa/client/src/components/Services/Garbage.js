import React from 'react';
import './Services.css';
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/authActions";
import { connect } from "react-redux";
import {Alert} from "react-bootstrap";
import { submitGarbageData, sendMail } from "../../actions/garbageActions";
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
const mapStyles = {
    width: '80%',
    height: '80%',
    marginLeft: '-15px'
  };
class Garbage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        userid: this.props.auth.user.id,wasteType: '',
        pickType: '',
        weight: '',
        time: '',
        alertS: false,
        alertF: false,
        stores: [{ latitude: 42.3367, longitude:  -71.0875},
            {latitude: 42.3375534, longitude: -71.0923795},
            {latitude: 442.3375534, longitude: -71.0923795},
            {latitude: 42.3441765, longitude: -71.0907051},
            {latitude: 42.3425868, longitude: -71.1351013},
            {latitude: 42.3312538, longitude: -71.1234369},
            {latitude: 42.3436572, longitude: -71.0567736}
        ],
        formErrors: {
            wType: '',
            weigh: ''
        }
    };
    
        this.handleChangeWaste = this.handleChangeWaste.bind(this);
        this.handleChangeType = this.handleChangeType.bind(this);
        this.handleChangeWeight = this.handleChangeWeight.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
      }
      buttonSet = (type) => {
        if(type === "pickup") {
            return (
                <div class="rGroup">
                <button type="button" class="btn btn-lg btn-danger button-spacing" value="11AM" onClick={this.handleTimeChange}>11AM</button>
                <button type="button" class="btn btn-lg btn-danger button-spacing" value="3PM" onClick={this.handleTimeChange}>3PM</button>
                </div>
            )
        } else if(type === "dropoff") {
            return (
            <div class="rGroup">
                <button type="button" class="btn btn-lg btn-danger button-spacing" value="10AM" onClick={this.handleTimeChange}>10AM</button>
                <button type="button" class="btn btn-lg btn-danger button-spacing" value="3PM" onClick={this.handleTimeChange}>3PM</button>
                <button type="button" class="btn btn-lg btn-danger button-spacing" value="7PM" onClick={this.handleTimeChange}>7PM</button>
                </div>
            )
        }
    }
    onSubmit = (e) => {
        e.preventDefault();
        if(this.state.wasteType!=="" && this.state.weight !=="" && this.state.weight >0 && this.state.time !=="" && this.state.pickType !=="") {
          const gData = {
            userid: this.props.auth.user.id,
            wasteType: this.state.wasteType,
            weight: this.state.weight
          };
          const mData = {
            usermail: this.props.auth.user.email,
            wasteType: this.state.wasteType,
            weight: this.state.weight,
            pickType: this.state.pickType,
            time: this.state.time
          };
          this.props.sendMail(mData);
          this.props.submitGarbageData(gData);
          this.setState({wasteType: '', weight: '', alertS: true});
        } else {
            console.log(this.props.auth);
            this.setState({alertF: true});
        }
      }
    handleChange = (event) => {
        const {name, value} = event.target;
        let formErrors = this.state.formErrors;
    
        switch(name) {
          case "wasteType":
                formErrors.wType =  value.length > 0 ? "" : "Waste type cannot be empty";
                console.log(value);
                if(value.length === 0){
                  document.getElementById("inputWaste").style.borderColor = "red";
                }else {
                  document.getElementById("inputWaste").style.borderColor = "";
                }
            this.setState({wasteType: event.target.value})
            break;
          case "weight":
            formErrors.weigh = value.length > 0 && value>0 ? "" : "Weight cannot be negative or empty";
            if(value.length === 0 || value<=0){
              document.getElementById("inputWeight").style.borderColor = "red";
            }else {
              document.getElementById("inputWeight").style.borderColor = "";
            }
            this.setState({weight: event.target.value})
            break;
          default:
            break;
        }
        //this.setState({formErrors, [name]: value});
      };
    handleTimeChange(event) {
    this.setState({time: event.target.value});
    document.getElementById("time").innerHTML = "Pickup/Drop time set to " + event.target.value;
      }
      handleChangeWaste(event) {
        this.setState({wasteType: event.target.value});
      }
      handleChangeType(event) {
        this.setState({pickType: event.target.value});
        document.getElementById("time").innerHTML = "";
      }
      handleChangeWeight(event) {
        this.setState({weight: event.target.value});
      }
      closeAlertS = () => {
        this.setState({ alertS: false });
      }
      closeAlertF = () => {
        this.setState({ alertF: false });
      }
    render() {
        return (
            <div class="bg">
                {(this.state.alertS ? 
                (<Alert variant="success" onClose={() => this.closeAlertS()} dismissible>Request submitted successfully.</Alert>) 
                : '')}
                {(this.state.alertF ? 
                (<Alert variant="danger" onClose={() => this.closeAlertF()} dismissible>Please all fields correctly</Alert>) 
                : '')}
            <div class="container" id="backgroundImg">
<input class="plastic" name="wasteType" value="Plastic" onClick={this.handleChange}></input>
  <input class="metal" name="wasteType" value="Metal" onClick={this.handleChange}></input>
  <input class="paper" name="wasteType" value="Paper" onClick={this.handleChange}></input>

  <div class="form-group gForm">
    <label class="col-sm-2 col-form-label gLabel">Waste Type</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="inputWaste" value={this.state.wasteType} disabled/>
      <span id="errorMsg">{this.state.formErrors.wType}</span>
        </div>
        <label class="col-sm-3 col-form-label weightClass gLabel">Approx. weight (kg)</label>
    <div class="col-sm-10">
      <input type="number" name="weight"class="form-control" id="inputWeight" onChange={this.handleChange} min="1" max="20" value={this.state.weight}/>
      <span id="errorMsg">{this.state.formErrors.weigh}</span>
        </div>
        <div class="rGroup">
        <div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="pickup" onClick={this.handleChangeType}/>
  <label class="form-check-label gLabel" for="inlineRadio1">Pick-Up</label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="dropoff" onClick={this.handleChangeType}/>
  <label class="form-check-label gLabel" for="inlineRadio2">Drop-Off</label>
</div>
</div>
{this.buttonSet(this.state.pickType)}
<div id="time" class="rGroup"></div>
        </div>
        <button id="btnSub" type="button" class="btn btn-success" data-toggle="alert" onClick={this.onSubmit}>Submit</button>
        <hr></hr>
        <h3 class="dropStore">Our Drop Off store location</h3>
        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={{ lat: 42.3367, lng:  -71.0875}}
        >
            {
                     this.state.stores.map((store, index) => (
                        <Marker key={index} id={index} position={{
                            lat: store.latitude,
                            lng: store.longitude}} />
                     ))
                    
                    }
        
            {/* <Marker position={{ lat: 42.3367, lng:  -71.0875}} /> */}
        </Map>
        </div>
        </div>
        );
    }
};

Garbage.propTypes = {
    submitGarbageData: PropTypes.func.isRequired,
    sendMail: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth
  });
  export default connect(
    mapStateToProps,
    { submitGarbageData, sendMail, logoutUser }
  )(
    GoogleApiWrapper({
        apiKey: ("AIzaSyDiqjm-md1hFlBudX6E31MQiCWZNsqPgAA")
    })(Garbage)
)