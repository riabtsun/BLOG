import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { fetchAuthData, selectIsAuth } from '../../redux/slices/auth';
import { Navigate } from 'react-router-dom';

import styles from './Login.module.scss';
import { useDispatch } from 'react-redux';

export type formValues = {
  email: string;
  password: string;
};

export const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<formValues> = async (values) => {
    const data = await dispatch(fetchAuthData(values));
    if (!data.payload) {
      return alert('Cannot login');
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    } else {
      alert('Cannot login');
    }
  };

  if (isAuth) {
    return <Navigate to={'/'} />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          fullWidth
          type="email"
          {...register('email', { required: 'Enter email' })}
        />
        <TextField
          className={styles.field}
          label="Password"
          fullWidth
          helperText={errors.password?.message}
          error={Boolean(errors.password?.message)}
          {...register('password', { required: 'Enter your password' })}
        />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};
