import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { required } from '../../utils/validators/validators';
import { Checkbox, Input } from '../common/FormsControls/FormsControls';
import { login, logout } from '../../redux/auth-reducer';
import { Redirect } from 'react-router';
import st from '../common/FormsControls/FormsControls.module.css';
import cl from './Login.module.css';

const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
  return (
    <form className={cl.form} onSubmit={handleSubmit}>
      <div>
        <Field
          placeholder={'Email'}
          name={'email'}
          component={Input}
          validate={[required]}
        />
      </div>
      <div>
        <Field
          placeholder={'Password'}
          name={'password'}
          component={Input}
          type={'password'}
          validate={[required]}
        />
      </div>
      <div className={st.checkbox}>
        <div>
          <Field type={'checkbox'} name={'rememberMe'} component={Checkbox} />
        </div>
        <label htmlFor="rememberMe">remember me</label>
      </div>
      {captchaUrl && <img src={captchaUrl} alt="" />}
      {captchaUrl && (
        <Field
          placeholder={'Symbols from image'}
          name={'captcha'}
          component={Input}
          validate={[required]}
        />
      )}
      {error && (
        <div>
          <div className={st.formSummeryError}>{error}</div>
        </div>
      )}
      <button className={st.loginBtn}>Login</button>
    </form>
  );
};

const LoginReduxForm = reduxForm({
  form: 'login',
})(LoginForm);

const Login = (props) => {
  if (props.isAuth) {
    return <Redirect to={'/profile/' + props.userId} />;
  }

  const onSubmit = (formData) => {
    props.login(
      formData.email,
      formData.password,
      formData.rememberMe,
      formData.captcha,
    );
  };

  return (
    <div className="block">
      <div className={cl.form}>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
      </div>
      <div className={cl.test}>
        <h3>Тестовый акаунт</h3>
        <p>
          Email: <strong>free@samuraijs.com</strong>
        </p>
        <p>
          Password: <strong>free</strong>
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  userId: state.auth.userId,
  captchaUrl: state.auth.captchaUrl,
});

export default connect(mapStateToProps, { login, logout })(Login);
