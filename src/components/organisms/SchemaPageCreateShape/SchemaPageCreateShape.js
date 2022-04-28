import React from 'react';
import { Formik } from 'formik';
import { CardTitle } from 'components/atoms/CardTitle/CardTitle';
import { InputForm } from 'components/atoms/InputForm/InputForm';
import { Button } from 'components/atoms/Button/Button';
import * as Yup from 'yup';
import LabelError from 'components/molecules/LabelError/LabelError';
import { useSchemaCreatorContext } from 'providers/SchemaCreatorProvider/SchemaCreatorProvider';
import { Wrapper, StyledField } from './SchemaPageCreateShape.style';

const SchemaPageCreateShape = () => {
  const { handleInitSchemaCreator, schemaShapesList, schemaShapesData } = useSchemaCreatorContext();

  const onSubmit = ({ shapeName, selectShape }) => {
    if (selectShape && selectShape === 'default') {
      handleInitSchemaCreator(shapeName);
    } else if (selectShape && selectShape !== 'default') {
      if (schemaShapesData) {
        const obj = schemaShapesData.find((el) => el.id === selectShape);
        handleInitSchemaCreator(shapeName, obj.schema);
      }
    }
  };

  const validationSchema = Yup.object().shape({
    shapeName: Yup.string().required('To pole jest wymagane'),
    selectShape: Yup.string().required('To pole jest wymagane'),
  });

  return (
    <Formik
      initialValues={{ shapeName: '', selectShape: 'init' }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit }) => {
        return (
          <Wrapper onSubmit={handleSubmit}>
            <CardTitle margin="0 0 2rem 0" fontSize="m">
              Tworzenie szablonu
            </CardTitle>
            <label htmlFor="shapeName">
              <LabelError
                labelName="Nazwa szablonu:"
                touched={touched.shapeName}
                errors={errors.shapeName}
                flexDirection="column"
                margin="0 0 0.5rem 0"
              />
              <InputForm
                id="shapeName"
                name="shapeName"
                type="text"
                placeholder="Podaj nazwe"
                margin="0 0 1.5rem 0"
                width="100%"
                value={values.shapeName}
                onChange={handleChange}
                onBlur={handleBlur}
                isError={errors.shapeName && touched.shapeName}
              />
            </label>
            <label htmlFor="selectShape">
              <LabelError
                labelName="Stworz na podstawie:"
                touched={touched.selectShape}
                errors={errors.selectShape}
                flexDirection="column"
                margin="0 0 0.5rem 0"
              />
              <StyledField
                id="selectShape"
                name="selectShape"
                as="select"
                width="100%"
                value={values.selectShape}
                onChange={handleChange}
                onBlur={handleBlur}
                isError={errors.selectShape && touched.selectShape}
              >
                <option disabled value="init">
                  Wybierz coś
                </option>
                <option value="default">Od zera</option>
                {schemaShapesList.map((shape) => (
                  <option key={shape.id} value={shape.id}>
                    {shape.name}
                  </option>
                ))}
              </StyledField>
            </label>
            <Button
              disabled={values.selectShape === 'init' || schemaShapesList.length >= 10}
              width="100%"
              margin="2rem 0 0 0"
              type="submit"
            >
              {schemaShapesList.length < 10 ? 'Stworz nowy szablon' : 'Max ilość szablonów to 10'}
            </Button>
          </Wrapper>
        );
      }}
    </Formik>
  );
};

export default SchemaPageCreateShape;
