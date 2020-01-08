import React from 'react';
import './donate.css';
import PaypalButton from '../../components/Jobs/pay';
import axios from "axios";
import donatinImg from '../../assets/images/donation.jpg';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

const CLIENT = {
  sandbox: 'AXLG5l9gXCMut3IBoDyqmqKyq0fP5tl4E1V_U0UInnEtNymfLXmNKVrMbDYL0Ehoelv98tYl3t-j-p8R',
};
const ENV = 'sandbox';

class donate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: this.props.auth.user.id,
      amount: '',
      date: Date.now(),
      donationExists: false,
      userDonation: [],
      formErrors: {
        amount:''
      }

    };
    this.handleChangeAmount = this.handleChangeAmount.bind(this);
    //this.onSubmit = this.onSubmit.bind(this);
    this.loadDonationHistory();
  }

  handleChangeAmount = event => {
    
    const a =event.target.value;
    
    let formErrors = this.state.formErrors;

    formErrors.amount =  a > 0 ? "" : "Please Enter a valid Amount";
        if(a< 0){
          document.getElementById("inputM").style.borderColor = "red";
        }else {
          document.getElementById("inputM").style.borderColor = "";
        }
        this.setState({ amount: event.target.value });
        
    
  };

  loadDonationHistory = async () => {
    await axios
      .get("/api/Donationdata/donationreq", {
        params: {
          id: this.props.auth.user.id
        }
      }).then((response) => {
        const r = response.data;
        if (response.data.length > 0)
          this.setState({ userDonation: r, donationExists: true });

      });



    console.log(this.state.userDonation)
  }

  render() {
    const { user } = this.props.auth;
    const onSuccess = async (payment) => {
      if (this.props.auth.isAuthenticated) {
        const reqBody = {
          userid: this.props.auth.user.id,
          amount: this.state.amount,
          date: Date.now(),
          donationExists: false
        }
        await axios.post('/api/Donationdata/donationreq', reqBody);
        this.loadDonationHistory();

      }
      else
        this.props.history.push("/login");
    }
    const onError = (error) =>
      console.log('Erroneous payment OR failed to load script!', error);
    const onCancel = (data) =>
      console.log('Cancelled payment!', data);
    return (
      <div id="full">
      <div className="container">
           <div id="dbtn">
            <div id="title">
              <h4 id="topic"><q>No one is useless in this world who lightens the burdens of another.</q></h4>
            </div><br></br>
            <form>
              <div class="form-group">
    <div class="col-sm-4 amountClass">
      <input type="number" name="amount" class="form-control" id="inputM" placeholder="Amount" onBlur={this.onSubmit} onChange={this.handleChangeAmount}/>
        <span id="errorMsg">{this.state.formErrors.amount}</span>
    </div>
  </div>
              <div><br></br></div><PaypalButton
                client={CLIENT}
                env={ENV}
                commit={true}
                currency={'USD'}
                total={this.state.amount}
                onSuccess={onSuccess}
                onError={onError}
                onCancel={onCancel}
              />
            </form><br></br>

          <strong id="topic">Your Donations</strong>
          {this.state.donationExists ?
            <table id="donationTable">
              <thead>
                <tr>
                  <th>Donation Amount</th>
                  <th>Donation Date</th>
                </tr>
              </thead>
              <tbody>
                {this.state.userDonation.map((donation) => {
                  return (
                    <tr key={donation.amount} >
                      <td>{donation.amount}</td>
                      <td>{donation.date}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table> :
            <p id="topic">You do not have any donations at this time! Start sharing today!</p>
          }
        </div>
        </div>
        </div>
    )
  }
}
donate.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(donate);