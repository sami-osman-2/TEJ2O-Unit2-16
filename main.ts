/* Copyright (c) 2020 MTHS All rights reserved
 * Created by: Sami Osman
 * Created on: Oct 2025
 * This program transmits a radio
*/

let distance = 0
let state = ""

radio.setGroup(247)
radio.setTransmitPower(7)
basic.showIcon(IconNames.Happy)

basic.forever(function () {
    distance = sonar.ping(
        DigitalPin.P12,
        DigitalPin.P13,
        PingUnit.Centimeters
    )

    // Ignore bad readings
    if (distance <= 0 || distance > 400) {
        basic.pause(200)
        return
    }

    if (distance <= 5) {
        if (state != "close") {
            radio.sendString("Too close")
            state = "close"
        }
    } else {
        if (state != "safe") {
            radio.sendString("Safe")
            state = "safe"
        }
    }

    basic.pause(300)
})

// this is recivere code
radio.setGroup(247)
basic.showIcon(IconNames.Heart)

radio.onReceivedString(function (msg) {
    basic.clearScreen()

    if (msg == "Too close") {
        basic.showIcon(IconNames.No)
        basic.showString("WARNING")
    } else if (msg == "Safe") {
        basic.showIcon(IconNames.Yes)
    }
})