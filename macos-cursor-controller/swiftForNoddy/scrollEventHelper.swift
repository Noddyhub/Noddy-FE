import Cocoa
import Quartz

class ScrollEventHelper {
    private var centerPoint: CGPoint
    private var monitoringTimer: Timer?

    init() {
        if let screen = NSScreen.main {
            centerPoint = CGPoint(x: screen.frame.midX, y: screen.frame.midY)
        } else {
            centerPoint = CGPoint.zero
        }
    }

    func startMonitoring() {
        monitoringTimer = Timer.scheduledTimer(withTimeInterval: 0.02, repeats: true) { [weak self] _ in
            self?.checkDistanceFromCenter()
        }

        RunLoop.main.add(monitoringTimer!, forMode: .common)
    }

    func stopMonitoring() {
        monitoringTimer?.invalidate()
        monitoringTimer = nil
    }

    private func checkDistanceFromCenter() {
        guard !isCursorMode else { return }
        let deltaY = pitchForScroll - centerPoint.y

        if -deltaY > 90 {
            self.postScrollWheelEvent(deltaY: 10)
            CGDisplayMoveCursorToPoint(CGMainDisplayID(), currentCursorPos)
        } else if -deltaY < -90 {
            self.postScrollWheelEvent(deltaY: -10)
            CGDisplayMoveCursorToPoint(CGMainDisplayID(), currentCursorPos)
        }
    }

    private func postScrollWheelEvent(deltaY: Int32) {
        guard let event = CGEvent(
            scrollWheelEvent2Source: nil,
            units: .pixel,
            wheelCount: 1,
            wheel1: deltaY,
            wheel2: 0,
            wheel3: 0) else {
                return
            }

        event.post(tap: .cghidEventTap)
    }
}
