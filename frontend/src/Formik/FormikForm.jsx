import React from 'react'
import {Field, Form, Formik} from 'formik'
import * as yup from "yup"
import FormikInput from './FormikInput'
import FormikTextArea from './FormikTextArea.jsx'
import FormikSelect from './FormikSelect'
import FormikCheckbox from './FormikCheckbox'
import FormikRadio from './FormikRadio'

const FormikForm = () => {

    let initialValues = {
        firstName: "",
        lastName: "",
    }
    let onSubmit = (value, other)=> {
        console.log(value)
    }
    let validationSchema = yup.object({
        firstName:yup.string().required("FirstName is required. "),
        lastName:yup.string().required("LastName is required. "),
        description:yup.string().required("Description is required. "),
    })

    let genderOptions = [
        {
            label: "Male",
            value: "male",
        },
        {
            label: "Female",
            value: "female",
        },
        {
            label: "Other",
            value: "other",
        },
    ]

    let countryOptions = [
        {
            label: "Select Country",
            value: "",
            disabled: true,
        },
        {
            label: "Nepal",
            value: "nep",
        },
        {
            label: "India",
            value: "ind",
        },
        {
            label: "China",
            value: "chi",
        },
        {
            label: "Japan",
            value: "jap",
        },
        {
            label: "America",
            value: "ame",
        },
    ]

  return (
    <div>
        <Formik 
        initialValues= {initialValues}
        onSubmit = {onSubmit}
        validationSchema = {validationSchema}>
            {
                (formik)=> {
                    return <Form>


                <FormikInput name = "firstName" 
                label = "First Name: " 
                type="text" 
                onChange={(e) => {
                formik.setFieldValue('firstName', e.target.value)
                }}
                placeholder = "First Name"
                required = {true}
                // style = {{backgroundColor:"red"}}
                ></FormikInput>



                <FormikInput name = "lastName" 
                label = "Last Name: " 
                type="text" 
                onChange={(e) => {
                formik.setFieldValue('lastName', e.target.value)
                }}
                required = {true}
                 ></FormikInput>



                <FormikTextArea name = "description" 
                label = "Description: " 
                type="text" 
                onChange={(e) => {
                formik.setFieldValue('description', e.target.value)
                }}
                
                required = {true}
                >

                </FormikTextArea>

                <FormikSelect name = "country" 
                label = "Country: " 
                onChange={(e) => {
                formik.setFieldValue('country', e.target.value)
                }}
                
                required = {true}
                
                options = {countryOptions}
                >
                </FormikSelect>


                <FormikRadio name = "gender" 
                label = "Gender: " 
                onChange={(e) => {
                formik.setFieldValue('gender', e.target.value)
                }}
                
                required = {true}
                
                options = {genderOptions}
                >
                </FormikRadio>

                <FormikCheckbox name = "isMarried" 
                label = "Is Married: " 
                onChange={(e) => {
                formik.setFieldValue('isMarried', e.target.checked)
                }}
                >
                </FormikCheckbox>


                <FormikInput name = "phoneNumber"  
                label = "Phone Number: " 
                type="number" 
                onChange={(e) => {
                formik.setFieldValue('phoneNumber', e.target.value)
                }}
                required = {true}
                 ></FormikInput>


<FormikInput name = "age" 
                label = "Age: " 
                type="number" 
                onChange={(e) => {
                formik.setFieldValue('age', e.target.value)
                }}
                required = {true}
                 ></FormikInput>


                        <button type='submit'>Submit</button>
                    </Form>
                }
            }
        </Formik>

    </div>
  )
}

export default FormikForm