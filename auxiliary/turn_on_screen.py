# Keyboard module in Python
import keyboard
import os
import winsound

def do_beep():

    frequency = 2500  # Set Frequency To 2500 Hertz
    duration = 1000  # Set Duration To 1000 ms == 1 second
    winsound.Beep(frequency, duration)

# press ctrl+shift+z to print "Hotkey Detected"
# keyboard.add_hotkey('ctrl + d', os.system, args=["pip --version"])
keyboard.add_hotkey('ctrl + d', do_beep)

keyboard.wait('ctrl + c')
