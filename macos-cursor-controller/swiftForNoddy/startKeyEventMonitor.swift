import Quartz

func startKeyEventMonitor() {
    let eventMask: Int = (1 << CGEventType.keyDown.rawValue)

    guard let eventTap: CFMachPort = CGEvent.tapCreate(
        tap: .cgSessionEventTap,
        place: .headInsertEventTap,
        options: .defaultTap,
        eventsOfInterest: CGEventMask(eventMask),
        callback: { _, type, event, _ in
            if type == .keyDown {
                let keyCode: Int64 = event.getIntegerValueField(.keyboardEventKeycode)

                if keyCode == 101 {
                    mouseEventHelper.leftClickAtCurrentCursor()
                } else if keyCode == 109 {
                    mouseEventHelper.rightClickAtCurrentCursor()
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
