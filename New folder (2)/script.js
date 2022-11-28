const SETTINGS = {
    mapStyle:[
        {
            "featureType": "administrative",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": "-100"
                }
            ]
        },
        {
            "featureType": "administrative.province",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "lightness": "-9"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "lightness": "50"
                },
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": "-100"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "all",
            "stylers": [
                {
                    "lightness": "30"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "all",
            "stylers": [
                {
                    "lightness": "40"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "transit.station",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "hue": "#ffff00"
                },
                {
                    "lightness": -25
                },
                {
                    "saturation": -97
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels",
            "stylers": [
                {
                    "lightness": -25
                },
                {
                    "saturation": -100
                }
            ]
        }
    ],
}
class Page {
    constructor() {
        this.logo =  document.querySelector(".nav__logo");
        this.header = document.querySelector(".header-bottom");
        this.sections = document.querySelectorAll('section');
        this.button = document.querySelector(".realty__button");
        this.isSticky = false;
        this.addVideo();
        this.clickTab();
        this.openMenuBurger();
        this.validateForm();
    }
    validateForm() {
        let inputName = document.querySelector("#name");
        let inputPhone = document.querySelector("#phone");
        let inputEmail = document.querySelector("#email");
        let inputSelect = document.querySelector("#selector");
        let buttonSubmit = document.querySelector("#submit");
        buttonSubmit.addEventListener("click", e => {
            e.preventDefault();
           if(this.isRequired([inputName, inputPhone, inputEmail, inputSelect])
               && this.inputMaxLength(inputName, 30)
               && this.inputMinLength(inputName, 2)
               &&) {

           }
        });
    }
    isRequired(arr) {
        for (const arrElement of arr) {
            if(arrElement.value === "") {
                return false;
            }
        }
        return true;
    }
    inputMaxLength(input, max) {
        return input.value.length < max;
    }
    inputMinLength(input, min) {
        return input.value.length > min;
    }
    isValidEmail() {

    }
    openMenuBurger() {
        let menu = document.querySelector(".nav__menuburger");
        let nav = document.querySelector(".nav");

        menu.addEventListener('click', () => {
            nav.classList.toggle('nav__open');
            menu.classList.toggle('nav__menu-open');
            if(menu.classList.contains("nav__menu-open") && !this.isSticky)this.header.style.transform = `translateY(${this.header.getBoundingClientRect().top}px)`;
            else if(menu.classList.contains("nav__menu-open") && this.isSticky) this.logo.classList.toggle('anim');
            else this.header.style.transform = "translateY(0px)";
            document.body.classList.toggle('lock');
        })
    }
    initMap() {
        const map = new google.maps.Map(document.querySelector(".map"), {
            zoom: 15,
            center: {
                lat: 41.896412525779375,
                lng: -87.63790018837435
            },
            disableDefaultUI: true,
            styles: SETTINGS.mapStyle,
        });
        const marker = new google.maps.Marker({
            position:  {
                lat: 41.896412525779375,
                lng: -87.63790018837435
            },
            map: map,
            icon: "https://uploads-ssl.webflow.com/637b452d03cd693dd90b2bbc/637f5797bac0ffacb289b66a_pin.png",
        });
    }
    resizeLogo() {
        if(this.header.getBoundingClientRect().top === 0) {
            this.logo.classList.add('anim');
            this.isSticky = true;
        }
        else {
            this.logo.classList.remove('anim');
            this.isSticky = false;
        }
    }
    changeColor() {
        let headerY = this.header.getBoundingClientRect().bottom + window.scrollY;
        for(let section of this.sections) {
            let sectionYTop = section.getBoundingClientRect().top + window.scrollY;
            let sectionYBottom = section.getBoundingClientRect().bottom + window.scrollY;
            if (sectionYTop < headerY && sectionYBottom > headerY) {
                (section.dataset.color === "white") ? this.header.classList.add("white") : this.header.classList.remove("white");
            }
        }
    }
    addVideo() {
        let video = "<iframe width=\"594\" height=\"416\" src=\"https://www.youtube.com/embed/iUVNspaiBAo\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>";
        let realty = document.querySelector(".realty__right");
        this.button.addEventListener('click', () => {
            realty.style.height = realty.clientHeight + "px";
            document.querySelector(".realty__img").remove();
            this.button.remove();
            realty.innerHTML = video;
        })
    }
    clickTab() {
        let cross = document.querySelectorAll(".cross");
        cross.forEach((el)=> {
            el.addEventListener("click", () => {
                el.parentNode.querySelector('.tab__hidden').classList.toggle("tabs__opened");
                el.querySelector(".cross__item__rotate90").classList.toggle("cross__item__opacity");
            });
        });
    }
}
let page = new Page();
addEventListener("scroll", () => {
    page.resizeLogo();
    page.changeColor();
});
window.initMap = page.initMap;
const swiper = new Swiper('.swiper', {
    loop: true,
    autoplay: {
        delay: 5000,
    },
    navigation: {
        nextEl: '.arrow__right',
        prevEl: '.arrow__left',
    },
});