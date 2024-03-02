const inputYear = document.querySelector(".input_year"),
    inputDay = document.querySelector(".input_day"),
    inputMonth = document.querySelector(".input_month"),
    form = document.querySelector(".date"),
    outputYear = document.querySelector(".output_year"),
    outputDay = document.querySelector(".output_day"),
    outputMonth = document.querySelector(".output_month"),
    labels = document.querySelectorAll("label"),
    messages = document.querySelectorAll(".message"),
    inputs = document.querySelectorAll("input")

const errorInvalidMessages = ["Must be a valid day", "Must be a valid month", "Must be in the past"]
const errorInvalidDate = "Must be a valid date";

form.addEventListener("submit", (e) => {
    e.preventDefault()
    if (inputDay.value.length > 0 && inputMonth.value.length > 0 && inputYear.value.length > 0) {
        if (Number(inputYear.value) > 400) {
            if ((inputMonth.value > 0 && inputMonth.value <= 12) &&
                (inputDay.value > 0 && inputDay.value <= 31) && (inputYear.value < new Date().getFullYear())
            ) {
                let year = inputYear.value;
                let isLeapYear = false;

                if (year % 4 === 0) {
                    if (year % 100 === 0) {
                        if (year % 400 === 0) {
                            isLeapYear = true;
                        } else {
                            isLeapYear = false;
                        }
                    } else {
                        isLeapYear = true;
                    }
                } else {
                    isLeapYear = false;
                }

                if (((inputMonth.value == "04" ||
                    inputMonth.value == "4" ||
                    inputMonth.value == "06" ||
                    inputMonth.value == "6" ||
                    inputMonth.value == "09" ||
                    inputMonth.value == "9" ||
                    inputMonth.value == "11") && inputDay.value == "31") || (
                        (((inputMonth.value == "02" || inputMonth.value == "2") && inputDay.value >= "30") && isLeapYear) ||
                        ((inputMonth.value == "02" || inputMonth.value == "2") && inputDay.value > "28" && isLeapYear == false)
                    )) {
                    messages[0].innerHTML = errorInvalidDate;
                    labels.forEach(label => {
                        label.style.color = "hsl(0, 100%, 67%)"
                    })
                    inputs.forEach(input => {
                        input.style.borderColor = "hsl(0, 100%, 67%)"
                    })
                }
                else {
                    const inputDate = `${!(inputMonth.value.indexOf("0") > -1) ? "0" + inputMonth.value : inputMonth.value}-${inputDay.value}-${inputYear.value}`
                    const currentDate = new Date();
                    const birthDate = new Date(inputDate)
                    var days;
                    var years;
                    var months;


                    if (currentDate.getMonth() > birthDate.getMonth() ||
                        (currentDate.getMonth() == birthDate.getMonth() &&
                            currentDate.getDate() >= birthDate.getDate()
                        )
                    ) {
                        years = currentDate.getFullYear() - birthDate.getFullYear();
                    }
                    else {
                        years = currentDate.getFullYear() - birthDate.getFullYear() - 1;
                    }


                    if (currentDate.getDate() >= birthDate.getDate()) {
                        months = currentDate.getMonth() - birthDate.getMonth();
                    }
                    else if (currentDate.getDate() < birthDate.getDate()) {
                        months = currentDate.getMonth() - birthDate.getMonth() - 1;
                    }
                    months = months < 0 ? months + 12 : months;


                    var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                    if (currentDate.getDate() >= birthDate.getDate()) {
                        days = currentDate.getDate() - birthDate.getDate();
                    } else {
                        days = currentDate.getDate() - birthDate.getDate() + monthDays[birthDate.getMonth()];
                    }


                    outputDay.innerHTML = days;
                    outputMonth.innerHTML = months;
                    outputYear.innerHTML = years;
                    e.target.reset();
                }
            }
            else {
                messages[0].innerHTML = errorInvalidMessages[0];
                messages[1].innerHTML = errorInvalidMessages[1];
                messages[2].innerHTML = errorInvalidMessages[2];
                labels.forEach(label => {
                    label.style.color = "hsl(0, 100%, 67%)"
                })
                inputs.forEach(input => {
                    input.style.borderColor = "hsl(0, 100%, 67%)"
                })
            }
        } else {
            messages[2].innerHTML = "Years more than 400"
        }

    }
})

inputDay.addEventListener("input", validateSet)
inputMonth.addEventListener("input", validateSet)
inputYear.addEventListener("input", validateSet)

function validateSet() {
    inputDay.style.borderColor = "hsl(0, 0%, 86%)"
    inputMonth.style.borderColor = "hsl(0, 0%, 86%)"
    inputYear.style.borderColor = "hsl(0, 0%, 86%)"
    labels.forEach(label => {
        label.style.color = "hsl(0, 1%, 44%)"
    })
    messages[0].innerHTML = '';
    messages[1].innerHTML = '';
    messages[2].innerHTML = '';
}
