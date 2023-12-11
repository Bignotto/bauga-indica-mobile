import parsePhoneNumberFromString from "libphonenumber-js";

export function isPhoneNumberValid(phone: string) {
  const country = "BR";

  const phoneObject = parsePhoneNumberFromString(phone, country);
  if (phoneObject && phoneObject.isValid()) {
    return true;
  }
  return false;
}
