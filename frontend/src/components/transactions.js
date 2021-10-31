import React, { Component } from "react";
import { Container, Table } from "react-bootstrap";
import axios from "axios";

const endpoint = "/get_chain";
class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
    };
  }
  componentDidMount() {
    axios.get(endpoint).then((res) => {
      const transactions = res.data.chain;
      this.setState({ transactions });
    });
  }
  render() {
    return (
      <Container style={{ background: "lightgreen" }}>
        <h3>
          <b> Transactions </b>
        </h3>
        <p>(Sync to get the latest transactions in the blockchain)</p>
        <Table responsive>
          <thead>
            <tr>
              <th>Engine Number</th>
              <th>Vehicle Owner</th>
              <th>Vehicle Name</th>
              <th>Vehicle Type</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {this.state.transactions
              .slice(0)
              .reverse()
              .map((transaction) =>
                transaction.transactions.map((t) => (
                  <tr key={t}>
                    <td>
                      <b style={{ color: "darkblue" }}>{t.Engineno}</b>
                    </td>
                    <td>
                      <b style={{ color: "darkblue" }}>{t.Owner}</b>
                    </td>
                    <td>
                      <b style={{ color: "darkblue" }}>{t.Name} </b>
                    </td>
                    <td>
                      <b style={{ color: "darkblue" }}>{t.Type} </b>
                    </td>
                    <td>
                      <b style={{ color: "darkblue" }}>{t.time}</b>
                    </td>
                  </tr>
                ))
              )}
          </tbody>
        </Table>
      </Container>
    );
  }
}

export default Transactions;
