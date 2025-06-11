import Cocoa

class ToolBarViewController: NSViewController {
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

    override func viewDidLoad() {
        super.viewDidLoad()

        cursorSensitivitySlider.minValue = 1
        cursorSensitivitySlider.maxValue = 10
        cursorSensitivitySlider.doubleValue = cursorSensitivity
        cursorSensitivitySlider.numberOfTickMarks = 11
        cursorSensitivitySlider.allowsTickMarkValuesOnly = true

        cursorReactionSpeedSlider.minValue = 0.1
        cursorReactionSpeedSlider.maxValue = 1
        cursorReactionSpeedSlider.doubleValue = filterAlpha
        cursorReactionSpeedSlider.numberOfTickMarks = 11
        cursorReactionSpeedSlider.allowsTickMarkValuesOnly = true

        toggleModePopUp.removeAllItems()
        leftClickPopUp.removeAllItems()
        rightClickPopUp.removeAllItems()
        pauseControlPopUp.removeAllItems()
        moveCursorUpPopUp.removeAllItems()
        moveCursorDownPopUp.removeAllItems()
        moveCursorLeftPopUp.removeAllItems()
        moveCursorRightPopUp.removeAllItems()

        toggleModePopUp.addItems(withTitles: Array(keyNameToCode.keys).sorted())
        leftClickPopUp.addItems(withTitles: Array(keyNameToCode.keys).sorted())
        rightClickPopUp.addItems(withTitles: Array(keyNameToCode.keys).sorted())
        pauseControlPopUp.addItems(withTitles: Array(keyNameToCode.keys).sorted())
        moveCursorUpPopUp.addItems(withTitles: Array(keyNameToCode.keys).sorted())
        moveCursorDownPopUp.addItems(withTitles: Array(keyNameToCode.keys).sorted())
        moveCursorLeftPopUp.addItems(withTitles: Array(keyNameToCode.keys).sorted())
        moveCursorRightPopUp.addItems(withTitles: Array(keyNameToCode.keys).sorted())

        toggleModePopUp.selectItem(withTitle: "Tab")
        leftClickPopUp.selectItem(withTitle: "F9")
        rightClickPopUp.selectItem(withTitle: "F10")
        pauseControlPopUp.selectItem(withTitle: "F11")
        moveCursorUpPopUp.selectItem(withTitle: "ArrowUp")
        moveCursorDownPopUp.selectItem(withTitle: "ArrowDown")
        moveCursorLeftPopUp.selectItem(withTitle: "ArrowLeft")
        moveCursorRightPopUp.selectItem(withTitle: "ArrowRight")
    }

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
}

extension ToolBarViewController {
    // MARK: Storyboard instantiation
    static func freshController() -> ToolBarViewController {
        //1.
        let storyboard = NSStoryboard(name: NSStoryboard.Name("Main"), bundle: nil)
        //2.
        let identifier = NSStoryboard.SceneIdentifier("ToolBarViewController")
        //3.
        guard let viewcontroller = storyboard.instantiateController(withIdentifier: identifier) as? ToolBarViewController else {
            fatalError("Why cant i find ToolBarViewController? - Check Main.storyboard")
        }
        return viewcontroller
    }
}
