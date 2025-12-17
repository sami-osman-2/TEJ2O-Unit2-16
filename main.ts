/* Copyright (c) 2020 MTHS All rights reserved
 *
 * Created by: Sami Osman
 * Created on: Nov 2025
 * This program using a radio feature
*/

// variables
let distanceOfObstacle: number = 0

// cleanse
radio.setGroup(39)
basic.clearScreen()
basic.showIcon(IconNames.Giraffe)

// grabs distance
while (true) {
   distanceOfObstacle = sonar.ping(
    DigitalPin.P12, 
    DigitalPin.P13, 
    PingUnit.Centimeters
    )
    if (distanceOfObstacle < 10) {
        radio.sendString('Too Close bub')
    }
    radio.onReceivedString(function(receivedString: string) {
        basic.clearScreen()
        basic.showString(receivedString)
        basic.showIcon(IconNames.Happy)
    })
}