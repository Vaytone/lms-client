import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Cropper, { Area } from 'react-easy-crop';
import cn from 'classnames';
import { generateCroppedPhoto } from '@shared/helper/photoEdit';
import { getNotification } from '@shared/helper/notification';
import { NotificationTypeEnum } from '@type/notification.types';
import { EditPhoto } from './types';
import styles from './PhotoEditor.module.scss';

const PhotoEditor: React.FC<EditPhoto> = ({ photo, onEditComplete, onClose }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = React.useState(null);
  const blob = useMemo(() => URL.createObjectURL(photo), []);
  
  const onCropComplete = (_: Area, croppedAreaPixels: Area) => {
    setCroppedArea(croppedAreaPixels);
  };
  const { t } = useTranslation();
  
  const handleSave = () => {
    generateCroppedPhoto(photo, croppedArea)
      .then((result) => {
        if (result) {
          onEditComplete(result);
        } else {
          getNotification(t('error.somethingWentWrong'), NotificationTypeEnum.error);
        }
      });
  };
  
  return (
    <div className={styles.PhotoEditorBg}>
      <span className={cn(styles.PhotoEditorClose, 'icon-cross')} onClick={onClose}/>
      <Cropper
        image={blob}
        crop={crop}
        zoom={zoom}
        classes={{
          containerClassName: styles.PhotoEditorWrapper,
          mediaClassName: styles.PhotoMediaWrapper,
          cropAreaClassName: styles.PhotoCropperWrapper,
        }}
        aspect={4 / 4}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
      />
      <div className={styles.PhotoEditorButtons}>
        <span
          onClick={onClose}
        >
          {t('core.cancel')}
        </span>
        <span
          onClick={handleSave}
        >
          {t('core.savePhoto')}
        </span>
      </div>
    </div>
  );
};

export default PhotoEditor;
