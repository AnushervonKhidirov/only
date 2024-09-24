import type { FC } from 'react'
import type { Swiper as TSwiper } from 'swiper'

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import { EffectFade, Pagination } from 'swiper/modules'
import DateSlider from '../date-slider/date-slider'
import Arrow from '../arrow/arrow'
import SubHeadline from '../sub-headline/sub-headline'

import useRouletteStore from '../../store/roulette'

import classNames from 'classnames'
import { chapters } from './constant'
import { addZero } from '../../helper/add-zero'
import { checkIsMobile } from '../../helper/is-mobile'

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import styles from './chapter-slider.module.scss'


const ChapterSlider: FC = () => {
    const { activeItem, updateActiveItem } = useRouletteStore(state => state)
    const swiperRef = useRef<TSwiper>(null)
    const [isMobile, setIsMobile] = useState(false)

    useLayoutEffect(() => {
        setIsMobile(checkIsMobile())

        window.addEventListener('resize', () => {
            setIsMobile(checkIsMobile())
        })
    })

    const updateAnimation = useCallback(() => {
        if (swiperRef.current) {
            swiperRef.current.slideTo(activeItem)

            swiperRef.current.slides.forEach((slide, index) => {
                slide.style.opacity = '0'
                slide.style.pointerEvents = 'none'
                slide.style.transitionDuration = '300ms'
                slide.style.transitionDelay = '0ms'

                if (swiperRef.current.activeIndex === index) {
                    slide.style.opacity = '1'
                    slide.style.pointerEvents = 'all'
                    slide.style.transitionDelay = '1000ms'
                }
            })
        }
    }, [swiperRef.current, activeItem])

    useEffect(() => {
        updateAnimation()
    }, [activeItem])

    return (
        <Swiper
            className={styles.slider}
            modules={[EffectFade, Pagination]}
            slidesPerView={1}
            noSwiping
            allowTouchMove={false}
            onInit={swiper => (swiperRef.current = swiper)}
            onSlideChange={swiper => updateActiveItem(swiper.activeIndex)}
            effect="fade"
            pagination={{ enabled: isMobile, type: 'bullets', clickable: true, bulletActiveClass: styles.bulletActive }}
        >
            {isMobile && <SubHeadline>{chapters[activeItem]}</SubHeadline>}
            {chapters.map((chapter, index) => (
                <SwiperSlide key={`${chapter}-${index}`}>
                    <DateSlider chapter={chapter} />
                </SwiperSlide>
            ))}

            <div className={styles.controls}>
                <ChapterSliderPagination />
                <ChapterSliderNavigation />
            </div>
        </Swiper>
    )
}

const ChapterSliderNavigation = () => {
    const swiper = useSwiper()

    function next() {
        swiper.slideNext()
    }

    function prev() {
        swiper.slidePrev()
    }

    return (
        <div className={styles.navigation}>
            <Arrow className={classNames(styles.arrow, {[styles.disabled]: swiper.isBeginning})} callback={prev} side="left" />
            <Arrow className={classNames(styles.arrow, {[styles.disabled]: swiper.isEnd})} callback={next} side="right" />
        </div>
    )
}

const ChapterSliderPagination = () => {
    const swiper = useSwiper()

    function customPagination() {
        return `${addZero(swiper.activeIndex + 1)}/${addZero(swiper.slides.length)}`
    }

    return <div className={styles.pagination}>{customPagination()}</div>
}

export default ChapterSlider
