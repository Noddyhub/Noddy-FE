import CoreMotion
import CoreGraphics
import AppKit
import SwiftUI

let motionManager = CMHeadphoneMotionManager()

let pitchOffset = 0.0
let yawOffset = 0.0

let screenFrame = NSScreen.main!.frame
var currentCursorPos = CGPoint(x: screenFrame.midX, y: screenFrame.midY)
var targetCursorPos = currentCursorPos

func lerp(_ a: CGFloat, _ b: CGFloat, t: CGFloat) -> CGFloat {
    return a + (b - a) * t
}

func moveCursor(to point: CGPoint) {
    let move = CGEvent(mouseEventSource: nil, mouseType: .mouseMoved, mouseCursorPosition: point, mouseButton: .left)
    move?.post(tap: .cghidEventTap)
}

guard motionManager.isDeviceMotionAvailable else {
    print("❌ 에어팟이 연결되지 않았습니다.")
    exit(1)
}

moveCursor(to: currentCursorPos)
print("🖱️ 커서를 화면 중앙으로 이동 완료")

motionManager.startDeviceMotionUpdates(to: .main) { motion, error in
    guard let motion = motion else { return }

    let attitude = motion.attitude
    let pitch = attitude.pitch
    let yaw = -attitude.yaw

    print("\(pitch)")
    print("\(yaw)")

    let normalizePi:Double = .pi / 5.5
    let normalizedPitch = ((pitch + pitchOffset) + normalizePi / 2) / normalizePi

    let normalizedYaw = ((yaw + yawOffset) + normalizePi) / (2 * normalizePi)

    let screenWidth = screenFrame.width
    let screenHeight = screenFrame.height

    let mappedX = screenWidth * CGFloat(normalizedYaw)
    let mappedY = screenHeight * (1 - CGFloat(normalizedPitch)) // Y는 위가 0

    targetCursorPos = CGPoint(x: mappedX, y: mappedY)

    print(String(format: "📐 pitch: %.2f, yaw: %.2f", pitch, yaw))
    print(String(format: "🎯 이동 → x: %.0f, y: %.0f", mappedX, mappedY))
}

Timer.scheduledTimer(withTimeInterval: 1.0 / 60.0, repeats: true) { _ in
    currentCursorPos.x = lerp(currentCursorPos.x, targetCursorPos.x, t: 0.2)
    currentCursorPos.y = lerp(currentCursorPos.y, targetCursorPos.y, t: 0.2)
    moveCursor(to: currentCursorPos)
}

RunLoop.main.run()
