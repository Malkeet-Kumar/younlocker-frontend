import React, { useState } from "react";
import Slider, {Settings} from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box } from "@mui/material";

const ImageSlider = (props:any) => {
  const [name, setName] = useState();

  const settings: Settings = {
    infinite: true,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  

  return (
    <Box>
      <Box>{name}</Box>
      <Slider {...settings}>
        {props.images.map((item:any, id:any) => (
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
