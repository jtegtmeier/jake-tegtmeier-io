import React from 'react';
import 'whatwg-fetch';

import styles from './style.css';
import socstyles from './social-icons.css';
import Scroll from 'react-scroll';
import ContactForm from './contactForm.js';
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
          <Navlink activeClass={styles.navactive} className={styles.navlink} to="about" spy={true} smooth={true} duration={500} offset={-50}>About</Navlink>
          <Navlink activeClass={styles.navactive} className={styles.navlink} to="projects" spy={true} smooth={true} duration={500} offset={-50}>Projects</Navlink>
          <Navlink activeClass={styles.navactive} className={styles.navlink} to="contact" spy={true} smooth={true} duration={500} offset={-50}>Contact</Navlink>
          <a href="http://blog.tegtmeier.io/" activeClass={styles.navactive} className={styles.bloglink}>Blog</a>
        </nav>
        <Element name="home" className={styles.home}>
          <div className={styles.banner}>
            <h1 className={styles.bannertitle}>Jake.Tegtmeier.io</h1>
            <h2 className={styles.bannerdescription}>
              <span style={{color: '#63b9ff'}}>=</span> ( )
              <span style={{color: '#deb284'}}> => </span>
              {'{'}<span style={{color: '#b878cb'}}>return</span> <span style={{color: '#91b65e'}}>  'Full-Stack Developer'</span>{'}'}
            </h2>
          </div>
          <ul className={socstyles.soc}>
            <a href="https://tegtmeier.io"><img className={styles.headshot} src={require('./img/headshot_bennington.jpg')}/></a>
            <li><a className={socstyles.socgithub} href="https://github.com/jtegtmeier"><FontAwesome name="github"/></a></li>
            <li><a className={socstyles.soclinkedin} href="https://www.linkedin.com/in/jacobtegtmeier"><FontAwesome name="linkedin"/></a></li>
            <li><a className={socstyles.soctwitter} href="https://twitter.com/jaketeg"><FontAwesome name="twitter"/></a></li>
            <li><a className={socstyles.socfcc} href="https://www.freecodecamp.com/jtegtmeier">(<FontAwesome name="fire"/>)</a></li>
            <li><a className={socstyles.socemail} href="mailto:devtegtmeier@gmail.com"><FontAwesome name="envelope-o"/></a></li>
          </ul>
        </Element>
        <Element name="about" className={styles.about}>
          <p>
            <b>Software Engineer</b> and <b>IT professional</b> interested in web development, computer networks, and information security. Designing scalable, responsive and secure software, with the user in mind, is my main focus.<br/><br/>

            My work history is rich with web software development, routing protocols, network monitoring, and collaborative deployment of new computer networks. Currently my personal web projects revolve around responsive UI design, full-stack application development, and envisioning new patterns to make our apps more extendable, testable and secure.<br/><br/>

            Languages, frameworks, and tools are not usually my main concern. Rather, I try to move forward with what works best for the situation based on the collective wisdom and iterative results of the team. I am always looking to connect with driven developers wanting to expand their understanding of CS fundamentals, web technologies, user experience, and information technology by building relationships, workflows, engaging software and ultimately new spaces for innovation.
          </p>
        </Element>
        <Element name="projects" className={styles.projects}>
          <h1>Projects</h1>
          <div className={styles.imgtiles}>
            <a className={styles.imgtile} href="http://blog.tegtmeier.io/">
              <img src={require('./img/BlogTegtmeierio.png')}/>
              <h3>Personal Blog</h3>
            </a>
            <a className={styles.imgtile} href="http://comment.tegtmeier.io">
              <img src={require('./img/commentHub.png')}/>
              <h3>React/Firebase Chat Board</h3>
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
            <li><a className={socstyles.soctwitter} href="https://twitter.com/jaketeg"><FontAwesome name="twitter"/></a></li>
            <li><a className={socstyles.socfcc} href="https://www.freecodecamp.com/jtegtmeier">(<FontAwesome name="fire"/>)</a></li>
            <li><a className={socstyles.socemail} href="mailto:devtegtmeier@gmail.com"><FontAwesome name="envelope-o"/></a></li>
          </ul>
        </footer>
      </div>
    );
  }
}

export default App;
