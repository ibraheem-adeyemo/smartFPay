import React, {useEffect} from 'react';
import { Box, Flex, FormControl, FormLabel, Input, Button, SelectItem, VStack, Textarea, SelectContent, Select, RadioGroup, Radio } from '@chakra-ui/react';
import { Formik, Form, Field, useFormikContext } from 'formik';
import DatePicker from 'react-datepicker';
import { MdOutlineCalendarToday } from "react-icons/md";
import { DatePickerComponent } from './DatePicker';

// Reusable Form Field Component
const FormField = ({ label, name, type = 'text', component = Input, options = [], ...props }) => {

    return <Field name={name}>
    {({ field, form }) => (
      <FormControl isInvalid={form.errors[name] && form.touched[name]} mb={4}>
        <FormLabel htmlFor={name} fontWeight='bold' fontSize='14px'>{label}</FormLabel>
        <Box>
          {component === 'select' ? (
            <Field as={Select} id={name} {...field} {...props} placeholder='Please select'>
              <SelectContent>
              {options.map((option) => {
                return (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                )
              }              
              )}
              </SelectContent>
            </Field>
          ): component === 'datePicker' ? (
            <Flex>
                <DatePickerComponent
                    selected={field.value ? new Date(field.value) : null}
                    onChange={(date) => form.setFieldValue(name, date)}
                    dateFormat="yyyy-MM-dd"
                    marginTop='initial'
                    {...props}
                    width='650px'
                    borderRadius='7px'
                    labelMb='5px'
                    />  
            </Flex>
          )  : component === 'radioGroup' ? (
            <RadioGroup defaultValue='' {...field} {...props}>
              {options.map((option) => (
                <Radio key={option.value} value={option.value} mr='20px'>
                  {option.label}
                </Radio>
              ))}
            </RadioGroup>
          ) : (
            <Field as={component} id={name} fontSize='18px' {...field} {...props} />
          )}
        </Box>
      </FormControl>
    )}
  </Field>
};

// Reusable Form Component
const ReusableForm = ({ initialValues, validationSchema, handleSubmit, fields, submitFormRef, shouldHaveSubmitBtn }) => (
  <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={()=>{}}>
    {({ isSubmitting }) => (
      <Form>
        <VStack spacing={'4px'}>
          {fields.map((field) => (
            <FormField key={field.name} {...field} height='50px' color={field.color || 'form_input_gray'} bgColor={field.bgColor || 'main_light_gray'} />
          ))}
          {shouldHaveSubmitBtn && <Button type="btn" colorScheme="teal" onClick={() => handleSubmit(values)} isLoading={isSubmitting}>
            Submit
          </Button>}
          <SubmitButtonOutsideForm submitFormRef={submitFormRef} />
        </VStack>
      </Form>
    )}
  </Formik>
);

const SubmitButtonOutsideForm = ({submitFormRef}) => {
    const {submitForm, values} = useFormikContext()

    useEffect(() => {
          submitFormRef.current = { submitForm, values}
        }, [submitForm, values, submitFormRef])
    
    return null
}

export default ReusableForm;
