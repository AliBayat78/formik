import axios from 'axios'
import { useFormik } from 'formik'
import { useState, useEffect } from 'react'
import * as Yup from 'yup'
import Input from './common/Input'
import RadioButton from './common/RadioButton'
import Select from './common/SelectComponent'
import CheckboxInput from './common/CheckBoxInput'

const checkBoxOptions = [
  { label: 'React.js', value: 'React.js' },
  { label: 'Vue.js', value: 'Vue.js' },
]

const radioOptions = [
  { label: 'Male', value: '0' },
  { label: 'Female', value: '1' },
]

const selectOptions = [
  { label: 'Select Nationality ...', value: '' },
  { label: 'Iran', value: 'IR' },
  { label: 'Germany', value: 'GER' },
  { label: 'USA', value: 'US' },
]

// 1.
const initialValues = {
  name: '',
  email: '',
  phoneNumber: '',
  password: '',
  passwordConfirm: '',
  gender: '',
  nationality: '',
  interests: [], // ["React", "Vue"]
  terms: false,
  id: Date.now(),
}

const SignUpForm = () => {
  const [formValues, setFormValues] = useState(null)

  useEffect(() => {
    axios
      .get(`http://localhost:3001/users/1649971075293`)
      .then((resp) => setFormValues(resp.data))
      .catch((err) => console.log(err))
  }, [])

  // 2.
  const onSubmit = (values) => {
    axios
      .post('http://localhost:3001/users/', values)
      .then((resp) => console.log(...resp.data))
      .catch((err) => console.log(err))
  }

  // 3.
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is Required').min(6, 'Name must be More than 6 Characters'),
    email: Yup.string().email('Invalid email format').required('Email is Required'),
    phoneNumber: Yup.string()
      .required('Phone Number is Required')
      .matches(/^[0-9]{11}$/, 'Invalid Phone Number'),
    password: Yup.string().required('Password is Required'),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must Match')
      .required('Password Confirmation is Required'),
    gender: Yup.string().required('Gender is Required'),
    nationality: Yup.string().required('Select Nationality'),
    interests: Yup.array().min(1).required('at least select one expertise'),
    terms: Yup.boolean()
      .required('The terms and conditions must be accepted!')
      .oneOf([true], 'The terms and conditions must be accepted.'),
  })

  const formik = useFormik({
    initialValues: formValues || initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
  })

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Input formik={formik} name="name" label="Name" />
        <Input formik={formik} name="email" label="Email" />
        <Input formik={formik} name="phoneNumber" label="Phone Number" />
        <Input formik={formik} name="password" label="Password" type="password" />
        <Input
          formik={formik}
          name="passwordConfirm"
          label="Password Confirmation"
          type="password"
        />
        <RadioButton formik={formik} radioOptions={radioOptions} name="gender" />
        <Select formik={formik} selectOptions={selectOptions} name="nationality" />
        <CheckboxInput formik={formik} checkBoxOptions={checkBoxOptions} name="interests" />

        {/* terms and conditions */}
        <div className="form-control">
          <input
            type="checkbox"
            name="terms"
            value={true}
            id="terms"
            {...formik.getFieldProps('terms')}
          />
          <label htmlFor="terms">Terms and Conditions</label>
          {formik.errors.terms && formik.touched.terms && (
            <div className="error">{formik.errors.terms}</div>
          )}
        </div>
      </form>
    </div>
  )
}

export default SignUpForm
