// 게임 UI 아이콘 (저장, 알람)

export const SaveIcon = ({ color = "#4A90E2" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" fill="none">
    <path d="M2.5 2.5h8.5l2.5 2.5v8.5c0 .6-.4 1-1 1h-10c-.6 0-1-.4-1-1v-10c0-.6.4-1 1-1Z"
          stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M5.5 2.5v3h4v-3" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M4.5 14.5v-4h7v4" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
);

export const AlarmIcon = ({ color = "#FF3B30" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" fill="none">
    <path d="M4 11a4 4 0 0 1 8 0v1.5H4V11z"
          stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M2 12.5h12"
          stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M8 2v1.5M3.5 4.5l1 1M12.5 4.5l-1 1"
          stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
