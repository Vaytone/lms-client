import React from 'react';
import { Controller } from 'react-hook-form';
import Button from '@components/ui/Button/Button';
import { AvatarFormStepProps } from '@modules/auth/components/AvatarFormStep/types';
import { useTranslation } from 'react-i18next';
import { RegisterStepEnum } from '@modules/auth/types/auth.types';
import PhotoEditor from '@components/PhotoEditor/PhotoEditor';
import cn from 'classnames';
import BackButton from '@components/ui/BackButton/BackButton';
import styles from './AvatarFormStep.module.scss';

const AvatarFormStep: React.FC<AvatarFormStepProps> = ({ setStep, control, setValue, getValues, photoState, setPhotoState }) => {
  const avatar = getValues('avatar');
  const { t } = useTranslation();
  
  const handleBack = () => {
    setStep(RegisterStepEnum.Personal);
  };
  
  const handleNext = () => {
    setStep(RegisterStepEnum.Confirm);
  };
  
  const handleSave = (img: File) => {
    setPhotoState((prev) => {
      return {
        ...prev,
        avatar: img,
        isEditOpen: false,
      };
    });
    setValue('avatar', img);
  };
  
  const handleClose = () => {
    setPhotoState((prev) => {
      return {
        ...prev,
        photo: null,
        isEditOpen: false,
      };
    });
  };
  
  const handleOpen = () => {
    setPhotoState((prev) => {
      return {
        ...prev,
        isEditOpen: true,
      };
    });
  };
  
  const handleDeletePhoto = () => {
    setPhotoState((prev) => {
      return {
        ...prev,
        photo: null,
      };
    });
    setValue('avatar', null);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files[0]) {
      setPhotoState((prev) => {
        return {
          ...prev,
          photo: e.target.files[0],
          isEditOpen: true,
        };
      });
    }
  };
  
  return (
    <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
      <div style={{ height: '40px' }}>
        <BackButton onBack={handleBack}/>
      </div>
      <div className={styles.AvatarStepWrapper}>
        {photoState.isEditOpen && (
          <PhotoEditor
            photo={photoState.photo}
            onEditComplete={handleSave}
            onClose={handleClose}
          />
        )}
        <h3 className={styles.StepTitle}>{t('auth.avatarTitle')}</h3>
        <p className={styles.StepDescription}>
          {t('auth.avatarDescription')}
        </p>
        <Controller
          name="avatar"
          control={control}
          render={({ field }) => (
            <div className={cn(styles.ChangeAvatarWrapper, !avatar && styles.ChangeAvatarWrapperInactive)}>
              {!avatar ? (
                <label className={styles.ChangeAvatarButton} aria-label='avatar input'>
                  <span className="icon-camera"/>
                  <input
                    {...field}
                    value=''
                    className={styles.ChangeAvatarInput}
                    type="file"
                    onChange={handleChange}
                  />
                </label>
              ) : (
                <div className={styles.AvatarImgWrapper}>
                  <div
                    className={cn(styles.AvatarControlsButton, styles.AvatarEditButton, 'icon-edit')}
                    onClick={handleOpen}
                  />
                  <div
                    className={cn(styles.AvatarControlsButton, styles.AvatarDeleteButton, 'icon-delete')}
                    onClick={handleDeletePhoto}
                  />
                  <img src={URL.createObjectURL(avatar)} className={styles.AvatarImg} alt='avatar'/>
                </div>
              )}
            </div>
          )}
        />
        <div className={styles.ButtonWrapper}>
          <Button
            text={t('core.next')}
            onClick={handleNext}
          />
        </div>
      </div>
    </div>
  );
};

export default AvatarFormStep;
