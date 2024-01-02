import React from 'react';
import { RegisterProgressBarProps } from '@modules/auth/components/RegisterProgressBar/types';
import { RegisterStepEnum } from '@modules/auth/types/auth.types';
import cn from 'classnames';
import styles from './RegisterProgressBar.module.scss';

const REGISTER_PROGRESS = [
  {
    step: RegisterStepEnum.Account,
    icon: 'icon-lock',
    index: 0,
  },
  {
    step: RegisterStepEnum.Personal,
    icon: 'icon-member-bold',
    index: 1,
  },
  {
    step: RegisterStepEnum.Avatar,
    icon: 'icon-avatar',
    index: 2,
  },
  {
    step: RegisterStepEnum.Confirm,
    icon: 'icon-check',
    index: 3,
  },
];

const RegisterProgressBar: React.FC<RegisterProgressBarProps> = ({ step }) => {
  const currentStepIndex = REGISTER_PROGRESS.find((item) => item.step === step).index || 0;
  
  return (
    <div className={styles.RegisterProgressWrapper}>
      <ul className={styles.RegisterProgressList}>
        {REGISTER_PROGRESS.map((item, index) => {
          const isActive = step === item.step && styles.RegisterProgressIconActive;
          
          return (
            <li className={styles.RegisterProgressItem} key={item.step}>
              {index !== 0 && (
                <div className={cn(
                  styles.RegisterProgressDivider, 
                  currentStepIndex >= index && styles.RegisterProgressDividerActive,
                )}
                />
              )}
              <div>
                <span className={cn(
                  item.icon, 
                  styles.RegisterProgressIcon,
                  isActive && styles.RegisterProgressIconActive,
                  currentStepIndex > item.index && styles.RegisterProgressIconPrev,
                )}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RegisterProgressBar;
