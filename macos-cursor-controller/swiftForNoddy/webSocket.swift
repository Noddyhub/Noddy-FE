import Quartz

let uuid = "abc123"

let port = 8080
let websocketURL = URL(string: "ws://43.203.38.121:\(port)")!
let webSocketTask = URLSession(configuration: .default).webSocketTask(with: websocketURL)

struct ServerMessage: Codable {
    let type: String
    let name: String?
    let value: Double?
}

func sendPairingMessage() {
    let payload: [String: String] = [
        "type": "register-swift",
        "clientId": uuid
    ]

    if let data = try? JSONSerialization.data(withJSONObject: payload),
       let jsonString = String(data: data, encoding: .utf8) {
        let message = URLSessionWebSocketTask.Message.string(jsonString)
        webSocketTask.send(message) { error in
            if let error = error {
                print("❌ 페어링 메시지 전송 에러: \(error)")
            } else {
                print("✅ 페어링 메시지 전송 성공")
            }
        }
    }
}

func sendMotionData(pitch: Double, yaw: Double) {
    let payload: [String: Any] = ["type": "motion", "clientId": uuid, "pitch": pitch, "yaw": yaw]
    
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

func receiveDecodedData() {
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
                        if decoded.type == "control", let num = decoded.value, let name = decoded.name {
                            if name == "Cursor Sensitivity" {
                                cursorSensitivity = num
                            } else if name == "Cursor Reaction Speed" {
                                filterAlpha = num / 10
                            } else if name == "Scroll Speed" {
                                scrollSensitivity = invertedValue(sliderValue: num, minValue: 550, maxValue: 50)
                            }
                         }
                        
                        if decoded.type == "hotkey", let num = decoded.value, let name = decoded.name {
                            if name == "Toggle Mode" {
                                keyCodes.toggleMode = Int(num)
                            } else if name == "Left Click" {
                                keyCodes.leftClick = Int(num) - 65
                            } else if name == "Right Click" {
                                keyCodes.rightClick = Int(num)
                            } else if name == "Pause Cursor" {
                                keyCodes.motionPause = Int(num)
                            } else if name == "Move Cursor Up" {
                                keyCodes.pitchUp = Int(num)
                            } else if name == "Move Cursor Down" {
                                keyCodes.pitchDown = Int(num)
                            } else if name == "Move Cursor Left" {
                                keyCodes.yawLeft = Int(num)
                            } else if name == "Move Cursor Right" {
                                keyCodes.yawRight = Int(num)
                            } else if name == "Pause Scroll" {
                                keyCodes.toggleScroll = Int(num)
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

        receiveDecodedData()
    }
}
