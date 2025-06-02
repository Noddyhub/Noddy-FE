import Quartz

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
var cursorSensitivity = 5.5
let screenFrame = NSScreen.main!.frame
var currentCursorPos = CGPoint(x: screenFrame.midX, y: screenFrame.midY)
var targetCursorPos = currentCursorPos

// scrollEventHelper.swift (Scroll Control)
var scrollSensitivity: CGFloat = 350

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
