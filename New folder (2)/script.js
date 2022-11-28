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
    EMAIL_REGEXP: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
    PHONE_REGEXP: /^(1\s?)?(\d{3}|\(\d{3}\))[\s\-]?\d{3}[\s\-]?\d{4}$/gm,
}
class Page {
    constructor() {
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
               && this.isValidEmail(inputEmail)
               && this.isValidPhone(inputPhone)) {
                alert("Все правильно");
           } else {
               alert("Ошибка");
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
    isValidEmail(input) {
        return SETTINGS.EMAIL_REGEXP.test(input.value);
    }
    isValidPhone(input) {
        return SETTINGS.PHONE_REGEXP.test(input.value);
    }

}
let page = new Page();
