import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const ProgressBar = props => {
  return (
    <ProgressBarEl {...props}>
      <div />
    </ProgressBarEl>
  );
};

const ProgressBarEl = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid #e1e1e1;
  border-radius: 10px;
  display: flex;
  align-items: center;

  div {
    width: ${({ percentage }) => `${percentage}%`};
    height: 100%;
    background: #56e2c4;
    border: 2px solid white;
    border-radius: 10px;
    box-sizing: border-box;
  }
`;

ProgressBar.propTypes = {
  percentage: PropTypes.string.isRequired
};

export { ProgressBar };
