import { ModalIdEnum } from "../constants/modals.constants";
import { Document } from "./document.interface";

export interface EmailListProps {
  document: Document;
  onClose: (modalId?: ModalIdEnum) => void;
}
