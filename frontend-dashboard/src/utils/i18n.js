import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      start: "START",
      cursorGuide: "Using the given image above,\nlook straight at the center of the screen",
      directionKeyGuide: "Use the arrow keys\nto adjust your cursor position",
      prev: "Prev",
      next: "Next",
      skip: "Skip",
      cursor: "Cursor",
      cursorSensitivity: "Cursor Sensitivity",
      cursorReactionSpeed: "Cursor Reaction Speed",
      toggleMode: "Toggle Mode",
      leftClick: "Left Click",
      rightClick: "Right Click",
      cursorPause: "Pause Cursor",
      cursorUp: "Move Cursor Up",
      cursorDown: "Move Cursor Down",
      cursorLeft: "Move Cursor Left",
      cursorRight: "Move Cursor Right",
      shortcutSelection: "shortcut",
      scroll: "Scroll",
      scrollSpeed: "Scroll Speed",
      scrollPause: "Pause Scroll",
      macBattery: "Battery",
      signIn: "Sign in",
      signInInstruction: "Sign in with your account to connect to the app",
      signInButton: "Sign in with Google",
      runningTime: "Running Time",
    },
  },
  ko: {
    translation: {
      start: "시작",
      cursorGuide: "위 이미지를 참고해 정면을 바라봐 주세요",
      directionKeyGuide: "방향키를 눌러서 커서를 세부조정 해보세요",
      prev: "이전",
      next: "다음",
      skip: "넘김",
      cursor: "커서",
      cursorSensitivity: "커서 민감도",
      cursorReactionSpeed: "커서 반응속도",
      toggleMode: "모드 변환",
      leftClick: "왼쪽 클릭",
      rightClick: "오른쪽 클릭",
      cursorPause: "커서 일시정지",
      cursorUp: "커서 위로 이동",
      cursorDown: "커서 아래로 이동",
      cursorLeft: "커서 왼쪽으로 이동",
      cursorRight: "커서 오른쪽으로 이동",
      shortcutSelection: "단축키 선택",
      scroll: "스크롤",
      scrollSpeed: "스크롤 속도",
      scrollPause: "스크롤 일시정지",
      macBattery: "배터리",
      signIn: "로그인",
      signInInstruction: "Google 계정으로 로그인하고 macOS 앱과 연결하세요",
      signInButton: "Google로 로그인",
      runningTime: "앱 실행시간",
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "ko",
    detection: {
      order: ["navigator"],
      caches: [],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
