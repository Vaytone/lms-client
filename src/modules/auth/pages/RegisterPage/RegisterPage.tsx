import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux';
import InvalidLinkBanner from '@modules/auth/components/InvalidLinkBanner/InvalidLinkBanner';
import { validateRegisterLink } from '@modules/auth/redux/thunks';
import { useParams } from 'react-router-dom';
import Loader from '@components/Loader/Loader';
import RegisterForm from '@modules/auth/components/RegisterForm/RegisterForm';
import styles from './RegisterPage.module.scss';

const RegisterPage: React.FC = () => {
  const { code } = useParams();
  const isValidationLoading = useAppSelector((state) => state.auth.isLinkLoading);
  const isLinkValid = useAppSelector((state) => state.auth.isLinkValid);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(validateRegisterLink(code));
  }, [code]);
  
  return (
    <div className={styles.RegisterWrapper}>
      {isValidationLoading && <Loader/>}
      {!isValidationLoading && !isLinkValid && <InvalidLinkBanner/>}
      {!isValidationLoading && isLinkValid && <RegisterForm code={code}/>}
    </div>
  );
};

export default RegisterPage;
