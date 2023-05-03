
"use client";
import { Inter } from '@next/font/google'
import NavBar from './Components/navbar'
import SiteHero from './Components/hero'
import HomeAbout from './Components/home-about'
import CourseDetails from './Components/course-Detail'
import Advantages from './Components/advantages'
import Footer from './Components/footer'
import CourseCard from './Components/course-card'
import CourseCardSlider from './Components/Course-Slider'
import { Box, ChakraProvider, useColorModeValue } from '@chakra-ui/react'


export default function Home() {
  return (
   
   
   
    <><NavBar></NavBar><SiteHero></SiteHero><Footer></Footer></>
   
   
   
    
  )
}
