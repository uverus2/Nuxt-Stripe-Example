import * as yup from "yup";
import { messages } from "@/validation/messages";

const nameMaxLength = 50;

const Schema = {
    validationSchema: yup.object({
        name: yup
            .string()
            .typeError(messages.string)
            .max(nameMaxLength, messages.max(nameMaxLength))
            .required(messages.required("Name")),
        email: yup
            .string()
            .email(messages.email)
            .required(messages.required("Email Address")),
        address: yup
            .string()
            .required(messages.required("Address")),
        county: yup
            .string()
            .required(messages.required("Country")),
        city: yup
            .string()
            .required(messages.required("City")),
        postcode: yup
            .string()
            .matches(/^[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}$/i)
            .required(messages.required("Postcode")),
        donation: yup
            .number()
            .max(50)
            .when(['donation_check'],  {
               is: true,
               then: schema => schema.required(messages.required("Donation"))
            })

    })
}

export default Schema;