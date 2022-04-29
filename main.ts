function fourth_Time () {
    while (count <= fourthTime) {
        basic.pause(1000)
        count += 1
    }
    flashingP8()
    count = 0
}
function clearALL () {
    pins.digitalWritePin(DigitalPin.P4, 0)
    pins.digitalWritePin(DigitalPin.P6, 0)
    pins.digitalWritePin(DigitalPin.P7, 0)
    pins.digitalWritePin(DigitalPin.P8, 0)
}
function first_Time () {
    while (count <= firstTime) {
        basic.pause(1000)
        count += 1
    }
    flashingP8()
    count = 0
}
function second_Time () {
    while (count <= secondTime) {
        basic.pause(1000)
        count += 1
    }
    flashingP8()
    count = 0
}
radio.onReceivedValue(function (name, value) {
    if (name == "alarm") {
        if (value == 0) {
            stop_alarm = 1
            pins.digitalWritePin(DigitalPin.P16, 0)
            clearALL()
        }
    }
})
function third_Time () {
    while (count <= thirdTime) {
        basic.pause(1000)
        count += 1
    }
    flashingP8()
    count = 0
}
function flashingP8 () {
    pins.digitalWritePin(DigitalPin.P16, 1)
    radio.sendValue("ralarm", 1)
    while (pins.digitalReadPin(DigitalPin.P0) == 1 && stop_alarm == 0) {
        if (stop_alarm == 0) {
            pins.digitalWritePin(DigitalPin.P8, 1)
            basic.pause(100)
            pins.digitalWritePin(DigitalPin.P8, 0)
            basic.pause(100)
        } else {
            pins.digitalWritePin(DigitalPin.P8, 0)
        }
    }
    radio.sendValue("ralarm", 0)
    pins.digitalWritePin(DigitalPin.P16, 0)
    basic.pause(500)
    stop_alarm = 0
    clearALL()
}
let fourthTime = 0
let thirdTime = 0
let secondTime = 0
let firstTime = 0
let count = 0
let stop_alarm = 0
radio.setGroup(99)
stop_alarm = 0
count = 0
pins.digitalWritePin(DigitalPin.P16, 0)
clearALL()
led.enable(false)
firstTime = 10
secondTime = 15
thirdTime = 20
fourthTime = 25
basic.forever(function () {
    if (pins.digitalReadPin(DigitalPin.P3) == 0) {
        clearALL()
        pins.digitalWritePin(DigitalPin.P4, 1)
        first_Time()
    }
    if (pins.digitalReadPin(DigitalPin.P2) == 0) {
        clearALL()
        pins.digitalWritePin(DigitalPin.P6, 1)
        second_Time()
    }
    if (pins.digitalReadPin(DigitalPin.P1) == 0) {
        clearALL()
        pins.digitalWritePin(DigitalPin.P7, 1)
        third_Time()
    }
    if (pins.digitalReadPin(DigitalPin.P0) == 0) {
        clearALL()
        pins.digitalWritePin(DigitalPin.P8, 1)
        fourth_Time()
    }
})
