import React from 'react';
import './Services.css';
import axios from "axios";
import rd3 from 'rd3';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { submitBill, getBillData } from "../../actions/billActions";
import { logoutUser } from "../../actions/authActions";
import {Alert} from "react-bootstrap";
const BarChart = rd3.BarChart;
var barData = [];
var al = false;
var r;
const wattsRegExp =  /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/
// const formValid = ({formErrors, ...rest}) => {
//   let valid = true;

//   Object.values(formErrors).forEach(val => { 
//     val.length>0 && (valid = false);
//   });
//   console.log(valid);
//   return valid;
// };
// var barData = [
//   {
//     "values": [
//       { x: "January", y:  91},
//       { x: "March", y: 290},
//       { x: "May", y: 787},
//       { x: "Ap", y:  91},
//       { x: "Marddch", y: 290},
//       { x: "Mssay", y: 787},
//       { x: "Jansuary", y:  91},
//       { x: "Mxarch", y: 290},
//     ]
//   },
// ];
class Services extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: this.props.auth.user.id,
      month: '',
      year: '',
      watts: '',
      billData: [],
      alertS: false,
      alertF: false,
      formErrors: {
        month:'',
        year: '',
        watts: ''
      }
    };
    this.handleChangeMonth = this.handleChangeMonth.bind(this);
    this.handleChangeYear = this.handleChangeYear.bind(this);
    this.handleChangeWatts = this.handleChangeWatts.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.generateGraph = this.generateGraph.bind(this);
  }
  constructData(data) {
    barData = [];
    var vals = [];
    data.forEach(obj => {
      var data1 = {
        x: obj["month"] + " " + obj["year"],
        y: obj["watts"]
      }
      vals.push(data1);
    });
    var bar = {
      "values": vals
    }
    barData.push(bar);
    //console.log(barData);
    return barData;
  }
  onSubmit = (e) => {
    e.preventDefault();
    let formErrors = this.state.formErrors;
    if(this.state.month!="" && this.state.year !="" && wattsRegExp.test(this.state.watts)) {
      const billData = {
        userid: this.props.auth.user.id,
        month: this.state.month,
        year: this.state.year,
        watts: this.state.watts
      };
      this.props.submitBill(billData);
      this.setState({month: '', year: '', watts: '', alertS: true});
    } else {
      this.setState({alertF: true});
    }
  }
  closeAlertS = () => {
    this.setState({ alertS: false });
  }
  closeAlertF = () => {
    this.setState({ alertF: false });
  }

  generateGraph = (e) => {
    e.preventDefault();
    axios
    .get("/api/billData/submitbill",{
      params: {
        id: this.props.auth.user.id
      }
  }).then((response) => {
    const r = response.data;
    console.log(response);
    r.sort((a, b) => {
      return a.year - b.year;
    });
    this.setState({billData : r}, () => {
      this.constructData(this.state.billData);
      this.forceUpdate();
    })
  });
  }
  handleChange = (event) => {
    const {name, value} = event.target;
    let formErrors = this.state.formErrors;

    switch(name) {
      case "month":
        formErrors.month =  value.length > 0 ? "" : "Month cannot be empty";
        if(value.length == 0){
          document.getElementById("inputM").style.borderColor = "red";
        }else {
          document.getElementById("inputM").style.borderColor = "";
        }
        this.setState({month: event.target.value})
        break;
      case "year":
        formErrors.year = value.length > 0 ? "" : "Year cannot be empty";
        if(value.length == 0){
          document.getElementById("inputY").style.borderColor = "red";
        }else {
          document.getElementById("inputY").style.borderColor = "";
        }
        this.setState({year: event.target.value})
        break;
      case "watts":
        formErrors.watts = value>0 && value.length>0 ? "" : "Watts cannot be empty, negative numbers or contain special characters";
        if(value.length===0 || value<=0){
          document.getElementById("inputW").style.borderColor = "red";
        }else {
          document.getElementById("inputW").style.borderColor = "";
        }
        this.setState({watts: event.target.value})
          break;
      default:
        break;
    }
    this.setState({formErrors, [name]: value});
  };
  handleChangeMonth = event => {
    this.setState({month: event.target.value});
  };
  handleChangeYear = event => {
    this.setState({year: event.target.value});
  };
  handleChangeWatts = event => {
    this.setState({watts: event.target.value});
  };
    render() {
        return (
          <div class="billBg">
            {(this.state.alertS ? 
                (<Alert variant="success" onClose={() => this.closeAlertS()} dismissible>Bill Data submitted successfully.</Alert>) 
                : '')}
                {(this.state.alertF ? 
                (<Alert variant="danger" onClose={() => this.closeAlertF()} dismissible>Please fill all fields.</Alert>) 
                : '')}
            <div class="container containerClass">
  <form>
  <div class="form-group">
    <label class="col-sm-2 col-form-label txtLabel">Select Month</label>
    <div class="col-sm-10">
      <select id="inputM" name="month" class="form-control" value={this.state.month} onChange={this.handleChange}>
      <option></option>
      <option value="Jan">January</option>
      <option value="Feb">February</option>
      <option value="Mar">March</option>
      <option value="Apr">April</option>
      <option value="May">May</option>
      <option value="Jun">June</option>
      <option value="Jul">July</option>
      <option value="Aug">August</option>
      <option value="Sep">September</option>
      <option value="Oct">October</option>
      <option value="Nov">November</option>
      <option value="Dec">December</option>
      </select>
      <span id="errorMsg">{this.state.formErrors.month}</span>
    </div>
  </div>
  <div class="form-group">
    <label class="col-sm-2 col-form-label txtLabel">Select Year</label>
    <div class="col-sm-10">
      <select id="inputY" name="year" class="form-control" value={this.state.year} onChange={this.handleChange}>
      <option></option>
      <option>2000</option>
      <option>2001</option>
      <option>2002</option>
      <option>2003</option>
      <option>2004</option>
      <option>2005</option>
      <option>2006</option>
      <option>2007</option>
      <option>2008</option>
      <option>2009</option>
      <option>2010</option>
      <option>2011</option>
      <option>2012</option>
      <option>2013</option>
      <option>2014</option>
      <option>2015</option>
      <option>2016</option>
      <option>2017</option>
      <option>2018</option>
      <option>2019</option>
      </select>
      <span id="errorMsg">{this.state.formErrors.year}</span>
    </div>
  </div>
  <div class="form-group">
    <label class="col-sm-2 col-form-label txtLabel">Enter Watts (kWh)</label>
    <div class="col-sm-10">
      <input type="number" name="watts" class="form-control" id="inputW" value={this.state.watts} onChange={this.handleChange}/>
        <span id="errorMsg">{this.state.formErrors.watts}</span>
    </div>
  </div>
  <div class="form-group btnPadding">
  <button type="button" class="btn btn-primary btnSpace" onClick={this.onSubmit}>Submit</button>
  <button type="button" class="btn btn-success btnSpace" onClick={this.generateGraph}>Generate Graph</button>
  </div>
</form>
<br></br>
<div>
<BarChart
  data={barData}
  width={1000}
  height={300}
  title="Your electricity usage"
  xAxisLabel="Month"
  yAxisLabel="kWh"
  yAxisTickCount={6}
/>
</div>
</div>
</div>
        )
    }
};

Services.propTypes = {
  submitBill: PropTypes.func.isRequired,
  getBillData: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { submitBill, getBillData, logoutUser }
)(Services);



// export default Services;