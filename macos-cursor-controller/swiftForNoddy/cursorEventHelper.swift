import AppKit
import Quartz

struct CursorEventHelper {
    private static var lastClickTime: CFAbsoluteTime = 0
    private static var clickCount: Int = 0

    static func leftMouseDownAtCursor() {
        let currentTime: CFAbsoluteTime = CFAbsoluteTimeGetCurrent()
        let timeSinceLastClick: CFAbsoluteTime = currentTime - lastClickTime
        if timeSinceLastClick < NSEvent.doubleClickInterval {
            clickCount = min(clickCount + 1, clickCount + 2)
        } else {
            clickCount = 1
        }

        lastClickTime = currentTime
        click(mouseType: .leftMouseDown, button: .left, clickCount: clickCount)
    }

    static func leftMouseUpAtCursor() {
        click(mouseType: .leftMouseUp, button: .left, clickCount: clickCount)
    }

    static func rightMouseDownAtCursor() {
        click(mouseType: .rightMouseDown, button: .right)
    }

    static func rightMouseUpAtCursor() {
        click(mouseType: .rightMouseUp, button: .right)
    }

    private static func click(mouseType: CGEventType, button: CGMouseButton, clickCount: Int = 1) {
        if let event = CGEvent(mouseEventSource: nil, mouseType: mouseType, mouseCursorPosition: currentCursorPos, mouseButton: button) {
            event.setIntegerValueField(.mouseEventClickState, value: Int64(clickCount))
            event.post(tap: .cghidEventTap)
        }
    }
}
