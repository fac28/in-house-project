import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
// import "./styles.css";
import { useKeenSlider, KeenSliderPlugin } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import './style.css';

const AdaptiveHeight: KeenSliderPlugin = (slider) => {
  function updateHeight() {
    slider.container.style.height =
      slider.slides[slider.track.details.rel].offsetHeight + 'px';
  }
  slider.on('created', updateHeight);
  slider.on('slideChanged', updateHeight);
};

export default function AvatarSlider() {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      slideChanged(s) {
        setCurrentSlide(s.track.details.rel);
      },
      created() {
        setLoaded(true);
      },
    },
    [AdaptiveHeight]
  );

  return (
    <>
      <div className="navigation-wrapper">
        <div ref={sliderRef} className="keen-slider">
          <div className="keen-slider__slide number-slide1">
            <FontAwesomeIcon
              icon={faUser}
              style={{ color: '#37c8be' }}
              width={55}
              height={55}
            />
          </div>
          <div
            className="keen-slider__slide number-slide2"
            style={{ height: 50 }}
          >
            <FontAwesomeIcon
              icon={faUser}
              style={{ color: '#4d81db' }}
              width={55}
              height={55}
            />
          </div>
          <div
            className="keen-slider__slide number-slide3"
            style={{ height: 50 }}
          >
            <FontAwesomeIcon
              icon={faUser}
              style={{ color: '#4d81db' }}
              width={55}
              height={55}
            />
          </div>
          <div className="keen-slider__slide number-slide4">
            {' '}
            <FontAwesomeIcon
              icon={faUser}
              style={{ color: '#FF6C22' }}
              width={55}
              height={55}
            />
          </div>
          <div
            className="keen-slider__slide number-slide5"
            style={{ height: 50 }}
          >
            <FontAwesomeIcon
              icon={faUser}
              style={{ color: '#FFC436' }}
              width={55}
              height={55}
            />
          </div>
          <div
            className="keen-slider__slide number-slide6"
            style={{ height: 50 }}
          >
            <FontAwesomeIcon
              icon={faUser}
              style={{ color: '#4d81db' }}
              width={55}
              height={55}
            />
          </div>
        </div>
        {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            />

            <Arrow
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
              }
            />
          </>
        )}
      </div>
      {loaded && instanceRef.current && (
        <div className="dots">
          {[
            ...Array(instanceRef.current.track.details.slides.length).keys(),
          ].map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx);
                }}
                className={'dot' + (currentSlide === idx ? ' active' : '')}
              ></button>
            );
          })}
        </div>
      )}
    </>
  );
}

function Arrow(props: {
  disabled: boolean;
  left?: boolean;
  onClick: (e: any) => void;
}) {
  const disabled = props.disabled ? ' arrow--disabled' : '';
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${
        props.left ? 'arrow--left' : 'arrow--right'
      } ${disabled}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      // style={{ height: '500px' }}
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  );
}
