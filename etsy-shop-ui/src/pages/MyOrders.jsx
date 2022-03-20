import { Component } from "react";
import { Helmet } from "react-helmet-async";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";

import axios from "axios";

class MyOrders extends Component {
  constructor() {
    super();
    this.state = {
      orders: [],
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:3001/orders/" + localStorage.getItem("email"))
      .then((response) => {
        //update the state with the response data
        this.setState({
          orders: response.data,
        });
      });
  }

  render() {
    return this.state.orders.length === 0 ? (
      <Alert variant="success">
        <Alert.Heading>You haven't purchased anything yet</Alert.Heading>
        <Link to="/">Go Shopping</Link>
      </Alert>
    ) : (
      <div>
        <Helmet>
          <title>Your Purchases</title>
        </Helmet>
        <h1>Your Purchases</h1>
        <Row>
          <Col md={12}>
            <ListGroup>
              <ListGroupItem>
                <Row>
                  <Col md={4}>
                    <h5>Product</h5>
                  </Col>
                  <Col md={2}>
                    <h5>Shop Name</h5>
                  </Col>
                  <Col md={2}>
                    <h5>Quantity</h5>
                  </Col>
                  <Col md={2}>
                    <h5>Total Price</h5>
                  </Col>
                  <Col md={2}>
                    <h5>Date Of Purchase</h5>
                  </Col>
                </Row>
              </ListGroupItem>

              {this.state.orders.map((order) => (
                <ListGroup.Item key={order.id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={order.image}
                        alt={order.name}
                        className="img-fluid rounded img-thumbnail"
                        style={{ width: "70px", height: "70px" }}
                      ></img>{" "}
                      <span>{order.name}</span>{" "}
                    </Col>
                    <Col md={2}>
                      <span>{order.shopname}</span>{" "}
                    </Col>
                    <Col md={2}>
                      <span>{order.quantity}</span>{" "}
                    </Col>
                    <Col md={2}>
                      <span>
                        {order.currency} {order.price}
                      </span>{" "}
                    </Col>
                    <Col md={2}>
                      <span>{order.dateofpurchase}</span>{" "}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </div>
    );
  }
}

export default MyOrders;