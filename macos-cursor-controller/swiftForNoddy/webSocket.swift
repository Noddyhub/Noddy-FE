import Quartz

let port = 8080
let websocketURL = URL(string: "ws://public ip\(port)")!
let webSocketTask = URLSession(configuration: .default).webSocketTask(with: websocketURL)

struct ServerMessage: Codable {
    let type: String
    let name: String?
    let value: Double?
}

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

func receiveMessage() {
    webSocketTask.receive { result in
        switch result {
        case .failure(let error):
            print("❌ WebSocket 수신 에러: \(error)")
        case .success(let message):
            switch message {
            case .string(let text):
                if let data = text.data(using: .utf8) {
                    do {
                        let decoded = try JSONDecoder().decode(ServerMessage.self, from: data)
                        if decoded.type == "number", let num = decoded.value, let name = decoded.name {
                            if name == "Cursor Sensitivity" {
                                cursorSensitivity = num
                            } else if name == "Cursor Reaction Speed" {
                                filterAlpha = num / 10
                            } else if name == "Scroll Speed" {
                                scrollSensitivity = invertedValue(sliderValue: num, minValue: 550, maxValue: 50)
                            }
                        }
                    } catch {
                        print("❌ JSON 디코딩 실패: \(error)")
                    }
                }
            case .data(let data):
                print("📥 수신된 바이너리 데이터: \(data)")
            @unknown default:
                print("⚠️ 알 수 없는 메시지 타입")
            }
        }

        receiveMessage()
    }
}
