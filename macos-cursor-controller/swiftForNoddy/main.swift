import CoreMotion
import CoreGraphics
import AppKit
import SwiftUI

let motionManager: CMHeadphoneMotionManager = CMHeadphoneMotionManager()

var isReferenceSet: Bool = false
var referencePitch: Double = 0
var referenceYaw: Double = 0

var lastPitch: Double = 0
var lastYaw: Double = 0

let sensitivity: Double = 0.02

let pitchScale: CGFloat = 1900.0
let yawScale: CGFloat = 1900.0

// 현재 커서 위치 상태 저장 (처음엔 화면 중앙)
let screenFrame = NSScreen.main!.frame
var currentCursorPos = CGPoint(x: screenFrame.midX, y: screenFrame.midY)

// 목표 위치 (adjustedPitch,Yaw 기반)
var targetCursorPos: CGPoint = currentCursorPos

func lerp(_ a: CGFloat, _ b: CGFloat, t: CGFloat) -> CGFloat { return a + (b - a) * t }

if !motionManager.isDeviceMotionAvailable {
    print("에어팟 연결 안됨")
    exit(1)
} else {
    if let screen = NSScreen.main {
        let screenFrame = screen.frame
        let screenCenter = CGPoint(x: screenFrame.midX, y: screenFrame.midY)

        // 초기 커서 위치를 화면 중앙으로 이동
        let initialMove = CGEvent(
            mouseEventSource: nil,
            mouseType: .mouseMoved,
            mouseCursorPosition: screenCenter,
            mouseButton: .left)
        initialMove?.post(tap: .cghidEventTap)

        // 상태 값도 갱신
        currentCursorPos = screenCenter
        targetCursorPos = screenCenter

        print("🖱️ 초기 커서 위치 중앙으로 이동 완료")
    }

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
            startKeyEventMonitor()
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

                targetCursorPos = CGPoint(x: newX, y: newY)
                print(String(format: "🖱️ Move to (x: %.1f, y: %.1f)", newX, newY))
            }
        }
    }

    Timer.scheduledTimer(withTimeInterval: 1.0 / 60.0, repeats: true) { _ in
        withAnimation(.linear(duration: 1.0 / 60.0)) {
            currentCursorPos.x = lerp(currentCursorPos.x, targetCursorPos.x, t:0.2)
            currentCursorPos.y = lerp(currentCursorPos.y, targetCursorPos.y, t:0.2)
        }

        let move: CGEvent? = CGEvent(
            mouseEventSource: nil,
            mouseType: .mouseMoved,
            mouseCursorPosition: currentCursorPos,
            mouseButton: .left)
        move?.post(tap: .cghidEventTap)
    }
}

RunLoop.main.run()
