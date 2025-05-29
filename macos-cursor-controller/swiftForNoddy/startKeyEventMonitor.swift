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

                if keyCode == 48 && flags.contains(.maskControl) {
                    isCursorMode.toggle()
                    print("모드 : \(isCursorMode ? "Cursor Mode" : "Scroll Mode")")
                } else {
                    if isCursorMode {
                        if keyCode == 123 {
                            if type == .keyDown {
                                cursorEventHelper.leftMouseDownAtCursor()
                            } else if type == .keyUp {
                                cursorEventHelper.leftMouseUpAtCursor()
                            }
                        } else if keyCode == 124 {
                            if type == .keyDown {
                                cursorEventHelper.rightMouseDownAtCursor()
                            } else if type == .keyUp {
                                cursorEventHelper.rightMouseUpAtCursor()
                            }
                        } else if keyCode == 125 {
                            if type == .keyDown {
                                motionPaused.toggle()
                            }
                        }
                    } else {

                    }
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
