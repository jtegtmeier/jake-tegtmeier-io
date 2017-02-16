import React from 'react';
import 'whatwg-fetch';
import validator from 'validator';
import Recaptcha from 'react-gcaptcha';

import styles from './style.css';
import socstyles from './social-icons.css';
import Scroll from 'react-scroll';
import FontAwesome from 'react-fontawesome';

const Navlink    = Scroll.Link;
const Element    = Scroll.Element;
const Events     = Scroll.Events;
const scroll     = Scroll.animateScroll;

class App extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    Events.scrollEvent.register('begin', function() {
      // console.log("begin", arguments);
    });

    Events.scrollEvent.register('end', function() {
      // console.log("end", arguments);
    });

    scroll.scrollTo(0.5);
  }

  componentWillUnmount() {
    Events.scrollEvent.remove('begin');
    Events.scrollEvent.remove('end');
  }

  render() {
    return (
      <div className={styles.app}>
        <nav className={styles.nav}>
          <Navlink activeClass={styles.navactive} className={styles.navlink} to="home" spy={true} smooth={true} duration={500} offset={-50}>Home</Navlink>
          <Navlink activeClass={styles.navactive} className={styles.navlink} to="projects" spy={true} smooth={true} duration={500} offset={-50}>Projects</Navlink>
          <Navlink activeClass={styles.navactive} className={styles.navlink} to="about" spy={true} smooth={true} duration={500} offset={-50}>About</Navlink>
          <Navlink activeClass={styles.navactive} className={styles.navlink} to="contact" spy={true} smooth={true} duration={500} offset={-50}>Contact</Navlink>
          <a href="http://blog.tegtmeier.io/" activeClass={styles.navactive} className={styles.bloglink}>Blog</a>
        </nav>
        <Element name="home" className={styles.home}>
          <div className={styles.banner}>
            <h1 className={styles.bannertitle}>Jake.Tegtmeier.io</h1>
            <h2 className={styles.bannerdescription}>
              (<span style={{color: '#63b9ff'}}>'Jake'</span>, <span style={{color: '#63b9ff'}}>'Tegtmeier'</span>)
              <span style={{color: '#deb284'}}> => </span>
              {'{'}<span style={{color: '#b878cb'}}>return</span> <span style={{color: '#91b65e'}}>  'Full-Stack Developer'</span>{'}'}
            </h2>
          </div>
          <ul className={socstyles.soc}>
            <a href="https://tegtmeier.io"><img className={styles.headshot} src={require('./img/headshot_bennington.jpg')}/></a>
            <li><a className={socstyles.socgithub} href="https://github.com/jtegtmeier"><FontAwesome name="github"/></a></li>
            <li><a className={socstyles.soclinkedin} href="https://www.linkedin.com/in/jacobtegtmeier"><FontAwesome name="linkedin"/></a></li>
            <li><a className={socstyles.soctwitter} href="https://twitter.com/changerepeat"><FontAwesome name="twitter"/></a></li>
            <li><a className={socstyles.socfcc} href="https://www.freecodecamp.com/jtegtmeier">(<FontAwesome name="fire"/>)</a></li>
            <li><a className={socstyles.socemail} href="mailto:devtegtmeier@gmail.com"><FontAwesome name="envelope-o"/></a></li>
          </ul>
        </Element>
        <Element name="projects" className={styles.projects}>
          <h1>Projects</h1>
          <div className={styles.imgtiles}>
            <a className={styles.imgtile} href="http://blog.tegtmeier.io/">
              <img src={require('./img/BlogTegtmeierio.png')}/>
              <h3>Personal Blog</h3>
            </a>
            <a className={styles.imgtile} href="http://codepen.io/jtegtmeier/full/yJzEwN">
              <img src={require('./img/PomodoroGraph.png')}/>
              <h3>Pomodoro Graph</h3>
            </a>
            <a className={styles.imgtile} href="https://codepen.io/jtegtmeier/full/vKgjmz">
              <img src={require('./img/LocalWeatherApp.png')}/>
              <h3>Local Weather App</h3>
            </a>
            <a className={styles.imgtile} href="http://codepen.io/jtegtmeier/full/KrBwzb">
              <img src={require('./img/ColorToneMemory.png')}/>
              <h3>Simon Game</h3>
            </a>
            <a className={styles.imgtile} href="http://codepen.io/jtegtmeier/full/pbRPJw">
              <img src={require('./img/DesignQuoteCloud.png')}/>
              <h3>Design Quote Cloud</h3>
            </a>
            <a className={styles.imgtile} href="http://codepen.io/jtegtmeier/full/PNQaqV">
              <img src={require('./img/JSCalc9000.png')}/>
              <h3>JavaScript Calculator</h3>
            </a>
          </div>
        </Element>
        <Element name="about" className={styles.about}>
          <h1>About</h1>
          <p>
            I am a computer scientist deeply interested in the fields of web development, networking, and security. Designing web based software solutions with the user in mind is my main focus. There is nothing better then being able to holistically look at a problem, find an elegant model to represent it, and help your team work towards its explanation.
          </p>
        </Element>
        <Element name="contact" className={styles.contact}>
          <h1>Contact</h1>
          <ContactForm/>
        </Element>
        <footer>
          <div id="author">
            <p>Copyright <span className={styles.authorText}>Jacob Tegtmeier</span> 2016</p>
          </div>
          <hr/>
          <ul className={socstyles.soc}>
            <li><a className={socstyles.socgithub} href="https://github.com/jtegtmeier"><FontAwesome name="github"/></a></li>
            <li><a className={socstyles.soclinkedin} href="https://www.linkedin.com/in/jacobtegtmeier"><FontAwesome name="linkedin"/></a></li>
            <li><a className={socstyles.soctwitter} href="https://twitter.com/changerepeat"><FontAwesome name="twitter"/></a></li>
            <li><a className={socstyles.socfcc} href="https://www.freecodecamp.com/jtegtmeier">(<FontAwesome name="fire"/>)</a></li>
            <li><a className={socstyles.socemail} href="mailto:devtegtmeier@gmail.com"><FontAwesome name="envelope-o"/></a></li>
          </ul>
        </footer>
      </div>
    );
  }
}

class ContactForm extends React.Component{
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
                <label for="emailField">Your Email:</label>
                <input type="email" id="emailField" ref="email" className="form-control" defaultValue={this.props.email}
                  onChange={this.emailEntered.bind(this)}
                  value={this.state.email}/>
              </div>
                <div>
                  <label for="subjectField">Subject:</label>
                  <input type="text" id="subjectField" ref="subject" className="form-control" defaultValue={this.props.subject}
                    onChange={this.subjectEntered.bind(this)}
                    value={this.state.subject}/>
                </div>
              </div>
              <div className={styles.formField}>
                <div>
                  <label for="messageField">Message:</label>
                  <textarea type="text" id="messageField" ref="message" className="form-control" rows="3" cols="50" defaultValue={this.props.message}
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

export default App;
