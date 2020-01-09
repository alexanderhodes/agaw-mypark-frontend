
export interface ModalConfiguration {
  id: string;
  title: string;
  text: string;
  closeText?: string;
}

export interface Message {
  success: boolean;
  text: string;
}
