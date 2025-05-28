import Foundation
import CoreMotion
import CoreGraphics
import AppKit

let motionManager: CMHeadphoneMotionManager = CMHeadphoneMotionManager()

var isReferenceSet: Bool = false
var referencePitch: Double = 0
var referenceYaw: Double = 0

var lastPitch: Double = 0
var lastYaw: Double = 0

let sensitivity: Double = 0.005

let pitchScale: CGFloat = 3000.0
let yawScale: CGFloat = 3000.0

if !motionManager.isDeviceMotionAvailable {
    print("에어팟 연결 안됨")
    exit(1)
} else {
    motionManager.startDeviceMotionUpdates(to: .main) { motion, error in
        guard let motion: CMDeviceMotion = motion else { return }

        let attitude: CMAttitude = motion.attitude
        let pitch: Double = attitude.pitch
        let yaw: Double = -attitude.yaw

        if !isReferenceSet {
            referencePitch = pitch
            referenceYaw = yaw
            isReferenceSet = true
            print("✅ 기준 자세 설정 완료")
            return
        }

        let adjustedPitch: Double = pitch - referencePitch
        let adjustedYaw: Double = yaw - referenceYaw

        if abs(adjustedPitch - lastPitch) > sensitivity || abs(adjustedYaw - lastYaw) > sensitivity {
            print(String(format: "🎯 adjustedPitch: %.2f, adjustedYaw: %.2f", adjustedPitch, adjustedYaw))
            lastPitch = adjustedPitch
            lastYaw = adjustedYaw

            if let screen: NSScreen = NSScreen.main {
                let screenFrame: NSRect = screen.frame
                let screenCenter: CGPoint = CGPoint(x: screenFrame.midX, y: screenFrame.midY)

                let newX: CGFloat = screenCenter.x + CGFloat(adjustedYaw) * yawScale
                let newY: CGFloat = screenCenter.y - CGFloat(adjustedPitch) * pitchScale

                let move: CGEvent? = CGEvent(
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
