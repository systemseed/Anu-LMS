import React from 'react';
import PropTypes from 'prop-types';
import Form from '../../../atoms/Form';
import Button from '../../../atoms/Button';
import { Router } from '../../../../routes'
import Alert from 'react-s-alert';

const schema = {
  'type': 'object',
  'required': ['username', 'password'],
  'properties': {
    'username': {
      'type': 'string',
      'title': 'Username',
    },
    'password': {
      'type': 'string',
      'title': 'Password',
    },
  }
};

const uiSchema = {
  'username': {
    'ui:placeholder': ' ',
  },
  'password': {
    'ui:widget': 'password',
    'ui:placeholder': ' ',
  }
};

class LoginForm extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      isSending: false,
      formData: {},
    };

    this.submitForm.bind(this);
  }

  async submitForm({ formData }) {

    this.setState({
      isSending: true,
      formData,
    });

    try {
      await this.context.auth.login(formData.username, formData.password);
      Router.push('/');
    } catch (error) {
      this.setState({ isSending: false });
      Alert.error(error);
    }
  }

  render() {
    return(
      <Form
        schema={schema}
        uiSchema={uiSchema}
        formData={this.state.formData}
        autocomplete={'off'}
        onSubmit={this.submitForm.bind(this)}
      >
        <Button block loading={this.state.isSending}>
          Login
        </Button>
      </Form>
    );
  }
}

LoginForm.contextTypes = {
  auth: PropTypes.shape({
    login: PropTypes.func,
  }),
};

export default LoginForm;