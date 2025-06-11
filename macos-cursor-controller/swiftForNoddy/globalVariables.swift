import Quartz

// airPodsInfoTeller.swift (AirPods Information)
var airPodsName = ""
var airPodsLeftBattery: Int?
var airPodsRightBattery: Int?
var MacBattery = 0

// motionManager.swift (Motion Data)
var isMotionPaused = false
var pitchForScroll: CGFloat = 0
var pitchOffset = 0.0
var yawOffset = 0.0
var filteredPitch = 0.0
var filteredYaw = 0.0
var filterAlpha = 0.1

// cursorController.swift (Cursor Control)
var isCursorMode: Bool = true
var cursorSensitivity = 6.0
let screenFrame = NSScreen.main!.frame
var currentCursorPos = CGPoint(x: screenFrame.midX, y: screenFrame.midY)
var targetCursorPos = currentCursorPos

// scrollEventHelper.swift (Scroll Control)
var scrollSensitivity: CGFloat = 300

// startKeyEventMonitor.swift (Key Settings)
let keyCodes = KeyCode()
class KeyCode {
    var toggleMode: Int = 48 // Tab
    var leftClick: Int = 101 // F9
    var rightClick: Int = 109 // F10
    var motionPause: Int = 103 // F11
    var increaseSensitivity: Int = 116 // PageUp
    var decreaseSensitivity: Int = 121 // PageDown
    var pitchUp: Int = 126 // ArrowUp
    var pitchDown: Int = 125 // ArrowDown
    var yawLeft: Int = 123 // ArrowLeft
    var yawRight: Int = 124 // ArrowRight
    var toggleScroll: Int = 12 // Q key
    var increaseScrollSpeed: Int = 100 // F8
    var decreaseScrollSpeed: Int = 98 // F7
    var increaseCursorReactionSpeed: Int = 97 // F6
    var decreaseCursorReactionSpeed: Int = 96 // F5
}

// scrollEventHelper.swift (invertedValue, maxValue <-> minValue)
func invertedValue(sliderValue: Double, minValue: Double, maxValue: Double) -> Double {
    return maxValue - (sliderValue - minValue)
}

// uuid
var uuid = ""

// keyCode Dictionary
let keyNameToCode: [String: Int] = [
    // Letters
    "A": 0, "S": 1, "D": 2, "F": 3, "H": 4, "G": 5, "Z": 6, "X": 7,
    "C": 8, "V": 9, "B": 11, "Q": 12, "W": 13, "E": 14, "R": 15,
    "Y": 16, "T": 17, "1": 18, "2": 19, "3": 20, "4": 21, "6": 22,
    "5": 23, "9": 25, "7": 26, "8": 28, "0": 29,
    "]": 30, "O": 31, "U": 32, "I": 34, "P": 35,
    "L": 37, "J": 38, "K": 40, "N": 45, "M": 46, "Tab": 48,

    // Arrow Keys
    "ArrowUp": 126, "ArrowDown": 125, "ArrowLeft": 123, "ArrowRight": 124,

    // Function Keys
    "F1": 122, "F2": 120, "F3": 99, "F4": 118, "F5": 96, "F6": 97,
    "F7": 98, "F8": 100, "F9": 101, "F10": 109, "F11": 103, "F12": 111,

    // Other Special Keys
    "PageUp": 116, "PageDown": 121, "Home": 115, "End": 119,
    "Insert": 114, "Delete": 117,

    // Keypad
    "Keypad0": 82, "Keypad1": 83, "Keypad2": 84, "Keypad3": 85,
    "Keypad4": 86, "Keypad5": 87, "Keypad6": 88, "Keypad7": 89,
    "Keypad8": 91, "Keypad9": 92, "KeypadClear": 71, "KeypadEnter": 76,
    "KeypadDecimal": 65, "KeypadDivide": 75, "KeypadMultiply": 67,
    "KeypadMinus": 78, "KeypadPlus": 69, "KeypadEquals": 81
]
