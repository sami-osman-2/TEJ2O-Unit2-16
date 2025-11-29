"""
Created by: Sami Osman
Created on: Nov 2025
 This program uses sensors to detect distance of nearby objects, if too close, it sends message to another Micro:Bit.
"""

from microbit import *
import radio

radio.on()
radio.config(group=7)

trigger = pin8
echo = pin9

def get_distance():
    trigger.write_digital(0)
    sleep(2)
    trigger.write_digital(1)
    sleep(1)
    trigger.write_digital(0)

    duration = echo.read_pulse_us()
    return duration / 58

while True:
    # Sender
    d = get_distance()
    if 0 < d < 10:
        radio.send("Too Close")

    # Receiver
    msg = radio.receive()
    if msg == "Too Close":
        display.scroll("Too Close")

    sleep(100)
