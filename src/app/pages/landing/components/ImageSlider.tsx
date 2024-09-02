import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box } from "@mui/material";

const ImageSlider = (props) => {
  const [name, setName] = useState();
  const settings = {
    infinite: true,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: true,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <Box>
      <Box>{name}</Box>
      <Slider {...settings}>
        {props.images.map((item, id) => (
          <Box key={id} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box
              component="img"
              src={item}
              alt={`Slide ${id}`}
              sx={{
               
                width: '100%',
                height: '400px', // Adjust the height as needed
                // objectFit: 'fill', 
                
              }}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default ImageSlider;
