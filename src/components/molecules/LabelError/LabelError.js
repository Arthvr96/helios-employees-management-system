import React from 'react';
import PropTypes from 'prop-types';
import { ErrorMsg } from 'components/atoms/ErrorMsg/ErrorMsg';
import { Wrapper } from './LabelError.style';

const LabelError = ({ errors = '', touched = false, labelName }) => {
  return (
    <Wrapper>
      {labelName}
      {errors && touched ? <ErrorMsg>{errors}</ErrorMsg> : null}
    </Wrapper>
  );
};

export default LabelError;

LabelError.propTypes = {
  errors: PropTypes.string,
  touched: PropTypes.bool,
  labelName: PropTypes.string.isRequired,
};
