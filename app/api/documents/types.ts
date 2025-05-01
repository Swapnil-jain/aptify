export interface Document {
  id: string;
  file_name: string;
  created_at: string;
  category: string;
  size: string;
}

export interface Message {
  text: string;
  isUser: boolean;
  timestamp: string;
} 