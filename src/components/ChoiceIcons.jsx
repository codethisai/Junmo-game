// 선택지 아이콘 (호감도, 대사, 재미)

export const HeartIcon = ({ color = "#FF4B72" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" fill="none">
    <path d="M8 14s-5.5-3.3-5.5-6.5C2.5 4.9 4.1 3.5 6 3.5c1.1 0 2.1 0.6 2 1.5 0-.9 0.9-1.5 2-1.5 1.9 0 3.5 1.4 3.5 4-0.1 3.2-5.5 6.5-5.5 6.5Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"/>
  </svg>
);

export const ChatIcon = ({ color = "#E0E0E0" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" fill="none">
    <path d="M13.5 3.5h-11c-.6 0-1 .4-1 1v6c0 .6.4 1 1 1h2.5l2.5 2.5 1-2.5h5c.6 0 1-.4 1-1v-6c0-.6-.4-1-1-1Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"/>
  </svg>
);

export const SmileIcon = ({ color = "#FFCC00" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" fill="none">
    <circle cx="8" cy="8" r="6.25" stroke={color} strokeWidth="1.5"/>
    <path d="M5 6.5c.3-.3.7-.3 1 0M10 6.5c.3-.3.7-.3 1 0" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M5 10c1 1.5 5 1.5 6 0" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const getChoiceIcon = (index, color) => {
  const icons = [HeartIcon, ChatIcon, SmileIcon];
  const Icon = icons[index] || HeartIcon;
  return <Icon color={color} />;
};
