import { useState, useEffect } from 'react';
import { Box, ChakraProvider, Container, Flex, Image } from '@chakra-ui/react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { motion } from 'framer-motion';

function SliderChakra() {
  const [sliderImages, setSliderImages] = useState<string[]>([]);

  useEffect(() => {
    async function getImages() {
      const res = await fetch(`https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/entries?access_token=${process.env.CONTENTFUL_ACCESS_KEY}&content_type=technologies`, { cache: 'no-store' });

      // Recommendation: handle errors
      if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data');
      }

      const data = await res.json();
      const images: string[] = [];
      data.items.map((item: any) => {
        data.includes.Asset.map((imageItem: any) => {
          item.fields.skillSetImage.sys.id == imageItem.sys.id?
          images.push(imageItem.fields.file.url):""
        });
      });
      
      setSliderImages(images);

    }

    getImages();
  }, []);

  return (
    <ChakraProvider>
      <Container maxW={'7xl'} justifyContent="center" flexDirection="column" alignItems="center">
        <Slider
          infinite
          slidesToShow={7}
          swipeToSlide
          touchMove
          draggable
          autoplay
          arrows={false}
          responsive={[
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 3,
              },
            },
          ]}
          beforeChange={(current, next) => {
            const currentSlide = document.querySelector(`.slick-current[data-index="${current}"]`);
            const nextSlide = document.querySelector(`.slick-current[data-index="${next}"]`);
            if (currentSlide instanceof HTMLElement && nextSlide instanceof HTMLElement) {
              currentSlide.style.transform = 'scale(0.9)';
              currentSlide.style.opacity = (0.5).toString();
              nextSlide.style.transform = 'scale(1)';
              nextSlide.style.opacity = (1).toString();;
            }
          }}
        >
          {sliderImages.map((imageUrl, index) => (
            <Box key={index} maxW={"90px"} maxH={"100px"} m="2" style={{ transform: 'scale(0.9)', opacity: 0.5 }}>
              <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
                <Image src={imageUrl} alt={imageUrl} w="100%" h="100%" />
              </motion.div>
            </Box>
          ))}
        </Slider>
      </Container>
    </ChakraProvider>
  );
}

export default SliderChakra;
