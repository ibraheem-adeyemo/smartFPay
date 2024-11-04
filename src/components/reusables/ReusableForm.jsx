import React from 'react';
import { Box, Flex, FormControl, FormLabel, Input, Button, VStack, Textarea, Select, RadioGroup, Radio } from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import DatePicker from 'react-datepicker';
import { MdOutlineCalendarToday } from "react-icons/md";

// Reusable Form Field Component
const FormField = ({ label, name, type = 'text', component = Input, options = [], ...props }) => {

    return <Field name={name}>
    {({ field, form }) => (
      <FormControl isInvalid={form.errors[name] && form.touched[name]} mb={4}>
        <FormLabel htmlFor={name}>{label}</FormLabel>
        <Box>
          {component === 'select' ? (
            <Field as={Select} id={name} {...field} {...props}>
              <option value="">Please select</option>
              {options.map((option) => {
                return (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                )
              }              
              )}
            </Field>
          ): component === 'datePicker' ? (
            <Flex bgColor={props.bgColor} p='10px' width={'400px'}>
                <DatePicker
                    selected={field.value ? new Date(field.value) : null}
                    onChange={(date) => form.setFieldValue(name, date)}
                    dateFormat="yyyy-MM-dd"
                    {...props}
                    />

                <MdOutlineCalendarToday />    
            </Flex>
          )  : component === 'radioGroup' ? (
            <RadioGroup {...field} {...props}>
              {options.map((option) => (
                <Radio key={option.value} value={option.value} mr='20px'>
                  {option.label}
                </Radio>
              ))}
            </RadioGroup>
          ) : (
            <Field as={component} id={name} {...field} {...props} />
          )}
        </Box>
      </FormControl>
    )}
  </Field>
};

// Reusable Form Component
const ReusableForm = ({ initialValues, validationSchema, onSubmit, fields, shouldHaveSubmitBtn }) => (
  <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
    {({ isSubmitting }) => (
      <Form>
        <VStack spacing={'4px'}>
          {fields.map((field) => (
            <FormField key={field.name} {...field} height='40px' value={initialValues[field.name]} bgColor={field.bgColor || 'main_light_gray'} />
          ))}
          {shouldHaveSubmitBtn && <Button type="submit" colorScheme="teal" isLoading={isSubmitting}>
            Submit
          </Button>}
        </VStack>
      </Form>
    )}
  </Formik>
);

export default ReusableForm;
