import Card from "./Card/Card";
import '../carousel/carousel.scss'

let box = document.querySelector('.product-container');
let width = box.clientWidth;
console.log(box.clientWidth)
const btnpressprev = () => {
    box.scrollLeft = box.scrollLeft - width;
    console.log(box.clientWidth)
}

const btnpressnext = () => {
    box.scrollLeft = box.scrollLeft + width;
    console.log(box.clientWidth)
}

const Carousel = () => {
    return (
        <>
            <div className="product-carousel">
                <button className="pre-btn" onClick={btnpressprev}><p>&lt;</p></button>
                <button className="next-btn" onClick={btnpressnext}><p>&gt;</p></button>

                <div className="product-container">
                    <Card cardno='1' />
                    <Card cardno='2' />
                    <Card cardno='3' />
                    <Card cardno='4' />
                    <Card cardno='5' />
                    <Card cardno='6' />
                    <Card cardno='7' />
                    <Card cardno='8' />
                    <Card cardno='9' />
                    <Card cardno='10' />
                    <Card cardno='11' />
                    <Card cardno='12' />
                    <Card cardno='13' />
                    <Card cardno='1' />
                    <Card cardno='2' />
                    <Card cardno='3' />
                    <Card cardno='4' />
                    <Card cardno='5' />
                </div>
            </div>
        </>
    )
}

export default Carousel;