import Cocoa

class ToolBarViewController: NSViewController {
    // cursor mode
    @IBOutlet weak var cursorSensitivitySlider: NSSlider!
    @IBOutlet weak var cursorReactionSpeedSlider: NSSlider!

    @IBOutlet weak var toggleModePopUp: NSPopUpButton!
    @IBOutlet weak var leftClickPopUp: NSPopUpButton!
    @IBOutlet weak var rightClickPopUp: NSPopUpButton!
    @IBOutlet weak var pauseControlPopUp: NSPopUpButton!
    @IBOutlet weak var moveCursorUpPopUp: NSPopUpButton!
    @IBOutlet weak var moveCursorDownPopUp: NSPopUpButton!
    @IBOutlet weak var moveCursorLeftPopUp: NSPopUpButton!
    @IBOutlet weak var moveCursorRightPopUp: NSPopUpButton!

    // scroll mode
    @IBOutlet weak var scrollSensitivitySlider: NSSlider!
    @IBOutlet weak var pauseScrollPopUp: NSPopUpButton!

    override func viewDidLoad() {
        super.viewDidLoad()

        //cursor mode
        setSlider(cursorSensitivitySlider, min: 1, max: 10, value: cursorSensitivity, ticks: 11, bool: true)
        setSlider(cursorReactionSpeedSlider, min: 0.1, max: 1, value: filterAlpha, ticks: 11, bool: true)

        setPopupButton(toggleModePopUp, selectedItems: "Tab")
        setPopupButton(leftClickPopUp, selectedItems: "F9")
        setPopupButton(rightClickPopUp, selectedItems: "F10")
        setPopupButton(pauseControlPopUp, selectedItems: "F11")
        setPopupButton(moveCursorUpPopUp, selectedItems: "ArrowUp")
        setPopupButton(moveCursorDownPopUp, selectedItems: "ArrowDown")
        setPopupButton(moveCursorLeftPopUp, selectedItems: "ArrowLeft")
        setPopupButton(moveCursorRightPopUp, selectedItems: "ArrowRight")

        //scroll mode
        setSlider(scrollSensitivitySlider, min: 50, max: 550, value: scrollSensitivity, ticks: 11, bool: false)

        setPopupButton(pauseScrollPopUp, selectedItems: "Q")
    }

    // cursor mode
    @IBAction func cursorSensitivityChanged(_ sender: NSSlider) {
        cursorSensitivity = sender.doubleValue
    }
    @IBAction func cursorReactionSpeedChanged(_ sender: NSSlider) {
        filterAlpha = sender.doubleValue
    }

    @IBAction func toggleModeHotkeyChanged(_ sender: NSPopUpButton) {
        guard let selectedKey = sender.titleOfSelectedItem else { return }

        if let keyCode = keyNameToCode[selectedKey] {
            keyCodes.toggleMode = keyCode
        }
    }
    @IBAction func leftClickHotkeyChanged(_ sender: NSPopUpButton) {
        guard let selectedKey = sender.titleOfSelectedItem else { return }

        if let keyCode = keyNameToCode[selectedKey] {
            keyCodes.leftClick = keyCode
        }
    }
    @IBAction func rightClickHotkeyChanged(_ sender: NSPopUpButton) {
        guard let selectedKey = sender.titleOfSelectedItem else { return }

        if let keyCode = keyNameToCode[selectedKey] {
            keyCodes.rightClick = keyCode
        }
    }
    @IBAction func pauseControlHotkeyChanged(_ sender: NSPopUpButton) {
        guard let selectedKey = sender.titleOfSelectedItem else { return }

        if let keyCode = keyNameToCode[selectedKey] {
            keyCodes.motionPause = keyCode
        }
    }
    @IBAction func moveCursorUpHotkeyChanged(_ sender: NSPopUpButton) {
        guard let selectedKey = sender.titleOfSelectedItem else { return }

        if let keyCode = keyNameToCode[selectedKey] {
            keyCodes.pitchUp = keyCode
        }
    }
    @IBAction func moveCursorDownHotkeyChanged(_ sender: NSPopUpButton) {
        guard let selectedKey = sender.titleOfSelectedItem else { return }

        if let keyCode = keyNameToCode[selectedKey] {
            keyCodes.pitchDown = keyCode
        }
    }
    @IBAction func moveCursorLeftHotkeyChanged(_ sender: NSPopUpButton) {
        guard let selectedKey = sender.titleOfSelectedItem else { return }

        if let keyCode = keyNameToCode[selectedKey] {
            keyCodes.yawLeft = keyCode
        }
    }
    @IBAction func moveCursorRightHotkeyChanged(_ sender: NSPopUpButton) {
        guard let selectedKey = sender.titleOfSelectedItem else { return }

        if let keyCode = keyNameToCode[selectedKey] {
            keyCodes.yawRight = keyCode
        }
    }

    // scroll mode
    @IBAction func scrollSpeedChanged(_ sender: NSSlider) {
        scrollSensitivity = sender.doubleValue
    }
    @IBAction func toggleScrollHotkeyChanged(_ sender: NSPopUpButton) {
        guard let selectedKey = sender.titleOfSelectedItem else { return }

        if let keyCode = keyNameToCode[selectedKey] {
            keyCodes.toggleScroll = keyCode
        }
    }

    // terminate button
    @IBAction func quitApp(_ sender: Any) {
        NSApp.terminate(nil)
    }
}

extension ToolBarViewController {
    static func freshController() -> ToolBarViewController {

        let storyboard = NSStoryboard(name: NSStoryboard.Name("Main"), bundle: nil)

        let identifier = NSStoryboard.SceneIdentifier("ToolBarViewController")

        guard let viewcontroller = storyboard.instantiateController(withIdentifier: identifier) as? ToolBarViewController else {
            fatalError("Why cant i find ToolBarViewController? - Check Main.storyboard")
        }
        return viewcontroller
    }
}

private extension ToolBarViewController {
    func setSlider(_ slider: NSSlider, min: Double, max: Double, value: Double, ticks: Int, bool: Bool) {
        slider.minValue = min
        slider.maxValue = max
        slider.doubleValue = value
        slider.numberOfTickMarks = ticks
        slider.allowsTickMarkValuesOnly = bool
    }

    func setPopupButton(_ popupButton: NSPopUpButton, selectedItems: String) {
        popupButton.removeAllItems()
        popupButton.addItems(withTitles: sortedKeyNames)
        popupButton.selectItem(withTitle: selectedItems)
    }
}
