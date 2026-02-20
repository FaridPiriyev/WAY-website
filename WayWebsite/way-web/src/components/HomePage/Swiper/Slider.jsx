// Slider.jsx
"use client";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { forwardRef, useImperativeHandle, useState } from "react";
import Card1 from "../SliderComponents/Card1";
import Card2 from "../SliderComponents/QerbiAzerbaycanCard";
import Card3 from "../SliderComponents/YasilHedefCard";
import Card4 from "../SliderComponents/PhytonTrainingCard";
import Card5 from "../SliderComponents/AI4CultureCard";
import Card6 from "../SliderComponents/PesekarlardanOyren";

const Slider = forwardRef((props, ref) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 5;

  const [sliderRef, instanceRef] = useKeenSlider({
    mode: "free",
    slides: {
      perView: "auto",
      spacing: 16,
    },
    rubberband: true,
    duration: 3500,
    easing: (t) => 1 - Math.pow(1 - t, 3),
    slideChanged(slider) {
      const newSlide = slider.track.details.rel;
      setCurrentSlide(newSlide);
      // Notify parent component of slide change
      if (props.onSlideChange) {
        props.onSlideChange(newSlide);
      }
    },
    created(slider) {
      slider.on("beforeChange", (instance) => {
        const nextIdx = instance.track.details.abs;
        if (nextIdx > 5) {
          instance.moveToIdx(5, false);
        }
      });
    },
  });

  const handleDotClick = (idx) => {
    if (instanceRef.current) {
      instanceRef.current.moveToIdx(idx, true, { duration: 800 });
      setCurrentSlide(idx);
    }
  };

  useImperativeHandle(ref, () => ({
    slideToEnd: () => {
      const s = instanceRef.current;
      if (!s) return;
      requestAnimationFrame(() => {
        const { slides, maxIdx } = s.track.details;
        const lastAllowedIdx = maxIdx;
        s.moveToIdx(lastAllowedIdx, true, { duration: 800 });
      });
    },
    slideToStart: () => {
      instanceRef.current?.moveToIdx(0, true, { duration: 800 });
    },
    getCurrentSlide: () => currentSlide,
    getTotalSlides: () => totalSlides,
    handleDotClick: handleDotClick,
  }));

  return (
    <div className="relative z-10">
      <div className="relative">
        <div ref={sliderRef} className="keen-slider rounded-[50px]">
          <div className="keen-slider__slide" id="Card1">
            <Card1 />
          </div>
          <div className="keen-slider__slide" id="Card2">
            <Card2 />
          </div>
          <div className="keen-slider__slide" id="Card3">
            <Card3 />
          </div>
          <div className="keen-slider__slide" id="Card4">
            <Card4 />
          </div>
          <div className="keen-slider__slide" id="Card5">
            <Card5 />
          </div>
          <div className="keen-slider__slide" id="Card6">
            <Card6 />
          </div>
          <div className="keen-slider__slide !min-w-[1px] !w-[1px]"></div>
        </div>

        <style jsx>{`
          .keen-slider::after {
            content: "";
            display: block;
          }
        `}</style>
      </div>
    </div>
  );
});

Slider.displayName = "Slider";
export default Slider;