import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, EffectFade, Pagination } from "swiper"
import "swiper/css/navigation"
import "swiper/css/effect-fade"
import "swiper/css"
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function Video() {

    
    return (
        <>
            <Swiper
                modules={[Navigation, EffectFade, Pagination]}
                effect
                navigation
                loop
                pagination={{ clickable: true }}
                slidesPerGroup={3}
                spaceBetween={20}
                speed={400}
                slidesPerView={3}
                className="mySwiper"   
            >
                <SwiperSlide className="swiperSlide">
                    {/* <img src={`${process.env.PUBLIC_URL}/camion.jpg`}></img> */}
                    <video controls src="http://localhost:5000/video"></video>
                </SwiperSlide>
                <SwiperSlide className="swiperSlide">
                    <video controls src="http://localhost:5000/video"></video>
                </SwiperSlide>
                <SwiperSlide className="swiperSlide">
                    <video controls src="http://localhost:5000/video"></video>
                </SwiperSlide>
                <SwiperSlide className="swiperSlide">
                    <video controls src="http://localhost:5000/video"></video>
                </SwiperSlide>
                <SwiperSlide className="swiperSlide">
                    <video controls src="http://localhost:5000/video"></video>
                </SwiperSlide>
                <SwiperSlide className="swiperSlide">
                    <video controls src="http://localhost:5000/video"></video>
                </SwiperSlide>
            </Swiper>
        </>
    )
}

export default Video