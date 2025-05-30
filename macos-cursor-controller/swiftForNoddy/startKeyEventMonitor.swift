import Quartz

var isCursorMode: Bool = true

func startKeyEventMonitor() {
    let eventMask: Int = (1 << CGEventType.keyDown.rawValue) | (1 << CGEventType.keyUp.rawValue)

    guard let eventTap: CFMachPort = CGEvent.tapCreate(
        tap: .cgSessionEventTap,
        place: .headInsertEventTap,
        options: .defaultTap,
        eventsOfInterest: CGEventMask(eventMask),
        callback: { _, type, event, _ in
                let keyCode = event.getIntegerValueField(.keyboardEventKeycode)
                let flags = event.flags

                if keyCode == 48 && flags.contains(.maskControl) && type == .keyDown {
                    isCursorMode.toggle()
                    print("모드 : \(isCursorMode ? "Cursor Mode" : "Scroll Mode")")
                }

                if isCursorMode {
                    switch keyCode {
                    case 101 where type == .keyDown:
                        cursorEventHelper.leftMouseDownAtCursor()

                    case 101 where type == .keyUp:
                        cursorEventHelper.leftMouseUpAtCursor()

                    case 109 where type == .keyDown:
                        cursorEventHelper.rightMouseDownAtCursor()

                    case 109 where type == .keyUp:
                        cursorEventHelper.rightMouseUpAtCursor()

                    case 103 where type == .keyDown:
                        motionPaused.toggle()

                    case 116 where type == .keyDown:
                        cursorSensitivity += 0.5

                    case 121 where type == .keyDown:
                        if cursorSensitivity > 0.5 {
                            cursorSensitivity -= 0.5
                        }

                    case 126 where type == .keyDown:
                        pitchOffset += 0.01

                    case 125 where type == .keyDown:
                        pitchOffset -= 0.01

                    case 123 where type == .keyDown:
                        yawOffset -= 0.01

                    case 124 where type == .keyDown:
                        yawOffset += 0.01

                    default:
                        break
                    }
                } else {

                }
            return Unmanaged.passRetained(event)
        },
        userInfo: nil
    ) else {
        print("에러 : 권한 없음")
        exit(1)
    }

    let runLoopSource: CFRunLoopSource? = CFMachPortCreateRunLoopSource(kCFAllocatorDefault, eventTap, 0)
    CFRunLoopAddSource(CFRunLoopGetCurrent(), runLoopSource, .commonModes)
    CGEvent.tapEnable(tap: eventTap, enable: true)
}
