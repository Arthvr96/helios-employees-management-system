import React from 'react';
import PropTypes from 'prop-types';
import { ErrorMsg } from 'components/atoms/ErrorMsg/ErrorMsg';
import { Wrapper } from './LabelError.style';

const LabelError = ({
  errors = '',
  touched = false,
  labelName,
  flexDirection,
  margin = '0 0 0 2rem',
}) => {
  return (
    <Wrapper flexDirection={flexDirection} margin={margin}>
      {labelName}
      {errors && touched ? <ErrorMsg>{errors}</ErrorMsg> : null}
    </Wrapper>
  );
};

export default LabelError;

LabelError.propTypes = {
  margin: PropTypes.string,
  flexDirection: PropTypes.string,
  errors: PropTypes.string,
  touched: PropTypes.bool,
  labelName: PropTypes.string.isRequired,
};
