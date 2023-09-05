"use client"
import React from "react";
import Slider from "react-slick";
import { urlForImage } from "@/sanity/lib/image";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "./productcard";

const SiteCarousel = ({ ProductsList }: any) => {
    const settings = {
        arrows: false,
        autoplay: true,
        dots: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        speed: 1000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div className="flex">
            <Slider className="w-full justify-between items-center" {...settings}>
                {ProductsList.map((product: any, index: number) => (
                    <ProductCard key={index} title={product.title} price={product.price}  ind={product._id} link={`/product/${product._id}`} imag={urlForImage(product.image).url()}></ProductCard>
                    
                ))}
            </Slider>
        </div>
    );
};

export default SiteCarousel;
