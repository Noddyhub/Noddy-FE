import Quartz
import CoreMotion

let motionManager = CMHeadphoneMotionManager()

guard motionManager.isDeviceMotionAvailable else {
    print("에어팟이 연결 안됨.")
    exit(1)
}

func moveCursor(to point: CGPoint) {
    let move = CGEvent(mouseEventSource: nil, mouseType: .mouseMoved, mouseCursorPosition: point, mouseButton: .left)
    move?.post(tap: .cghidEventTap)
}

startKeyEventMonitor()
moveCursor(to: currentCursorPos)
motionManager.startDeviceMotionUpdates(to: .main) { motion, error in
    guard let motion = motion else { return }

    let attitude = motion.attitude
    let pitch = attitude.pitch
    let yaw = -attitude.yaw

    filteredPitch = filteredPitch + filterAlpha * (pitch - filteredPitch)
    filteredYaw = filteredYaw + filterAlpha * (yaw - filteredYaw)

    let movementThreshold = 0.0088
    let finalPitch = abs(filteredPitch) < movementThreshold ? 0 : filteredPitch
    let finalYaw = abs(filteredYaw) < movementThreshold ? 0 : filteredYaw

    let normalizePi: Double = .pi / cursorSensitivity
    let normalizedPitch = ((finalPitch) + normalizePi / 2) / normalizePi + pitchOffset
    let normalizedYaw = ((finalYaw) + normalizePi) / (2 * normalizePi) + yawOffset

    let screenWidth = screenFrame.width
    let screenHeight = screenFrame.height

    let mappedX = screenWidth * CGFloat(normalizedYaw)
    let mappedY = screenHeight * (1 - CGFloat(normalizedPitch))

    pitchForScroll = mappedY

    targetCursorPos = CGPoint(x: mappedX, y: mappedY)
}

Timer.scheduledTimer(withTimeInterval: 1.0 / 60.0, repeats: true) { _ in
    guard !isMotionPaused else { return }

    func lerp(_ a: CGFloat, _ b: CGFloat, t: CGFloat) -> CGFloat {
        return a + (b - a) * t
    }

    currentCursorPos.x = lerp(currentCursorPos.x, targetCursorPos.x, t: 0.2)
    currentCursorPos.y = lerp(currentCursorPos.y, targetCursorPos.y, t: 0.2)
    moveCursor(to: currentCursorPos)
}

RunLoop.main.run()
