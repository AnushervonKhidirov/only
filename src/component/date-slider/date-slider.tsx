import type { FC } from 'react'

import { useState } from 'react'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'

import DateSliderItem from '../date-slide/date-slide'
import Arrow from '../arrow/arrow'

import classNames from 'classnames'

import { datesPerChapters } from './constant'

import 'swiper/css'
import 'swiper/css/navigation'
import styles from './date-slider.module.scss'

const DateSlider: FC<{ chapter: string }> = ({ chapter }) => {
    return (
        <Swiper spaceBetween={30} slidesPerView={3} className={styles.slider}>
            {datesPerChapters[chapter].map(({ date, desc }, index) => (
                <SwiperSlide key={`${date}-${index}`}>
                    <DateSliderItem date={date} desc={desc} />
                </SwiperSlide>
            ))}
            <DateSLiderNavigation />
        </Swiper>
    )
}

const DateSLiderNavigation = () => {
    const swiper = useSwiper()
    const [arrowsVisible, setArrowsVisible] = useState({
        left: swiper.isBeginning,
        right: swiper.isEnd,
    })

    swiper.onAny(() => {
        updateArrowsVisibility()
    })

    function prev() {
        swiper.slidePrev()
    }

    function next() {
        swiper.slideNext()
    }

    function updateArrowsVisibility() {
        setArrowsVisible({
            left: swiper.isBeginning,
            right: swiper.isEnd,
        })
    }

    return (
        <div className={styles.navigation}>
            <Arrow
                className={classNames(styles.arrow, { [styles.disable]: arrowsVisible.left })}
                side="left"
                color="light"
                callback={prev}
            />
            <Arrow
                className={classNames(styles.arrow, { [styles.disable]: arrowsVisible.right })}
                side="right"
                color="light"
                callback={next}
            />
        </div>
    )
}

export default DateSlider
