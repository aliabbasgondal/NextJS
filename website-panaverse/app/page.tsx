
"use client";

import HowItWorks from './Components/course-card';
import Footer from './Components/footer';
import SiteHero from './Components/hero';
import NavBar from './Components/navbar';
import WhatWeDo from './Components/what-we-do';
import SliderChakra from './Components/Course-Slider';
import StudentsTestimonial from './Components/testimonials';
import Faqs from './Components/faqs';
import { Suspense } from 'react';
import { Spinner } from '@chakra-ui/react';



export default function Home() {
  function Loading() {
    return (
      <div style={{ position: "relative", height: "100vh" }}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="#AF172C"
          size="xl"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        />
      </div>
    );
  }
  return (
   
   
   <> 
   <Suspense fallback={<Loading />}>
   <NavBar></NavBar>
  
  <SiteHero></SiteHero><HowItWorks></HowItWorks><SliderChakra></SliderChakra><WhatWeDo></WhatWeDo><StudentsTestimonial></StudentsTestimonial><Faqs></Faqs>
   <Footer></Footer></Suspense></>
    
   
   
   
    
  )
}
