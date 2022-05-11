import React, { useEffect, useRef, useState } from 'react';
import ShiftItem from 'components/molecules/ShiftItem/ShiftItem';
import { ReactComponent as Arrow } from 'assets/arrowWhite.svg';
import { useSchemaCreatorContext } from 'providers/SchemaCreatorProvider/SchemaCreatorProvider';
import HeliosAppSdk from 'HeliosAppSdk/HeliosAppSdk';
import PropTypes from 'prop-types';
import {
  Slider,
  ShiftsSliderContent,
  SliderButtonLeft,
  SliderButtonRight,
} from './ShiftsSlider.style';

const ShiftsSlider = ({ onEdit }) => {
  const { getDisplayTime } = HeliosAppSdk.__helpers__;
  const { selectedDay, selectedWorkplace, schemaData, handleUpdateSchemaDate } =
    useSchemaCreatorContext();
  const { shifts } = schemaData[selectedDay.id][selectedWorkplace.id];

  const [moveBy, setMoveBy] = useState(0);
  const sliderRef = useRef(null);

  const handleDelete = (id) => {
    handleUpdateSchemaDate('onDelete', { id });
  };

  const handleMove = (direction) => {
    const { width } = sliderRef.current.getBoundingClientRect();

    if (width > 800 && direction > 0) {
      if (moveBy + 300 >= 50 || moveBy + 300 >= 0) {
        setMoveBy(0);
      } else {
        setMoveBy(moveBy + 300);
      }
    }
    if (width > 800 && direction < 0) {
      if (moveBy - 300 < -width + 500) {
        setMoveBy(-width + 500 + 5);
      } else {
        setMoveBy(moveBy - 300);
      }
    }
  };

  useEffect(() => {
    setMoveBy(0);
  }, [shifts]);

  return (
    <Slider>
      <SliderButtonLeft onClick={() => handleMove(1)}>
        <Arrow />
      </SliderButtonLeft>
      <SliderButtonRight onClick={() => handleMove(-1)}>
        <Arrow />
      </SliderButtonRight>
      <ShiftsSliderContent ref={sliderRef} moveBy={moveBy}>
        {shifts.map((shift, i) => (
          <ShiftItem
            key={shift.id}
            isMarathon={shift.marathon}
            isNight={shift.night}
            name={`Zmiana nr${i + 1}`}
            time={`${getDisplayTime(shift.from)}-${getDisplayTime(shift.to)}`}
            onDelete={() => handleDelete(shift.id)}
            onEdit={() => onEdit(shift.id)}
          />
        ))}
      </ShiftsSliderContent>
    </Slider>
  );
};

export default ShiftsSlider;

ShiftsSlider.propTypes = {
  onEdit: PropTypes.func.isRequired,
};
