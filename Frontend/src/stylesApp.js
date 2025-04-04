import styled, { css, createGlobalStyle } from 'styled-components';

// Глобальные стили
export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
`;

// Темы оформления
export const lightTheme = {
  name: 'light',
  colors: {
    primary: '#3b82f6',
    primaryLight: '#93c5fd',
    primaryDark: '#1d4ed8',
    secondary: '#f3f4f6',
    secondaryLight: '#f9fafb',
    secondaryDark: '#e5e7eb',
    background: '#ffffff',
    text: '#111827',
    textLight: '#6b7280',
    error: '#ef4444',
    warning: '#f59e0b',
    success: '#10b981',
    border: '#e5e7eb',
    overlay: 'rgba(0,0,0,0.5)'
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0,0,0,0.05)',
    md: '0 4px 6px -1px rgba(0,0,0,0.1)',
    lg: '0 10px 15px -3px rgba(0,0,0,0.1)'
  }
};

export const darkTheme = {
  name: 'dark',
  colors: {
    primary: '#2563eb',
    primaryLight: '#1e40af',
    primaryDark: '#1e3a8a',
    secondary: '#1f2937',
    secondaryLight: '#374151',
    secondaryDark: '#111827',
    background: '#111827',
    text: '#f9fafb',
    textLight: '#d1d5db',
    error: '#dc2626',
    warning: '#d97706',
    success: '#059669',
    border: '#4b5563',
    overlay: 'rgba(0,0,0,0.7)'
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0,0,0,0.25)',
    md: '0 4px 6px -1px rgba(0,0,0,0.3)',
    lg: '0 10px 15px -3px rgba(0,0,0,0.35)'
  }
};

// Базовые стилизованные компоненты
export const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  transition: background-color 0.3s ease, color 0.3s ease;
`;

export const Sidebar = styled.div`
  width: 300px;
  background-color: ${props => props.theme.colors.secondary};
  border-right: 1px solid ${props => props.theme.colors.border};
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    border-right: none;
    border-bottom: 1px solid ${props => props.theme.colors.border};
  }
`;

export const Header = styled.div`
  padding: 20px;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  h2 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
  }
`;

export const ConnectionStatus = styled.div`
  color: ${props => props.status === 'online' ? props.theme.colors.success : props.theme.colors.error};
  font-size: 0.9em;
  margin-top: 5px;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: color 0.3s ease;
`;

export const ChatsList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px 0;
  scrollbar-width: thin;
  scrollbar-color: ${props => props.theme.colors.primary} ${props => props.theme.colors.secondary};

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.secondary};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${props => props.theme.colors.primary};
    border-radius: 3px;
  }
`;

export const ChatsHeader = styled.div`
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  h3 {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 500;
  }
`;

export const ChatItem = styled.div`
  padding: 12px 15px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.active ? '#ffffff' : props.theme.colors.text};
  transition: all 0.2s ease;
  border-left: 3px solid ${props => props.active ? props.theme.colors.primaryDark : 'transparent'};

  &:hover {
    background-color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.secondaryLight};
  }
`;

export const ChatName = styled.div`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.95rem;
`;

export const RenameInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  color: inherit;
  font-size: inherit;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.colors.border};

  &:focus {
    outline: 2px solid ${props => props.theme.colors.primaryLight};
  }
`;

export const ContextToggle = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  margin: 0 5px;
  font-weight: bold;
  padding: 5px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(255,255,255,0.1);
  }

  ${props => props.active && css`
    color: ${props.theme.colors.success};
  `}
`;

export const DeleteChatButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: 5px;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.error};
    background-color: rgba(255,255,255,0.1);
  }
`;

export const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const ChatHeader = styled.div`
  padding: 15px;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  h3 {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 500;
  }
`;

export const TokenCounter = styled.span`
  font-size: 0.8em;
  color: ${props => props.theme.colors.textLight};
  margin-left: 10px;
`;

export const MessagesList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  scrollbar-width: thin;
  scrollbar-color: ${props => props.theme.colors.primary} ${props => props.theme.colors.background};

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.background};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${props => props.theme.colors.primary};
    border-radius: 3px;
  }
`;

export const Message = styled.div`
  margin-bottom: 15px;
  padding: 12px 16px;
  border-radius: 8px;
  background-color: ${props => 
    props.isError ? props.theme.colors.error + '20' : 
    props.isUser ? props.theme.colors.secondary : props.theme.colors.primary};
  color: ${props => 
    props.isError ? props.theme.colors.error : 
    props.isUser ? props.theme.colors.text : '#ffffff'};
  align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  max-width: 85%;
  word-wrap: break-word;
  box-shadow: ${props => props.theme.shadows.sm};
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    max-width: 90%;
  }
`;

export const FileAttachments = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const FileItem = styled.div`
  font-size: 0.85em;
  margin: 3px 0;
  display: flex;
  align-items: center;
  gap: 5px;
  a {
    color: inherit;
    text-decoration: none;
    transition: color 0.2s ease;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const RemoveFileButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.error};
  cursor: pointer;
  margin-left: 5px;
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

export const MessageMeta = styled.div`
  font-size: 0.75em;
  color: ${props => props.isUser ? props.theme.colors.textLight : 'rgba(255,255,255,0.7)'};
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const InputContainer = styled.div`
  padding: 15px;
  border-top: 1px solid ${props => props.theme.colors.border};
  position: relative;
  background-color: ${props => props.theme.colors.background};
  transition: all 0.3s ease;
