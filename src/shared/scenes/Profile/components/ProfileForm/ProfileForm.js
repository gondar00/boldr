/* @flow */
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button, InputField, Form, Headline } from 'boldr-ui';

type Props = {
  handleSubmit: Function,
  pristine: Boolean,
  reset: Function,
  submitting: Boolean,
};

const ProfileForm = (props: Props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <Form onSubmit={handleSubmit} className="boldr-form__profile">
      <Field
        id="fname"
        name="firstName"
        component={InputField}
        type="text"
        label="First Name"
      />
      <Field
        id="lname"
        name="lastName"
        component={InputField}
        type="text"
        label="Last Name"
      />
      <Field
        id="loc"
        name="location"
        component={InputField}
        type="text"
        label="Location"
      />
      <Field
        id="web"
        name="website"
        component={InputField}
        type="text"
        label="Website"
      />
      <Field
        id="bio"
        name="bio"
        component={InputField}
        type="text"
        label="Bio"
      />
      <Headline type="h4">Social</Headline>
      <Field
        id="fb"
        name="facebook"
        component={InputField}
        type="text"
        label="Facebook"
      />
      <Field
        id="tw"
        name="twitter"
        component={InputField}
        type="text"
        label="Twitter"
      />
      <Field
        id="goog"
        name="google"
        component={InputField}
        type="text"
        label="Google"
      />
      <Field
        id="gh"
        name="github"
        component={InputField}
        type="text"
        label="Github"
      />
      <Field
        id="li"
        name="linkedin"
        component={InputField}
        type="text"
        label="LinkedIn"
      />
      <div>
        <Button
          raised
          primary
          type="submit"
          disabled={pristine || submitting}
          label="Submit"
        />
        <Button
          flat
          secondary
          disabled={pristine || submitting}
          onClick={reset}
          label="Clear Values"
        />
      </div>
    </Form>
  );
};

export default reduxForm({
  form: 'profileForm',
})(ProfileForm);
