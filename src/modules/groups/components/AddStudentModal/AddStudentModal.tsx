import React, { useEffect, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AddStudentForm } from '@modules/groups/types/group.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import Button from '@components/ui/Button/Button';
import UserSearchSelect from '@components/ui/UserSearchSelect/UserSearchSelect';
import {
  useGetOrganisationStudentsNotInGroupQuery,
} from '@shared/redux/organisation/api';
import { addStudentSchema } from '@modules/groups/validations/addStudent.validation';
import cn from 'classnames';
import { useAddStudentsMutation } from '@modules/groups/redux/api';
import styles from './AddStudentModal.module.scss';

type Props = {
  closeFunc: () => void,
  groupId: number,
}

const AddStudentModal: React.FC<Props> = ({ closeFunc, groupId }) => {
  const {
    handleSubmit,
    getValues,
    setValue,
    trigger,
    watch,
    formState: { errors, isDirty },
  } = useForm<AddStudentForm>({
    mode: 'all',
    defaultValues: {
      ids: [],
    },
    resolver: yupResolver(addStudentSchema),
  });
  
  const { data = [], isLoading } = useGetOrganisationStudentsNotInGroupQuery({ groupId });
  const [addSucess, setAddSucess] = useState(false);
  const { t } = useTranslation();
  const ids = watch('ids');
  const selectedStudents = useMemo(() => {
    return ids.map((item) => data.find((subItem) => subItem.id === item));
  }, [ids, data]);
  const [addStudents, { isSuccess, isLoading: isAddLoading, data: addData }] = useAddStudentsMutation();
  
  useEffect(() => {
    if (isSuccess) {
      setAddSucess(true);
    }
  }, [isSuccess]);
  
  const handleSubmitEvent: SubmitHandler<AddStudentForm> = (data, event) => {
    event.preventDefault();
    addStudents({ ids: data.ids, groupId });
  };
  
  const handleChange = (id) => {
    const values = getValues('ids');
    setValue('ids', [...values, id], { shouldDirty: true });
    trigger(['ids']);
  };
  
  const removeStudent = (id: number) => {
    const values = getValues('ids');
    setValue('ids', values.filter((item) => item !== id));
    trigger(['ids']);
  };
  
  return (
    <div className={styles.ModalWrapper}>
      
      {addSucess ? (
        <>
          <div className={styles.SuccessWrapper}>
            <div className={styles.IconWrapper}>
              <span className={cn('icon-check', styles.Icon)}/>
            </div>
            <p className={styles.SuccessText}>{t('groups.studentsAdded', { value: selectedStudents.length })}</p>
          </div>
          
          <div className={styles.ButtonWrapper}>
            <Button
              text={t('core.close')}
              onClick={closeFunc}
            />
          </div>
        </>
      ) : (
        <>
          <div className={styles.TitleWrapper}>
            <h3 className={styles.Title}>{t('groups.addStudent')}</h3>
            <p className={styles.Description}>{t('groups.addStudentDescription')}</p>
          </div>
          <div className={styles.Divider}/>
          
          <form onSubmit={handleSubmit(handleSubmitEvent)} className={styles.Form}>
            <div className={styles.FormContent}>
              <UserSearchSelect
                options={data.filter((item) => !ids.includes(item.id))}
                selected={null}
                onChange={handleChange}
                label={t('groups.addStudentLabel')}
                placeholder={t('groups.selectStudent')}
                withEmail
                isLoading={isLoading}
              />
            
              <div className={styles.List}>
                {selectedStudents.map((item) => {
                  return (
                    <div className={styles.ListItem} key={item.id}>
                      <p className={styles.ListName}>{item.full_name}</p>
                      <span onClick={() => removeStudent(item.id)} className={cn(styles.ListIcon, 'icon-small-cross')}/>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={styles.Buttons}>
              <Button
                text={t('core.add')}
                type="submit"
                disabled={Boolean(Object.keys(errors).length) || !isDirty || isAddLoading}
              />
              <Button
                text={t('core.close')}
                styleType='bordered'
                onClick={closeFunc}
              />
            </div>
          </form>
        </>
      )}
    
    </div>
  );
};

export default AddStudentModal;
