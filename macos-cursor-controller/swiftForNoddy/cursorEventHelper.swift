import AppKit
import Quartz

struct cursorEventHelper {
    private static var lastClickTime: TimeInterval = 0
    private static let doubleClickThreshold: TimeInterval = 0.3

    static func leftClickAtCurrentCursor() {
        let currentTime: TimeInterval = Date().timeIntervalSince1970
        let timeSinceLastClick: TimeInterval = currentTime - lastClickTime

        if timeSinceLastClick < doubleClickThreshold {
            click(mouseTypeDown: .leftMouseDown, mouseTypeUp: .leftMouseUp, button: .left, clickCount: 2)
        } else {
            click(mouseTypeDown: .leftMouseDown, mouseTypeUp: .leftMouseUp, button: .left, clickCount: 1)
        }

        lastClickTime = currentTime
    }
    static func rightClickAtCurrentCursor() {
        click(mouseTypeDown: .rightMouseDown, mouseTypeUp: .rightMouseUp, button: .right, clickCount: 1)
    }

    private static func click(mouseTypeDown: CGEventType, mouseTypeUp: CGEventType, button: CGMouseButton, clickCount: Int) {
        let screenHeight: CGFloat = NSScreen.screens.first?.frame.height ?? 0
        let location: NSPoint = NSEvent.mouseLocation
        let flippedLocation: CGPoint = CGPoint(x: location.x, y: screenHeight - location.y)

        let mouseDown: CGEvent? = CGEvent(mouseEventSource: nil, mouseType: mouseTypeDown, mouseCursorPosition: flippedLocation, mouseButton: button)
        let mouseUp: CGEvent? = CGEvent(mouseEventSource: nil, mouseType: mouseTypeUp, mouseCursorPosition: flippedLocation, mouseButton: button)

        mouseDown?.setIntegerValueField(.mouseEventClickState, value: Int64(clickCount))
        mouseUp?.setIntegerValueField(.mouseEventClickState, value: Int64(clickCount))

        mouseDown?.post(tap: .cghidEventTap)
        mouseUp?.post(tap: .cghidEventTap)
    }
}
