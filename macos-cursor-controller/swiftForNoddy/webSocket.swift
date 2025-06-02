import Quartz

let port = 8080
let websocketURL = URL(string: "ws://3.38.190.239:\(port)")!
let webSocketTask = URLSession(configuration: .default).webSocketTask(with: websocketURL)

func sendMotionData(pitch: Double, yaw: Double) {
    let payload: [String: Double] = ["pitch": pitch, "yaw": yaw]

    if let data = try? JSONSerialization.data(withJSONObject: payload),
       let jsonString = String(data: data, encoding: .utf8) {
        let message = URLSessionWebSocketTask.Message.string(jsonString)
        webSocketTask.send(message) { error in
            if let error = error {
                print("❌ WebSocket 전송 에러: \(error)")
            }
        }
    }
}
