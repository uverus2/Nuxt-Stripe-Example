import buildReceiptEmail from "~/server/mail/recieiptEmail";

export function useMailTemplate(name: string | undefined, mailData: {
    toEmail: any;
    first_name?: any,
    charge_id?: any,
    paymentIntent?: any,
    receipt_email?: any,

}){
    switch (name){
        case 'receipt':
            const {toEmail, first_name, charge_id, paymentIntent, receipt_email} = mailData;
            return buildReceiptEmail(toEmail, first_name, charge_id, paymentIntent, receipt_email);
    }
}

export function useMailSubject(name = "receipt"){
    switch (name){
        case 'receipt':
            return "New Receipt Response";
        default:
            return "Hello, world!"
    }
}