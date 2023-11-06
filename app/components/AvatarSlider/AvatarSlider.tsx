import React, { useState } from 'react';
import './styles.css';
import { useKeenSlider, KeenSliderPlugin } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import Image from 'next/image';
import avatars from '../../../public/images/avatars/images';

interface AppProps {
  setCurrentAvatar: (avatar: any) => void;
}
// const avatarsData: { [key: string]: any } = avatars;

export default function App({ setCurrentAvatar }: AppProps) {
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
    }
    // [AdaptiveHeight]
  );

  return (
    <>
      {console.log(avatars)}
      <div className="navigation-wrapper">
        <div ref={sliderRef} className="keen-slider">
          {Object.values(avatars).map((avatar, index) => (
            <div key={index} className="keen-slider__slide number-slide">
              <Image
                className="rounded-full"
                src={avatar}
                width={150}
                height={150}
                alt={avatar}
                priority={true}
              />
            </div>
          ))}
        </div>
        {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={(e: any) => {
                console.log(currentSlide);
                e.stopPropagation() || instanceRef.current?.prev();
              }}
              disabled={currentSlide === 0}
            />

            <Arrow
              onClick={(e: any) => {
                console.log(currentSlide);
                e.stopPropagation() || instanceRef.current?.next();
                setCurrentAvatar(avatars[currentSlide]);
              }}
              disabled={
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
              }
            />
          </>
        )}
      </div>
    </>
  );
}

function Arrow(props: {
  disabled: boolean;
  left?: boolean;
  onClick: (e: any) => void;
}) {
  const disabeld = props.disabled ? ' arrow--disabled' : '';
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${
        props.left ? 'arrow--left' : 'arrow--right'
      } ${disabeld}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
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