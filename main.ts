/* Copyright (c) 2020 MTHS All rights reserved
 *
 * Created by: Sami Osman
 * Created on: Nov 2025
 * This program uses sensors to detect distance of nearby objects, if too close, it sends a message to another Micro:Bit.
 */

radio.setGroup(7)

// distance
function getDistance() {
    pins.digitalWritePin(DigitalPin.P8, 0)
    control.waitMicros(2)
    pins.digitalWritePin(DigitalPin.P8, 1)
    control.waitMicros(10)
    pins.digitalWritePin(DigitalPin.P8, 0)

    let duration = pins.pulseIn(DigitalPin.P9, PulseValue.High)
    return duration / 58
}

basic.forever(function () {
    // send
    let d = getDistance()
    if (d > 0 && d < 10) {
        radio.sendString("Too Close")
    }

    // receive
    let msg = radio.receiveString()
    if (msg == "Too Close") {
        basic.showString("Too Close")
    }

    basic.pause(100)
})


