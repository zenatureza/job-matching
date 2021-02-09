import { ValidationError } from 'yup';

interface IErrors {
  [key: string]: string;
}

export default function getValidationErrors(err: ValidationError): IErrors {
  const validationErrors: IErrors = {};

  if (!err.inner) return {};

  err.inner.forEach((error) => {
    if (!error.path) return;

    validationErrors[error.path] = error.message;
  });

  return validationErrors;
}
