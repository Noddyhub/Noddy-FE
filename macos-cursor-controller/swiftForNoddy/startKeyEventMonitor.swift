import Quartz

var isCursorMode: Bool = true

func startKeyEventMonitor() {
    print()
    let eventMask: Int = (1 << CGEventType.keyDown.rawValue)

    guard let eventTap: CFMachPort = CGEvent.tapCreate(
        tap: .cgSessionEventTap,
        place: .headInsertEventTap,
        options: .defaultTap,
        eventsOfInterest: CGEventMask(eventMask),
        callback: { _, type, event, _ in
            if type == .keyDown {
                let keyCode = event.getIntegerValueField(.keyboardEventKeycode)
                let flags = event.flags

                if keyCode == 48 && flags.contains(.maskControl) {
                    isCursorMode.toggle()
                    print("모드 : \(isCursorMode ? "Cursor Mode" : "Scroll Mode")")
                } else {
                    if isCursorMode {
                        if keyCode == 123 {
                            cursorEventHelper.leftClickAtCurrentCursor()
                        } else if keyCode == 124 {
                            cursorEventHelper.rightClickAtCurrentCursor()
                        }
                    } else {

                    }
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
