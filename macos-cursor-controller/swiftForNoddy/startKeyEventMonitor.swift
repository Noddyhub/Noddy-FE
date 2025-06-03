import Quartz

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

            if keyCode == keyCodes.toggleMode && controlKey && type == .keyDown {
                    isCursorMode.toggle()
                    isMotionPaused.toggle()
                }

            switch isCursorMode {
            case true:
                scrollEvent.stopMonitoring()
                switch keyCodeInt {
                case keyCodes.leftClick where type == .keyDown:
                    CursorEventHelper.leftMouseDownAtCursor()

                case keyCodes.leftClick where type == .keyUp:
                    CursorEventHelper.leftMouseUpAtCursor()

                case keyCodes.rightClick where type == .keyDown:
                    CursorEventHelper.rightMouseAtCursor(down: true)

                case keyCodes.rightClick where type == .keyUp:
                    CursorEventHelper.rightMouseAtCursor(down: false)

                case keyCodes.motionPause where type == .keyDown:
                    isMotionPaused.toggle()

                case keyCodes.increaseSensitivity where type == .keyDown:
                    cursorSensitivity += 0.5

                case keyCodes.decreaseSensitivity where type == .keyDown:
                    if cursorSensitivity > 0.5 {
                        cursorSensitivity -= 0.5
                    }

                case keyCodes.pitchUp where type == .keyDown:
                    pitchOffset += 0.05

                case keyCodes.pitchDown where type == .keyDown:
                    pitchOffset -= 0.05

                case keyCodes.yawLeft where type == .keyDown:
                    yawOffset -= 0.05

                case keyCodes.yawRight where type == .keyDown:
                    yawOffset += 0.05

                case keyCodes.increaseCursorReactionSpeed where type == .keyDown:
                    if filterAlpha < 1 {
                        filterAlpha += 0.05
                    }

                case keyCodes.decreaseCursorReactionSpeed where type == .keyDown:
                    if filterAlpha > 0.05 {
                        filterAlpha -= 0.05
                    }

                default:
                    break
                }
            case false:
                if !scrollEvent.isMonitoring {
                    scrollEvent.startMonitoring()
                    scrollEvent.isScrolling = true
                }

                switch keyCodeInt {
                case keyCodes.toggleScroll where type == .keyDown:
                    scrollEvent.isScrolling.toggle()

                case keyCodes.increaseScrollSpeed where type == .keyDown:
                    if scrollSensitivity > 10 {
                        scrollSensitivity -= 10
                    }

                case keyCodes.decreaseScrollSpeed where type == .keyDown:
                    scrollSensitivity += 10

                default:
                    break
                }
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

@objc(KeySettingManager)
class KeySettingManager: NSObject {
    @objc static func requiresMainQueueSetup() -> Bool {
        return true
    }

    @objc func updateKeySetting(_ action: NSString, keyCode: NSNumber) {
        let code = keyCode.intValue
        switch action as String {
        case "toggleMode": keyCodes.toggleMode = code
        case "leftClick": keyCodes.leftClick = code
        case "rightClick": keyCodes.rightClick = code
        case "motionPause": keyCodes.motionPause = code
        case "increaseSensitivity": keyCodes.increaseSensitivity = code
        case "decreaseSensitivity": keyCodes.decreaseSensitivity = code
        case "pitchUp": keyCodes.pitchUp = code
        case "pitchDown": keyCodes.pitchDown = code
        case "yawLeft": keyCodes.yawLeft = code
        case "yawRight": keyCodes.yawRight = code
        case "toggleScroll": keyCodes.toggleScroll = code
        case "increaseScrollSpeed": keyCodes.increaseScrollSpeed = code
        case "decreaseScrollSpeed": keyCodes.decreaseScrollSpeed = code
        case "increaseCursorReactionSpeed": keyCodes.increaseCursorReactionSpeed = code
        case "decreaseCursorReactionSpeed": keyCodes.decreaseCursorReactionSpeed = code

        default:
            print("Unknown action: \(action)")
        }
    }
}
