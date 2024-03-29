import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import YouTube from 'react-youtube';
import Iframe from 'react-iframe';
import {Badge, Button, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane, Card, CardHeader, CardBody, Form,
  FormGroup, Input, InputGroup, InputGroupAddon, InputGroupButtonDropdown, InputGroupText} from 'reactstrap';
import { rgbToHex } from '@coreui/coreui/dist/js/coreui-utilities'

class ThemeView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bgColor: 'rgb(255, 255, 255)'
    }
  }

  componentDidMount () {
    const elem = ReactDOM.findDOMNode(this).parentNode.firstChild
    const color = window.getComputedStyle(elem).getPropertyValue('background-color')
    this.setState({
      bgColor: color || this.state.bgColor
    })
  }

  render() {

    return (
      <table className="w-100">
        <tbody>
        <tr>
          <td className="text-muted">HEX:</td>
          <td className="font-weight-bold">{ rgbToHex(this.state.bgColor) }</td>
        </tr>
        <tr>
          <td className="text-muted">RGB:</td>
          <td className="font-weight-bold">{ this.state.bgColor }</td>
        </tr>
        </tbody>
      </table>
    )
  }
}

class StreamPlayer extends React.Component {
  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };
 
    return (
      <YouTube
        videoId={this.props.videoId}
        opts={opts}
        onReady={this._onReady}
      />
    );
  }
 
  _onReady(event) {
    // access to player in all event handlers via event.target
    //event.target.pauseVideo();
  }
}

class Tabs extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: new Array(4).fill('1'),
    };
  }

  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice()
    newArray[tabPane] = tab
    this.setState({
      activeTab: newArray,
    });
  }

  tabPane() {
    return (
      <>
        <TabPane tabId="1">
          <Iframe src="https://www.youtube.com/live_chat?v=hHW1oY26kxQ&amp;embed_domain=polytubeio.herokuapp.com"/>
        </TabPane>
        <TabPane tabId="2">
          <Iframe src="https://www.youtube.com/live_chat?v=sPeGGyAfVo0&amp;embed_domain=polytubeio.herokuapp.com"/>
        </TabPane>
      </>
    );
  }

  render() {
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              active={this.state.activeTab[0] === '1'}
              onClick={() => { this.toggle(0, '1'); }}
            >
              Chat 1
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={this.state.activeTab[0] === '2'}
              onClick={() => { this.toggle(0, '2'); }}
            >
              Chat 2
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab[0]}>
          {this.tabPane()}
        </TabContent>
      </div>
    );
  }
}


class ThemeColor extends Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {

    // const { className, children, ...attributes } = this.props
    const { className, children } = this.props

    const classes = classNames(className, 'theme-color w-75 rounded mb-3')

    return (
      <Col xl="2" md="4" sm="6" xs="12" className="mb-4">
        <div className={classes} style={{paddingTop: '75%'}}></div>
        {children}
        <ThemeView/>
      </Col>
    )
  }
}

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videoId1: "abcdefg",
    };
  }

  toggleShow = () => {
    this.setState(state => ({ videoId1: "changed" }));
    console.log("Changed videoId");
  };
  render() {
    return (
      <Card>
        <CardHeader>
          Example Form
        </CardHeader>
        <CardBody>
          <Form action="" method="post">
            <FormGroup>
              <InputGroup>
                <Input type="text" id="username2" name="username2" placeholder="Username" autoComplete="name"/>
                <InputGroupAddon addonType="append">
                  <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup>
                <Input type="email" id="email2" name="email2" placeholder="Email" autoComplete="username"/>
                <InputGroupAddon addonType="append">
                  <InputGroupText><i className="fa fa-envelope"></i></InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup>
                <Input type="password" id="password2" name="password2" placeholder="Password" autoComplete="current-password"/>
                <InputGroupAddon addonType="append">
                  <InputGroupText><i className="fa fa-asterisk"></i></InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
            <FormGroup className="form-actions">
              <Button type="submit" onClick={this.toggleShow} size="sm" color="secondary">Submit</Button>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    )
  }
}

            

class Stream extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <StreamPlayer videoId="hHW1oY26kxQ"/>
            <StreamPlayer videoId="sPeGGyAfVo0"/>
          </Col>
          <Col>
            <Search/>
            <Tabs/>
          </Col>
        </Row>
        <div className="card">
          <div className="card-header">
            <i className="icon-drop"></i> Theme colors
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <i className="icon-drop"></i> Grays
          </div>
          <div className="card-body">
            <Row className="mb-3">
              <ThemeColor className="bg-gray-100">
                <h6>Gray 100 Color</h6>
              </ThemeColor>
              <ThemeColor className="bg-gray-200">
                <h6>Gray 200 Color</h6>
              </ThemeColor>
              <ThemeColor className="bg-gray-300">
                <h6>Gray 300 Color</h6>
              </ThemeColor>
              <ThemeColor className="bg-gray-400">
                <h6>Gray 400 Color</h6>
              </ThemeColor>
              <ThemeColor className="bg-gray-500">
                <h6>Gray 500 Color</h6>
              </ThemeColor>
              <ThemeColor className="bg-gray-600">
                <h6>Gray 600 Color</h6>
              </ThemeColor>
              <ThemeColor className="bg-gray-700">
                <h6>Gray 700 Color</h6>
              </ThemeColor>
              <ThemeColor className="bg-gray-800">
                <h6>Gray 800 Color</h6>
              </ThemeColor>
              <ThemeColor className="bg-gray-900">
                <h6>Gray 900 Color</h6>
              </ThemeColor>
            </Row>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <i className="icon-drop"></i> Additional colors
          </div>
          <div className="card-body">
            <Row>
              <ThemeColor className="bg-blue">
                <h6>Blue Color</h6>
              </ThemeColor>
              <ThemeColor className="bg-light-blue">
                <h6>Light Blue Color</h6>
              </ThemeColor>
              <ThemeColor className="bg-indigo">
                <h6>Indigo Color</h6>
              </ThemeColor>
              <ThemeColor className="bg-purple">
                <h6>Purple Color</h6>
              </ThemeColor>
              <ThemeColor className="bg-pink">
                <h6>Pink Color</h6>
              </ThemeColor>
              <ThemeColor className="bg-red">
                <h6>Red Color</h6>
              </ThemeColor>
              <ThemeColor className="bg-orange">
                <h6>Orange Color</h6>
              </ThemeColor>
              <ThemeColor className="bg-yellow">
                <h6>Yellow Color</h6>
              </ThemeColor>
              <ThemeColor className="bg-green">
                <h6>Green Color</h6>
              </ThemeColor>
              <ThemeColor className="bg-teal">
                <h6>Teal Color</h6>
              </ThemeColor>
              <ThemeColor className="bg-cyan">
                <h6>Cyan Color</h6>
              </ThemeColor>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default Stream;
