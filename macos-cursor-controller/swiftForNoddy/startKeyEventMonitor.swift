import Quartz

var isCursorMode: Bool = true

let scrollEvent = ScrollEventHelper()

class KeyCode {
    static let TAB: Int = 48
    static let F9: Int = 101
    static let F10: Int = 109
    static let F11: Int = 103
    static let PAGE_UP: Int = 116
    static let PAGE_DOWN: Int = 121
    static let ARROW_UP: Int = 126
    static let ARROW_DOWN: Int = 125
    static let ARROW_LEFT: Int = 123
    static let ARROW_RIGHT: Int = 124
}

func startKeyEventMonitor() {
    let eventMask: Int = (1 << CGEventType.keyDown.rawValue) | (1 << CGEventType.keyUp.rawValue)

    guard let eventTap: CFMachPort = CGEvent.tapCreate(
        tap: .cgSessionEventTap,
        place: .headInsertEventTap,
        options: .defaultTap,
        eventsOfInterest: CGEventMask(eventMask),
        callback: { _, type, event, _ in
                let keyCode = event.getIntegerValueField(.keyboardEventKeycode)
                let keyCodeInt = Int(keyCode)
                let controlKey = event.flags.contains(.maskControl)

                if keyCode == KeyCode.TAB && controlKey && type == .keyDown {
                    isCursorMode.toggle()
                    motionPaused.toggle()
                }

            switch isCursorMode {
            case true:
                scrollEvent.stopMonitoring()
                switch keyCodeInt {
                case KeyCode.F9 where type == .keyDown:
                    CursorEventHelper.leftMouseDownAtCursor()

                case KeyCode.F9 where type == .keyUp:
                    CursorEventHelper.leftMouseUpAtCursor()

                case KeyCode.F10 where type == .keyDown:
                    CursorEventHelper.rightMouseDownAtCursor()

                case KeyCode.F10 where type == .keyUp:
                    CursorEventHelper.rightMouseUpAtCursor()

                case KeyCode.F11 where type == .keyDown:
                    motionPaused.toggle()

                case KeyCode.PAGE_UP where type == .keyDown:
                    CursorSensitivity += 0.5

                case KeyCode.PAGE_DOWN where type == .keyDown:
                    if cursorSensitivity > 0.5 {
                        cursorSensitivity -= 0.5
                    }

                case KeyCode.ARROW_UP where type == .keyDown:
                    pitchOffset += 0.01

                case KeyCode.ARROW_DOWN where type == .keyDown:
                    pitchOffset -= 0.01

                case KeyCode.ARROW_LEFT where type == .keyDown:
                    yawOffset -= 0.01

                case KeyCode.ARROW_RIGHT where type == .keyDown:
                    yawOffset += 0.01

                default:
                    break
                }
            case false:
                scrollEvent.startMonitoring()
            }
            return Unmanaged.passRetained(event)
        },
        userInfo: nil
    ) else {
        exit(1)
    }

    let runLoopSource: CFRunLoopSource? = CFMachPortCreateRunLoopSource(kCFAllocatorDefault, eventTap, 0)
    CFRunLoopAddSource(CFRunLoopGetCurrent(), runLoopSource, .commonModes)
    CGEvent.tapEnable(tap: eventTap, enable: true)
}
