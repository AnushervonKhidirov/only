import type { FC } from 'react'
import type { Swiper as TSwiper } from 'swiper'
import type { TDatesRange } from '../../store/range-date'

import { useCallback, useEffect, useRef } from 'react'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import { EffectFade } from 'swiper/modules'
import DateSlider from '../date-slider/date-slider'
import Arrow from '../arrow/arrow'

import useRouletteStore from '../../store/roulette'
import useDatesRangeStore from '../../store/range-date'

import classNames from 'classnames'
import { chapters } from './constant'
import { datesPerChapters } from '../date-slider/constant'
import { addZero } from '../../helper/add-zero'

import 'swiper/css'
import 'swiper/css/effect-fade'
import styles from './chapter-slider.module.scss'


const ChapterSlider: FC = () => {
    const { activeItem, updateActiveItem } = useRouletteStore(state => state)
    const {from, to, updateDates} = useDatesRangeStore(state => state)

    const swiperRef = useRef<TSwiper>(null)

    const increaseDatesAnimation = useCallback(() => {
        const activeChapter = datesPerChapters[chapters[activeItem]]
        const activeChapterDates = activeChapter.map(chapter => chapter.date)

        const prevDates = {
            from: from,
            to: to,
        }
        const currDates = {
            from: activeChapterDates[0],
            to: activeChapterDates.at(-1),
        }

        const animationDuration = 1000
        const fromRange = prevDates.from - currDates.from
        const toRange = prevDates.to - currDates.to

        const iterationCount = (Math.max(Math.abs(fromRange), Math.abs(toRange)))
        const interval = animationDuration / iterationCount
        
        animation(prevDates)

        function animation({ from, to }: TDatesRange) {
            if (from === currDates.from && to === currDates.to) return

            const newFromRange = from === currDates.from ? currDates.from : from < currDates.from ? ++from : --from
            const newToRange = to === currDates.to ? currDates.to : to < currDates.to ? ++to : --to

            const result = {
                from: newFromRange,
                to: newToRange,
            }

            updateDates(result)
            setTimeout(() => {
                animation(result)
            }, interval)
        }
    }, [activeItem])

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
        increaseDatesAnimation()
    }, [activeItem])

    return (
        <Swiper
            className={styles.slider}
            modules={[EffectFade]}
            slidesPerView={1}
            onInit={swiper => (swiperRef.current = swiper)}
            onSlideChange={swiper => updateActiveItem(swiper.activeIndex)}
            effect="fade"
        >
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
            <Arrow className={classNames(styles.arrow)} callback={prev} side="left" />
            <Arrow className={classNames(styles.arrow)} callback={next} side="right" />
        </div>
    )
}

const ChapterSliderPagination = () => {
    const swiper = useSwiper()

    function customPagination() {
        return `${addZero(swiper.activeIndex + 1)}/${addZero(swiper.slides.length)}`
    }

    return <div className={classNames(styles.pagination, 'chapter-pagination')}>{customPagination()}</div>
}

export default ChapterSlider
