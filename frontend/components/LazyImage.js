import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const LazyImage = ({
  src,
  alt,
  className = '',
  placeholderSrc = '',
  effect = 'blur',
  threshold = 100,
  ...props
}) => {
  return (
    <LazyLoadImage
      src={src}
      alt={alt}
      className={className}
      placeholderSrc={placeholderSrc}
      effect={effect}
      threshold={threshold}
      wrapperClassName="lazy-image-wrapper"
      {...props}
    />
  );
};

export default LazyImage;