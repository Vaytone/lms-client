import { ActionCreatorWithPreparedPayload, AsyncThunk } from '@reduxjs/toolkit';

export interface DeleteModalProps {
  onDelete: () => void;
  text: string,
  title: string,
  onClose: () => void;
}
