import Quartz

struct CursorEventHelper {
    private static var lastClickTime: CFAbsoluteTime = 0
    private static var clickCount: Int = 0

    static func leftMouseDownAtCursor() {
        let currentTime: CFAbsoluteTime = CFAbsoluteTimeGetCurrent()
        let timeSinceLastClick: CFAbsoluteTime = currentTime - lastClickTime
        if timeSinceLastClick < NSEvent.doubleClickInterval {
            clickCount = min(clickCount + 1, 2)
        } else {
            clickCount = 1
        }

        lastClickTime = currentTime
        click(mouseType: .leftMouseDown, button: .left, clickCount: clickCount)
        simulateDragWhileMouseDown()
    }

    static func leftMouseUpAtCursor() {
        click(mouseType: .leftMouseUp, button: .left, clickCount: clickCount)
    }

    static func leftMouseDragAtCursor(to position: CGPoint) {
        let dragEvent = CGEvent(mouseEventSource: nil, mouseType: .leftMouseDragged, mouseCursorPosition: position, mouseButton: .left)
        dragEvent?.setIntegerValueField(.mouseEventClickState, value: Int64(clickCount))
        dragEvent?.post(tap: .cghidEventTap)
    }

    static func simulateDragWhileMouseDown(duration: TimeInterval = 1.0, interval: TimeInterval = 0.01) {
        let endTime = Date().addingTimeInterval(duration)
        var lastPos = currentCursorPos

        DispatchQueue.global(qos: .userInteractive).async {
            while Date() < endTime {
                let currentPos = currentCursorPos
                if currentPos != lastPos {
                    leftMouseDragAtCursor(to: currentPos)
                    lastPos = currentPos
                }
                usleep(useconds_t(interval * 1_000_000))
            }
        }
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
