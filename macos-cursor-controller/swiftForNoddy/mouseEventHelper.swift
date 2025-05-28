import AppKit
import Quartz

struct mouseEventHelper {
    static func leftClickAtCurrentCursor() {
        click(mouseTypeDown: .leftMouseDown, mouseTypeUp: .leftMouseUp, button: .left)
    }

    static func rightClickAtCurrentCursor() {
        click(mouseTypeDown: .rightMouseDown, mouseTypeUp: .rightMouseUp, button: .right)
    }

    private static func click(mouseTypeDown: CGEventType, mouseTypeUp: CGEventType, button: CGMouseButton) {
        let screenHeight: CGFloat = NSScreen.screens.first?.frame.height ?? 0
        let location: NSPoint = NSEvent.mouseLocation
        let flippedLocation: CGPoint = CGPoint(x: location.x, y: screenHeight - location.y)

        let mouseDown: CGEvent? = CGEvent(mouseEventSource: nil, mouseType: mouseTypeDown, mouseCursorPosition: flippedLocation, mouseButton: button)
        let mouseUp: CGEvent? = CGEvent(mouseEventSource: nil, mouseType: mouseTypeUp, mouseCursorPosition: flippedLocation, mouseButton: button)

        mouseDown?.post(tap: .cghidEventTap)
        mouseUp?.post(tap: .cghidEventTap)
    }
}
