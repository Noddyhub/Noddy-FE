import Foundation
import CoreMotion

let motionManager = CMHeadphoneMotionManager()

if !motionManager.isDeviceMotionAvailable {
  print("에어팟 연결 안됨")
  exit(1)
} else {
    var lastPitch: Double = 0
    var lastYaw: Double = 0
    let sensitivity: Double = 0.01

    motionManager.startDeviceMotionUpdates(to: .main) { motion, error in
      guard let motion = motion else { return }

      let attitude = motion.attitude
      let pitch = attitude.pitch
      let yaw = -attitude.yaw

      if abs(pitch - lastPitch) > sensitivity || abs(yaw - lastYaw) > sensitivity {

        print(String(format: "pitch: %.2f, yaw: %.2f", pitch, yaw))

        lastPitch = pitch
        lastYaw = yaw
      }
    }
  }

RunLoop.main.run()
