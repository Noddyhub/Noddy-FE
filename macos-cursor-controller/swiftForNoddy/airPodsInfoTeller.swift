import IOBluetooth
import IOKit.ps

func fetchPairedAirPodsName() -> String? {
    if let devices = IOBluetoothDevice.pairedDevices() as? [IOBluetoothDevice] {
        for device in devices {
            if device.isConnected(), device.name.contains("AirPods") {
                return device.name
            }
        }
    }
    return nil
}

func fetchMacBatteryLevel() -> Int? {
    let info = IOPSCopyPowerSourcesInfo().takeRetainedValue()
    let sources: Array<CFTypeRef> = IOPSCopyPowerSourcesList(info).takeRetainedValue() as Array
    guard let source = sources.first,
          let description = IOPSGetPowerSourceDescription(info, source)?.takeUnretainedValue() as? [String: AnyObject],
          let level = description[kIOPSCurrentCapacityKey] as? Int else {
        return nil
    }
    return level
}

func runBluetoothBatteryCommand() -> String? {
    let command = "system_profiler SPBluetoothDataType | grep -i 'Battery Level'"
    let process = Process()
    let pipe = Pipe()
    process.standardOutput = pipe
    process.standardError = pipe
    process.launchPath = "/bin/bash"
    process.arguments = ["-c", command]
    process.launch()
    process.waitUntilExit()

    let data = pipe.fileHandleForReading.readDataToEndOfFile()
    return String(data: data, encoding: .utf8)
}

func parseAirPodsBatteryLevels(from output: String) {
    output.enumerateLines { line, _ in
        let cleanedLine = line.lowercased()
        let value = Int(line.components(separatedBy: CharacterSet.decimalDigits.inverted).joined())

        switch true {
        case cleanedLine.contains("left"):
            airPodsLeftBattery = value
        case cleanedLine.contains("right"):
            airPodsRightBattery = value
        default:
            break
        }
    }
}

func airPodsInfoTeller() {
    airPodsName = fetchPairedAirPodsName() ?? "N/A"
    MacBattery = fetchMacBatteryLevel() ?? 0

    if let output = runBluetoothBatteryCommand() {
        parseAirPodsBatteryLevels(from: output)
    }
}
