import React from 'react';
import { InputForm } from 'components/atoms/InputForm/InputForm';
import { Button } from 'components/atoms/Button/Button';
import PropTypes from 'prop-types';
import LabelError from 'components/molecules/LabelError/LabelError';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { NewShiftWrapper, ButtonsWrapper } from './NewShiftForm.style';

const convertTime = (x) => {
  const p = (s) => parseInt(s, 10);
  const c = (t) => (t >= 0 && t < 8 ? t + 24 : t);
  const r = (m) => (p(m) < 53 ? (Math.round(p(m) / 15) * 15) % 60 : 45);
  const [h, m] = x.split(':');
  return c(p(h) + r(m) / 60);
};

const NewShiftForm = ({ handleCancel, handleSave }) => {
  const onSubmit = ({ from, to }) => {
    handleSave({ from: convertTime(from), to: convertTime(to) });
    handleCancel();
  };

  const validationSchema = Yup.object().shape({
    from: Yup.string()
      .required('To pole jest wymagane')
      .test('is-bigger', 'Start zmiany < Koniec zmiany', (value, context) => {
        if (value && context.parent.to) {
          return convertTime(value) < convertTime(context.parent.to);
        }
        return true;
      }),
    to: Yup.string().required('To pole jest wymagane'),
  });
  return (
    <Formik
      initialValues={{ from: '', to: '' }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit }) => {
        return (
          <NewShiftWrapper onSubmit={handleSubmit}>
            <label htmlFor="from">
              <LabelError
                labelName="Rozpoczecie zmiany:"
                touched={touched.from}
                errors={errors.from}
                flexDirection="column"
                margin="0 0 0.5rem 0"
              />
              <InputForm
                id="from"
                name="from"
                type="time"
                margin="0.5rem 0 1rem 0"
                value={values.from}
                onChange={handleChange}
                onBlur={handleBlur}
                isError={errors.from && touched.from}
              />
            </label>
            <label htmlFor="to">
              <LabelError
                labelName="Zakonczenie zmiany"
                touched={touched.to}
                errors={errors.to}
                flexDirection="column"
                margin="0 0 0.5rem 0"
              />
              <InputForm
                id="to"
                name="to"
                type="time"
                margin="0.5rem 0 0 0"
                value={values.to}
                onChange={handleChange}
                onBlur={handleBlur}
                isError={errors.to && touched.to}
              />
            </label>
            <ButtonsWrapper>
              <Button onClick={handleCancel} margin="0 1rem 0 0" isCancel type="button">
                Anuluj
              </Button>
              <Button type="submit">Zapisz</Button>
            </ButtonsWrapper>
          </NewShiftWrapper>
        );
      }}
    </Formik>
  );
};

export default NewShiftForm;

NewShiftForm.propTypes = {
  handleCancel: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
};
