import React from 'react';
import { RegisterProgressBarProps } from '@modules/auth/components/RegisterProgressBar/types';
import { RegisterStepEnum } from '@modules/auth/types/auth.types';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import styles from './RegisterProgressBar.module.scss';

const REGISTER_PROGRESS = [
  {
    step: RegisterStepEnum.EmailVerification,
    text: 'auth.emailVerificationTitle',
    icon: 'icon-email',
    index: 0,
  },
  {
    step: RegisterStepEnum.Account,
    icon: 'icon-lock',
    text: 'auth.accountTitle',
    index: 1,
  },
  {
    step: RegisterStepEnum.Personal,
    icon: 'icon-profile',
    text: 'auth.profileTitle',
    index: 2,
  },
  {
    step: RegisterStepEnum.Avatar,
    icon: 'icon-avatar',
    text: 'auth.avatarTitle',
    index: 3,
  },
  {
    step: RegisterStepEnum.Confirm,
    icon: 'icon-check',
    text: 'auth.confirmTitle',
    index: 4,
  },
];

const RegisterProgressBar: React.FC<RegisterProgressBarProps> = ({ step }) => {
  const currentStepIndex = REGISTER_PROGRESS.find((item) => item.step === step).index || 0;
  const { t } = useTranslation();
	
  return (
    <div className={styles.RegisterProgressWrapper}>
      <ul className={styles.RegisterProgressList}>
        {REGISTER_PROGRESS.map((item, index) => {
          const isActive = step === item.step && styles.RegisterProgressIconActive;
          const isPrev = index < currentStepIndex;
					
          return (
            <li className={cn([styles.RegisterProgressItem, { opacity: 0 }])} key={item.step}>
              <div className={styles.RegisterProgressIconWrapper}>
                <div>
                  <span
                    className={cn(
                      item.icon,
                      styles.RegisterProgressIcon,
                      isActive && styles.RegisterProgressIconActive,
                      currentStepIndex > item.index && styles.RegisterProgressIconPrev,
                    )}
                  />
                </div>
                {index !== 4 && (
                  <div className={cn(
                    styles.RegisterProgressDivider,
                    currentStepIndex > index && styles.RegisterProgressDividerActive,
                  )}
                  />
                )}
              </div>
              <div className={styles.StepText}>
                <h5 className={styles.StepTitle}>{`${t('core.step')} ${index + 1}`}</h5>
                <p className={styles.StepDescription}>{t(item.text)}</p>
                <p className={cn([styles.StepStatus, isPrev ? styles.StepStatusCompleted : ''])}>
                  {index === currentStepIndex ? 'In progress' : (isPrev ? 'Complete' : '')}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RegisterProgressBar;
