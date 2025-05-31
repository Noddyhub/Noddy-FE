import Cocoa
import Quartz

var scrollSpeed: CGFloat = 10
var scrollStartDeltaY: CGFloat = 90

class ScrollEventHelper {
    private var centerPoint: CGPoint
    private var monitoringTimer: Timer?
    var isScrolling = false
    var isMonitoring = false

    init() {
        if let screen = NSScreen.main {
            centerPoint = CGPoint(x: screen.frame.midX, y: screen.frame.midY)
        } else {
            centerPoint = CGPoint.zero
        }
    }

    func startMonitoring() {
        guard monitoringTimer == nil else { return }
        isMonitoring = true

        monitoringTimer = Timer.scheduledTimer(withTimeInterval: 0.02, repeats: true) { [weak self] _ in
            self?.checkDistanceFromCenter()
        }

        RunLoop.main.add(monitoringTimer!, forMode: .common)
    }

    func stopMonitoring() {
        monitoringTimer?.invalidate()
        monitoringTimer = nil
        isMonitoring = false
    }

    private func checkDistanceFromCenter() {
        guard !isCursorMode else { return }
        guard isScrolling else { return }

        let deltaY = pitchForScroll - centerPoint.y

        if -deltaY > scrollStartDeltaY {
            self.postScrollWheelEvent(deltaY: Int32(scrollSpeed))
            CGDisplayMoveCursorToPoint(CGMainDisplayID(), currentCursorPos)
        } else if -deltaY < -scrollStartDeltaY {
            self.postScrollWheelEvent(deltaY: Int32(-scrollSpeed))
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
