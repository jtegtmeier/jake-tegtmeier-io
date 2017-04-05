import React from 'react';
import 'whatwg-fetch';
import validator from 'validator';
import Recaptcha from 'react-gcaptcha';

import styles from './style.css';

class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: 1,
      formError: '',
      formErrorStyle: {maxHeight: 0},
      validEmail: false,
      validSubject: false,
      validMessage: false,
      validCaptcha: false,
      captchaLoaded: false,
      email: '',
      subject: '',
      message: '',
    };
  }

  emailEntered(event) {
    if (!validator.isEmail(event.target.value)) {
      this.setState({validEmail: false});
    } else {
      this.setState({validEmail: true});
    }
    this.setState({email: validator.escape(event.target.value)});
  }

  subjectEntered(event) {
    const len = event.target.value.length;
    if (len > 30 || len < 1) {
      this.setState({validSubject: false});
    } else {
      this.setState({validSubject: true});
      this.setState({subject: validator.escape(event.target.value)});
    }
  }

  messageEntered(event) {
    const len = event.target.value.length;
    if (len > 300 || len < 1) {
      this.setState({validMessage: false});
    } else {
      this.setState({validMessage: true});
      this.setState({message: validator.escape(event.target.value)});
    }
  }

  captchaSolved() {
    this.setState({validCaptcha: true});
  }

  recaptchaDidLoad() {
    this.setState({recaptchaLoaded: true});
    console.log('Captcha Loaded!!!!');
  }

  allInputValid() {
    if (!this.state.validEmail) {
      this.setState({formError: 'Invalid Email.'});
    } else if (!this.state.validSubject) {
      this.setState({formError: 'Invalid Subject Text.'});
    } else if (!this.state.validMessage) {
      this.setState({formError: 'Invalid Message Text.'});
    } else if (!this.state.validCaptcha) {
      this.setState({formError: 'Captcha Not Solved. Try Refresh.'});
    } else {
      return true;
    }
    this.setState({formErrorStyle: {maxHeight: 60}});
    window.setTimeout(function() { this.setState({formErrorStyle: {maxHeight: 0}});}.bind(this), 2000);
    return false;
  }

  submitForm(event) {
    if (this.allInputValid()) {
      const data = {
        email: this.state.email,
        subject: this.state.subject,
        message: this.state.message,
      };

      this.setState({screen: this.state.screen + 1});

      console.log(data);
      console.log(this.state);

      fetch('/sendMail', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.state.email,
          subject: this.state.subject,
          message: this.state.message,
        })
      });
    }
  }

  render() {
    if (this.state.screen === 1) {
      return (
        <div className={styles.formContainer}>
          <div className={styles.contactForm}>
            <h4 className={styles.formLabel}>Send me a message.</h4>
            <label className={styles.formError} style={this.state.formErrorStyle}>{this.state.formError}</label>
            <div className={styles.formFields}>
              <div className={styles.formField}>
              <div>
                <label htmlFor="emailField">Your Email:</label>
                <input type="email" id="emailField" ref="email" className="form-control"
                  onChange={this.emailEntered.bind(this)}
                  value={this.state.email}/>
              </div>
                <div>
                  <label htmlFor="subjectField">Subject:</label>
                  <input type="text" id="subjectField" ref="subject" className="form-control"
                    onChange={this.subjectEntered.bind(this)}
                    value={this.state.subject}/>
                </div>
              </div>
              <div className={styles.formField}>
                <div>
                  <label htmlFor="messageField">Message:</label>
                  <textarea type="text" id="messageField" ref="message" className="form-control" rows="3" cols="50"
                    onChange={this.messageEntered.bind(this)}
                    value={this.state.message}/>
                </div>
              </div>
              <div className={styles.contactSubmit}>
                <Recaptcha
                  sitekey="6LfMpSITAAAAALAyAWseS__-4lm_DBlfJCj61_Ux"
                  render="explicit"
                  verifyCallback={this.captchaSolved.bind(this)}
                  onloadCallback={this.recaptchaDidLoad.bind(this)}/>
                <button className="btn" onClick={this.submitForm.bind(this)}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (this.state.screen === 2) {
      return (
        <div className={styles.contactSent}>
          <h2>Message sent!</h2>
          <h4>I'll get back to you as soon as I can.</h4>
        </div>
      );
    } else {
      return (
        <div className={styles.contactError}>
          <h2>Contact Form error.</h2>
        </div>
      );
    }
  }
}
ContactForm.propTypes = {
  emailfield: React.PropTypes.string,
  subjectfield: React.PropTypes.string,
  messagefield: React.PropTypes.string,
};
ContactForm.defaultProps = {
  emailfield: 'Email',
  subjectfield: 'Subject',
  messagefield: 'Message',
};

export default ContactForm;
