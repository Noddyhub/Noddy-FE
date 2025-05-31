import Quartz

var isCursorMode: Bool = true

let scrollEvent = ScrollEventHelper()

class KeyCode {
    static let Tab = 48
    static let F9 = 101
    static let F10 = 109
    static let F11 = 103
    static let PageUp = 116
    static let PageDown = 121
    static let ArrowUp = 126
    static let ArrowDown = 125
    static let ArrowLeft = 123
    static let ArrowRight = 124
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

                if keyCode == KeyCode.Tab && controlKey && type == .keyDown {
                    isCursorMode.toggle()
                    motionPaused.toggle()
                }

            switch isCursorMode {
            case true:
                scrollEvent.stopMonitoring()
                switch keyCodeInt {
                case KeyCode.F9 where type == .keyDown:
                    cursorEventHelper.leftMouseDownAtCursor()

                case KeyCode.F9 where type == .keyUp:
                    cursorEventHelper.leftMouseUpAtCursor()

                case KeyCode.F10 where type == .keyDown:
                    cursorEventHelper.rightMouseDownAtCursor()

                case KeyCode.F10 where type == .keyUp:
                    cursorEventHelper.rightMouseUpAtCursor()

                case KeyCode.F11 where type == .keyDown:
                    motionPaused.toggle()

                case KeyCode.PageUp where type == .keyDown:
                    cursorSensitivity += 0.5

                case KeyCode.PageDown where type == .keyDown:
                    if cursorSensitivity > 0.5 {
                        cursorSensitivity -= 0.5
                    }

                case KeyCode.ArrowUp where type == .keyDown:
                    pitchOffset += 0.01

                case KeyCode.ArrowDown where type == .keyDown:
                    pitchOffset -= 0.01

                case KeyCode.ArrowLeft where type == .keyDown:
                    yawOffset -= 0.01

                case KeyCode.ArrowRight where type == .keyDown:
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