`;

export const InputTextarea = styled.textarea`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.colors.border};
  background-color: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.text};
  resize: none;
  min-height: 60px;
  font-family: inherit;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary + '20'};
  }

  &::placeholder {
    color: ${props => props.theme.colors.textLight};
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  margin-top: 10px;
  align-items: center;
  gap: 10px;
`;

export const NewChatButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background-color: ${props => props.theme.colors.primaryDark};
  }

  &:disabled {
    background-color: ${props => props.theme.colors.textLight};
    cursor: not-allowed;
  }
`;

export const SendButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 16px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background-color: ${props => props.theme.colors.primaryDark};
  }

  &:disabled {
    background-color: ${props => props.theme.colors.textLight};
    cursor: not-allowed;
  }
`;

export const AttachButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.theme.colors.primary};
  font-size: 1.2em;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.colors.secondaryLight};
  }

  &:disabled {
    color: ${props => props.theme.colors.textLight};
    cursor: not-allowed;
  }
`;

export const VoiceButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.theme.colors.primary};
  font-size: 1.2em;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.colors.secondaryLight};
  }

  &:disabled {
    color: ${props => props.theme.colors.textLight};
    cursor: not-allowed;
  }

  ${props => props.active && css`
    color: ${props.theme.colors.error};
    background-color: ${props.theme.colors.error + '20'};
  `}
`;

export const TypingIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  span {
    display: inline-block;
    width: 8px;
    height: 8px;
    background-color: ${props => props.theme.colors.text};
    border-radius: 50%;
    animation: bounce 1s infinite ease-in-out;
    
    &:nth-child(1) {
      animation-delay: 0s;
    }
    &:nth-child(2) {
      animation-delay: 0.2s;
    }
    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }
`;

export const SettingsToggle = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 5px;
  border-radius: 4px;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.colors.secondaryLight};
  }
`;

export const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 5px;
  border-radius: 4px;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.colors.secondaryLight};
  }
`;

export const SettingsOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props => props.theme.colors.overlay};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
`;

export const SettingsContainer = styled.div`
  background-color: ${props => props.theme.colors.background};
  border-radius: 8px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  border: 1px solid ${props => props.theme.colors.border};
  box-shadow: ${props => props.theme.shadows.lg};
  transition: all 0.3s ease;
`;

export const SettingsHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  h3 {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 500;
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
  color: ${props => props.theme.colors.text};
  padding: 0;
  line-height: 1;
  transition: color 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

export const SettingsTabs = styled.div`
  display: flex;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const TabButton = styled.button`
  flex: 1;
  min-width: 120px;
  padding: 12px;
  background: none;
  border: none;
  cursor: pointer;
  border-bottom: 3px solid ${props => props.active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.text};
  font-weight: ${props => props.active ? '500' : '400'};
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background-color: ${props => props.theme.colors.secondaryLight};
  }
`;

export const SettingsContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const SettingGroup = styled.div`
  margin-bottom: 16px;
  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    font-size: 0.95rem;
    color: ${props => props.theme.colors.text};
  }

  p {
    margin: 4px 0 0 0;
    font-size: 0.8em;
    color: ${props => props.theme.colors.textLight};
  }
`;

export const RangeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  input[type="range"] {
    flex: 1;
    height: 6px;
    border-radius: 3px;
    background: ${props => props.theme.colors.secondary};
    outline: none;
    -webkit-appearance: none;
    transition: all 0.3s ease;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: ${props => props.theme.colors.primary};
      cursor: pointer;
      transition: all 0.2s ease;
    }
  }
`;

export const RangeValue = styled.span`
  min-width: 40px;
  text-align: center;
  font-family: monospace;
  color: ${props => props.theme.colors.text};
`;

export const SelectInput = styled.select`
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid ${props => props.theme.colors.border};
  background-color: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.text};
  font-family: inherit;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary + '20'};
  }

  option {
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  cursor: pointer;
  user-select: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

export const CheckboxInput = styled.input.attrs({ type: 'checkbox' })`
  margin-right: 8px;
  width: 16px;
  height: 16px;
  accent-color: ${props => props.theme.colors.primary};
  cursor: pointer;
`;

export const NumberInput = styled.input.attrs({ type: 'number' })`
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid ${props => props.theme.colors.border};
  background-color: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.text};
  font-family: inherit;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary + '20'};
  }
`;

export const SettingsFooter = styled.div`
  padding: 16px;
  border-top: 1px solid ${props => props.theme.colors.border};
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

export const SaveButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 6px;
  padding: 10px 16px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.colors.primaryDark};
  }
`;

export const ResetButton = styled.button`
  background-color: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.text};
  border: none;
  border-radius: 6px;
  padding: 10px 16px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.colors.secondaryDark};
  }
`;

export const DropZoneOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props => props.theme.colors.primary + '10'};
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  border: 2px dashed ${props => props.theme.colors.primary};
  border-radius: 8px;
  pointer-events: none;
  font-size: 1.1rem;
  z-index: 10;
`;

export const StatusMessage = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  border-radius: 8px;
  box-shadow: ${props => props.theme.shadows.md};
  border: 1px solid ${props => props.theme.colors.border};
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  opacity: ${props => props.visible ? 1 : 0};
  pointer-events: ${props => props.visible ? 'auto' : 'none'};
`;