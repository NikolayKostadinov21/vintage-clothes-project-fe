import Card from "./Card/Card";
import '../carousel/carousel.scss'
import '../carousel/carouselMovement'

let btnpressnext;
let btnpressprev

const Carousel = () => {
    return (
        <>
            <div className="container">
                <button className="handle left-handle" onClick={btnpressprev}><p>&lt;</p></button>
                <div className="slider">
                    {Array.from({
                        length: 10
                    }, (_, i) => <div className="card">
                        <div className='item'>
                            <div className='item-details-publisher'>
                                <img className='publisher-picture' src='https://via.placeholder.com/300x400' />
                                <div className='publisher-name'>
                                    Nikolayski87
                                </div>
                            </div>
                            <div className='item-image'>
                                <img src='https://via.placeholder.com/300x400' />
                            </div>
                            <div className='item-details'>
                                <div className='item-details-price-size-description'>
                                    <div className='item-details-price'>
                                        12$
                                    </div>
                                    <div className='item-details-size'>
                                        M
                                    </div>
                                    <div className='item-details-description'>
                                        T-shirt
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    )}
                    {/* <Card className='cards' cardno='1' />
                <Card className='cards' cardno='2' /> */}
                </div>
                <button className="handle right-handle" onClick={btnpressnext}><p>&gt;</p></button>
            </div>
        </>
    )
}

export default Carousel;