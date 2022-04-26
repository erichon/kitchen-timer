function _60min () {
    while (count <= 3) {
        basic.pause(3000)
        count += 1
    }
    flashingP8()
    count = 0
}
function _30min () {
    while (count <= 1) {
        basic.pause(3000)
        count += 1
    }
    flashingP8()
    count = 0
}
function _15min () {
    while (count == 0) {
        basic.pause(3000)
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
function _45min () {
    while (count <= 2) {
        basic.pause(3000)
        count += 1
    }
    flashingP8()
    count = 0
}
radio.onReceivedValue(function (name, value) {
    if (name == "alarm") {
        if (value == 0) {
            stop_alarm = 1
        }
    }
})
function flashingP8 () {
    pins.digitalWritePin(DigitalPin.P16, 1)
    radio.sendValue("alarm", 1)
    while (pins.digitalReadPin(DigitalPin.P0) == 1 || stop_alarm == 1) {
        pins.digitalWritePin(DigitalPin.P8, 1)
        basic.pause(100)
        pins.digitalWritePin(DigitalPin.P8, 0)
        basic.pause(100)
    }
    pins.digitalWritePin(DigitalPin.P16, 0)
    basic.pause(500)
    stop_alarm = 0
    clearALL()
}
let count = 0
let stop_alarm = 0
radio.setGroup(99)
stop_alarm = 0
clearALL()
count = 0
pins.digitalWritePin(DigitalPin.P16, 0)
led.enable(false)
basic.forever(function () {
    if (pins.digitalReadPin(DigitalPin.P3) == 0) {
        clearALL()
        pins.digitalWritePin(DigitalPin.P4, 1)
        _15min()
    }
    if (pins.digitalReadPin(DigitalPin.P2) == 0) {
        clearALL()
        pins.digitalWritePin(DigitalPin.P6, 1)
        _30min()
    }
    if (pins.digitalReadPin(DigitalPin.P1) == 0) {
        clearALL()
        pins.digitalWritePin(DigitalPin.P7, 1)
        _45min()
    }
    if (pins.digitalReadPin(DigitalPin.P0) == 0) {
        clearALL()
        pins.digitalWritePin(DigitalPin.P8, 1)
        _60min()
    }
})
