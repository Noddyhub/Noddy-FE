import Quartz

struct CursorEventHelper {
    private static var lastClickTime: CFAbsoluteTime = 0
    private static var clickCount: Int = 0

    static func leftMouseDownAtCursor() {
        let currentTime: CFAbsoluteTime = CFAbsoluteTimeGetCurrent()
        let timeSinceLastClick: CFAbsoluteTime = currentTime - lastClickTime
        if timeSinceLastClick < NSEvent.doubleClickInterval {
            clickCount += 1
        } else {
            clickCount = 1
        }

        lastClickTime = currentTime
        click(mouseType: .leftMouseDown, button: .left, clickCount: clickCount)
    }

    static func leftMouseUpAtCursor() {
        click(mouseType: .leftMouseUp, button: .left, clickCount: clickCount)
    }

    static func rightMouseAtCursor(down: Bool) {
        let type: CGEventType = down ? .rightMouseDown : .rightMouseUp
        click(mouseType: type, button: .right)
    }

    private static func click(
        mouseType: CGEventType,
        button: CGMouseButton,
        clickCount: Int = 1,
        position: CGPoint = currentCursorPos
    ) {
        if let event = CGEvent(mouseEventSource: nil, mouseType: mouseType, mouseCursorPosition: position, mouseButton: button) {
            event.setIntegerValueField(.mouseEventClickState, value: Int64(clickCount))
            event.post(tap: .cghidEventTap)
        }
    }
}
