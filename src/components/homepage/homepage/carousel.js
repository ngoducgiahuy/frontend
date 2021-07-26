import React, { useState } from 'react';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption,
    Container,
    Row,
    Col
} from 'reactstrap';
import './carousel.css';

const items = [
    {
        src: 'https://mdbootstrap.com/img/Photos/Slides/img%20(15).jpg',
        altText: 'Slide 1',
        caption: 'Slide 1'
    },
    {
        src: 'https://mdbootstrap.com/img/Photos/Slides/img%20(22).jpg',
        altText: 'Slide 2',
        caption: 'Slide 2'
    },
    {
        src: 'https://mdbootstrap.com/img/Photos/Slides/img%20(23).jpg',
        altText: 'Slide 3',
        caption: 'Slide 3'
    }
];

const Example = (props) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }

    const slides = items.map((item) => {
        return (
            <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={item.src}
            >
                <div className="img-width">
                    <img src={item.src} alt={item.altText} />
                </div>
                <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
            </CarouselItem>
        );
    });

    return (
        <Container className="margin-top-carousel">
            <Row>
                <Col xs="9">
                    <Carousel
                        activeIndex={activeIndex}
                        next={next}
                        previous={previous}
                    >
                        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
                        {slides}
                        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
                    </Carousel>
                </Col>
                <Col xs="3">More pictures</Col>
            </Row>
        </Container>
    );
}

export default Example;