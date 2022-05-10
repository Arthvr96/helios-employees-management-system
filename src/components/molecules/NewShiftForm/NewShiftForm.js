import React from 'react';
import { InputForm } from 'components/atoms/InputForm/InputForm';
import { Button } from 'components/atoms/Button/Button';
import PropTypes from 'prop-types';
import LabelError from 'components/molecules/LabelError/LabelError';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSchemaCreatorContext } from 'providers/SchemaCreatorProvider/SchemaCreatorProvider';
import { NewShiftWrapper, ButtonsWrapper, StyledLabel } from './NewShiftForm.style';

const convertTime = (x) => {
  const p = (s) => parseInt(s, 10);
  const c = (t) => (t >= 0 && t < 8 ? t + 24 : t);
  const r = (m) => (p(m) < 53 ? (Math.round(p(m) / 15) * 15) % 60 : 45);
  const [h, m] = x.split(':');
  return c(p(h) + r(m) / 60);
};

const NewShiftForm = ({ handleCancel, handleSave, initValues }) => {
  const { selectedWorkplace } = useSchemaCreatorContext();
  const onSubmit = ({ from, to, marathon, night }) => {
    handleSave({
      from: convertTime(from),
      to: convertTime(to),
      marathon: !!marathon,
      night: !!night,
    });
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
      initialValues={initValues || { from: '', to: '', marathon: false, night: false }}
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
                margin="0.5rem 0 1rem 0"
                value={values.to}
                onChange={handleChange}
                onBlur={handleBlur}
                isError={errors.to && touched.to}
              />
            </label>
            {selectedWorkplace.id === 'obs1' || selectedWorkplace.id === 'obs2' ? (
              <StyledLabel htmlFor="night" margin="1rem">
                <InputForm
                  id="night"
                  name="night"
                  type="checkbox"
                  margin="0"
                  checked={values.night}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isError={errors.night && touched.night}
                  disabled={values.marathon}
                />
                <LabelError
                  labelName="Zamkniecie?"
                  touched={touched.night}
                  errors={errors.night}
                  flexDirection="row"
                  margin="0 0 0.5rem 0"
                />
              </StyledLabel>
            ) : null}

            <StyledLabel htmlFor="marathon">
              <InputForm
                id="marathon"
                name="marathon"
                type="checkbox"
                margin="0"
                checked={values.marathon}
                onChange={handleChange}
                onBlur={handleBlur}
                isError={errors.marathon && touched.marathon}
                disabled={values.night}
              />
              <LabelError
                labelName="Maraton?"
                touched={touched.marathon}
                errors={errors.marathon}
                flexDirection="row"
                margin="0 0 0.5rem 0"
              />
            </StyledLabel>
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
  initValues: PropTypes.shape({
    from: PropTypes.string,
    to: PropTypes.string,
  }),
  handleCancel: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
};
