import React, { Component } from "react";
import { Form, Container, Col, Row, Button } from "react-bootstrap";
import axios from "axios";

const postEndpoint = "/add_transaction";
const getEndpoint = "/get_chain";
class Send extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Engineno: "",
      Owner: "",
      Name: "",
      Type: "",
      time: "",
      sender: "",
    };
    this.handleEngineno = this.handleEngineno.bind(this);
    this.handleOwner = this.handleOwner.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleType = this.handleType.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEngineno(event) {
    this.setState({ Engineno: event.target.value });
  }
  handleOwner(event) {
    this.setState({ Owner: event.target.value });
  }
  handleName(event) {
    this.setState({ Name: event.target.value });
  }
  handleType(event) {
    this.setState({ Type: event.target.value });
  }
  componentDidMount() {
    axios.get(getEndpoint).then((res) => {
      const sender = res.data.chain[1].transactions[0].Owner;
      this.setState({ sender });
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    axios
      .post(postEndpoint, {
        Engineno: this.state.Engineno,
        Owner: this.state.Owner,
        Name: this.state.Name,
        Type: this.state.Type,
        time: this.state.time,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
  }

  render() {
    return (
      <Container id="c" style={{ background: "#007bff", color: "white" }}>
        <br />
        <h3>
          <b>Engine Registration System</b>
        </h3>
        <h4>
          <b style={{ color: "darkblue" }}>Register the Engine Owned</b>{" "}
        </h4>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Engine Number
            </Form.Label>
            <Col sm="8">
              <Form.Control
                onChange={this.handleEngineno}
                value={this.state.Engineno}
                placeholder="Enter Engine Number"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Vehicle Owner
            </Form.Label>
            <Col sm="8">
              <Form.Control
                onChange={this.handleOwner}
                value={this.state.Owner}
                placeholder="Enter Vehicle Owner"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Vehicle Name
            </Form.Label>
            <Col sm="8">
              <Form.Control
                onChange={this.handleName}
                value={this.state.Name}
                placeholder="Enter Vehicle Name"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Vehicle Type
            </Form.Label>
            <Col sm="8">
              <Form.Control
                onChange={this.handleType}
                value={this.state.Type}
                placeholder="Enter Vehicle Type"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Col sm="5">
              <Button
                variant="primary"
                type="submit"
                style={{ background: "darkblue" }}
              >
                Send
              </Button>
            </Col>
          </Form.Group>
        </Form>
        <br />
        <br />
      </Container>
    );
  }
}

export default Send;
