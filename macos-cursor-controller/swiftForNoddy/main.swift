import Foundation
import CoreMotion
import CoreGraphics

let motionManager = CMHeadphoneMotionManager()

var isReferenceSet = false
var referencePitch: Double = 0
var referenceYaw: Double = 0

var lastPitch: Double = 0
var lastYaw: Double = 0

let sensitivity: Double = 0.01

let pitchScale: CGFloat = 100.0
let yawScale: CGFloat = 100.0

if !motionManager.isDeviceMotionAvailable {
    print("에어팟 연결 안됨")
    exit(1)
} else {
    motionManager.startDeviceMotionUpdates(to: .main) { motion, error in
        guard let motion = motion else { return }

        let attitude = motion.attitude
        let pitch = attitude.pitch
        let yaw = -attitude.yaw

        if !isReferenceSet {
            referencePitch = pitch
            referenceYaw = yaw
            isReferenceSet = true
            print("✅ 기준 자세 설정 완료")
            return
        }

        let adjustedPitch = pitch - referencePitch
        let adjustedYaw = yaw - referenceYaw

        if abs(adjustedPitch - lastPitch) > sensitivity || abs(adjustedYaw - lastYaw) > sensitivity {
            print(String(format: "🎯 adjustedPitch: %.2f, adjustedYaw: %.2f", adjustedPitch, adjustedYaw))
            lastPitch = adjustedPitch
            lastYaw = adjustedYaw

            if let loc = CGEvent(source: nil)?.location {
                let dx = CGFloat(adjustedYaw) * yawScale
                let dy = CGFloat(adjustedPitch) * pitchScale

                let newX = loc.x + dx
                let newY = loc.y - dy

                let move = CGEvent(
                    mouseEventSource: nil,
                    mouseType: .mouseMoved,
                    mouseCursorPosition: CGPoint(x: newX, y: newY),
                    mouseButton: .left)
                move?.post(tap: .cghidEventTap)

                print(String(format: "🖱️ Move to (x: %.1f, y: %.1f)", newX, newY))
            }
        }
    }
}

RunLoop.main.run()
