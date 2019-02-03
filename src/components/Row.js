import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Row = ({ children }) => <RowEl>{children}</RowEl>;

const RowEl = styled.div`
  height: 36px;
  box-sizing: border-box;
  border-bottom: 1px solid #ececec;
  padding: 8px 24px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:first-child {
    border-top: 1px solid #ececec;
  }

  &:nth-child(even) {
    background: #f5f5f5;
  }

  p {
    margin: 0;
    padding: 0;
    font-size: 11px;
    font-weight: bold;
    color: #495572;
  }
`;

Row.propTypes = {
  children: PropTypes.children
};

export { Row };
