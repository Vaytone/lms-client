export interface EditPhoto {
  photo: File,
  onEditComplete: (file: File) => void,
  onClose: () => void,
}
