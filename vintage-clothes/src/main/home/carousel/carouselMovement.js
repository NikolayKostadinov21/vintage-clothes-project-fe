document.addEventListener("click", e => {
    let handle
    if (e.target.matches(".handle")) {
        handle = e.target
    } else {
        handle = e.target.closest(".handle")
    }
    if (handle != null) onHandleClick(handle)
});

const onHandleClick = (handle) => {
    const slider = handle.closest(".container").querySelector(".slider");
    const sliderIndex = parseInt(
        getComputedStyle(slider).getPropertyValue("--slider-index")
    )
    if (handle.classList.contains("left-handle")) {
        console.log(sliderIndex)
        slider.style.setProperty("--slider-index", sliderIndex - 1);
    }

    if (handle.classList.contains("right-handle")) {
        console.log(sliderIndex)
        slider.style.setProperty("--slider-index", sliderIndex + 1);
    }
}