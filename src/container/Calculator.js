import React, { Component } from "react";
import classes from "./Calculator.module.css";

class Calculator extends Component {
  state = {
    add: false,
    minus: false,
    multiply: false,
    divide: false,
    showResult: false,
    subtotal: 0,
    result: [],
    inserts: [],
    showentotal: 0,
  };

  testRes = (e) => {
    let resultCopy = [...this.state.result];
    resultCopy.push(e.target.value);

    this.setState({
      result: resultCopy,
    });
  };

  delete = () => {
    let resultCopy = [...this.state.result];
    resultCopy.pop();
    this.setState(() => ({
      result: resultCopy,
    }));
  };

  showResult = () => {
    this.setState(() => ({
      showResults: true,
    }));
    this.showResults();
  };
  add = () => {
    this.setState(() => ({
      add: true,
      minus: false,
      multiply: false,
      divide: false,
    }));
    this.pointer();
  };
  minus = () => {
    this.setState(() => ({
      minus: true,
      add: false,
      multiply: false,
      divide: false,
    }));

    this.pointer();
  };
  multiply = () => {
    this.setState(() => ({
      multiply: true,
      add: false,
      minus: false,
      divide: false,
    }));
    this.pointer();
  };
  divide = () => {
    this.setState(() => ({
      divide: true,
      add: false,
      minus: false,
      multiply: false,
    }));
    this.pointer();
  };

  pointer = () => {
    let subtotalCopy = this.state.subtotal;
    let insertsCopy = [...this.state.inserts];

    if (this.state.result.length > 0) {
      this.showResults();
    } else if (
      this.state.result.length < 1 &&
      !this.state.add &&
      !this.state.minus &&
      !this.state.multiply &&
      !this.state.divide
    ) {
      insertsCopy.push(subtotalCopy);
      this.setState(() => ({
        inserts: insertsCopy,
        subtotal: 0,
      }));
    }
  };

  showResults = () => {
    let insertsCopy = [...this.state.inserts];
    let resultCopy = [...this.state.result];
    let resultReduced = 0;
    resultReduced = resultCopy.reduce((total, sum) => total + sum);
    insertsCopy.push(parseFloat(resultReduced));
    let subtotalCopy = parseFloat(resultReduced);

    this.setState(() => ({
      inserts: insertsCopy,
    }));
    if (this.state.add) {
      subtotalCopy = insertsCopy.reduce(
        (total, sum) => parseFloat(total) + parseFloat(sum)
      );
    } else if (this.state.minus) {
      subtotalCopy = insertsCopy.reduce(
        (total, sum) => parseFloat(total) - parseFloat(sum)
      );
    } else if (this.state.multiply) {
      subtotalCopy = insertsCopy.reduce(
        (total, sum) => parseFloat(total) * parseFloat(sum)
      );
    } else if (this.state.divide) {
      subtotalCopy = insertsCopy.reduce(
        (total, sum) => parseFloat(total) / parseFloat(sum)
      );
    }

    if (!this.state.showResults) {
      this.setState(
        () => ({
          subtotal: subtotalCopy,
          showentotal: subtotalCopy,
          inserts: [subtotalCopy],
          result: [],
        }),
        () => console.log("im here", this.state.inserts)
      );
    } else if (this.state.showResults) {
      this.setState(() => ({
        add: false,
        minus: false,
        multiply: false,
        divide: false,
        subtotal: subtotalCopy,
        showentotal: subtotalCopy,
        result: [],
        inserts: [],
        showResults: false,
      }));
    }
  };

  reset = () => {
    this.setState(() => ({
      add: false,
      minus: false,
      multiply: false,
      divide: false,

      subtotal: 0,
      result: [],
      inserts: [],
      showentotal: [],
    }));
  };

  render() {
    return (
      <div className={classes.container}>
        <div>
          <h1 className={classes.title}>Nour Midan</h1>
        </div>
        <div className={classes.results}>{this.state.result}</div>
        <div className={classes.results}>{this.state.showentotal}</div>
        <div className={classes.btns}>
          <table>
            <tbody>
              <tr>
                <td>
                  <button onClick={this.reset}>AC</button>
                </td>
                <td>
                  <button
                    onClick={this.delete}
                    disabled={this.state.result.length < 1}
                  >
                    CE
                  </button>
                </td>
                <td>
                  <button onClick={this.divide}>&#xf7;</button>
                </td>
                <td>
                  <button onClick={this.multiply}>&#215;</button>
                </td>
              </tr>
              <tr>
                <td>
                  <button onClick={this.testRes} value="7">
                    7
                  </button>
                </td>
                <td>
                  <button onClick={this.testRes} value="8">
                    8
                  </button>
                </td>
                <td>
                  <button onClick={this.testRes} value="9">
                    9
                  </button>
                </td>
                <td>
                  <button onClick={this.minus}>&#8722;</button>
                </td>
              </tr>
              <tr>
                <td>
                  <button onClick={this.testRes} value="4">
                    4
                  </button>
                </td>
                <td>
                  <button onClick={this.testRes} value="5">
                    5
                  </button>
                </td>
                <td>
                  <button onClick={this.testRes} value="6">
                    6
                  </button>
                </td>
                <td>
                  <button onClick={this.add}>&#43;</button>
                </td>
              </tr>
              <tr>
                <td>
                  <button onClick={this.testRes} value="1">
                    1
                  </button>
                </td>
                <td>
                  <button onClick={this.testRes} value="2">
                    2
                  </button>
                </td>
                <td>
                  <button onClick={this.testRes} value="3">
                    3
                  </button>
                </td>
                <td rowSpan="2">
                  <button
                    onClick={this.showResult}
                    disabled={this.state.result.length < 1}
                    className={classes.equalBtn}
                  >
                    &#61;
                  </button>
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <button
                    onClick={this.testRes}
                    className={classes.dotBtn}
                    value="0"
                  >
                    0
                  </button>
                </td>
                <td>
                  <button
                    disabled={
                      this.state.result.length < 1 ||
                      this.state.result.includes(".")
                    }
                    onClick={this.testRes}
                    value="."
                  >
                    .
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Calculator;
