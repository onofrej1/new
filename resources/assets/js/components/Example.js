import React, { Component } from "react";
import ReactDOM from "react-dom";

class Test extends Component {
  render() {
    return <div>test - {this.props.meno} </div>;
  }
}

export default class Example extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <div className="panel panel-default">
              <div className="panel-heading">Example Component </div>
              <div className="panel-body">
                I m an example component!eee rr uu tt <Test meno="erik" />
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>
    );
  }
}

if (document.getElementById("example")) {
  ReactDOM.render(<Example />, document.getElementById("example"));
}
