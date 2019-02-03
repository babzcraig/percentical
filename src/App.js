import React, { Component } from "react";
import styled from "styled-components";

import getYearInfo from "./utils/getYearInfo";

import { Row, ProgressBar } from "./components";

class App extends Component {
  componentDidMount() {
    // we can set the interval here.
  }

  getPositional = number => {
    let suffix = "th";
    if (Number(number) === 1) suffix = "st";
    if (Number(number) === 2) suffix = "nd";
    if (Number(number) === 3) suffix = "rd";

    return `${number}${suffix}`;
  };

  render() {
    const {
      date,
      month,
      year,
      totalDaysInYear,
      daysGoneBy,
      percentageOfYearCompleted,
      percentageOfYearCompletedToString
    } = getYearInfo();

    return (
      <AppEl>
        <div>
          <Row>
            <p>
              {this.getPositional(date)} of {month}, {year}
            </p>
          </Row>
          <Row>
            <p>
              {daysGoneBy} days of {totalDaysInYear} gone
            </p>
          </Row>
          <Row>
            <ProgressBar percentage={percentageOfYearCompleted} />
          </Row>
          <Row>
            <p>{percentageOfYearCompletedToString}</p>
          </Row>
        </div>
      </AppEl>
    );
  }
}

const AppEl = styled.div``;

export default App;
