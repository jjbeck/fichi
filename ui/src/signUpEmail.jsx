import React from 'react';
import { Button, Form, FormGroup, FormControl, Row, Col } from 'react-bootstrap';

export default class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: false,
      email: '',
    };
    this.enterEmail = this.enterEmail.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
  }

  enterEmail() {
      console.log('email entered');
  }

  updateEmail(e) {
      this.setState({ email: e.target.value })
      console.log(this.state);
  }

  render() {
      const { email } = this.state;
      return (
        <Row>
          <Col md={2}>
            <Form>
              <FormGroup controlId="basicEmail">
                <FormControl type="email" value={email} onChange={this.updateEmail} placeholder="Enter Email" />
              </FormGroup>
            </Form>
          </Col>
          <Col md={2}>
            <Button variant="primary" type="submit" onClick={this.enterEmail}>
              Submit
            </Button>
          </Col>
        </Row>
      )
  }
}
