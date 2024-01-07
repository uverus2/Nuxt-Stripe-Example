import sendViaSES  from "~/server/services/awsSesMailService";
import sendViaMailtrap from "~/server/services/mailtrapMailService"

export function useEmailDriver() {
    switch(process.env.MAIL_DRIVER){
        case "SES":
            return sendViaSES;
        case "mailtrap":
        default:
            return sendViaMailtrap;
    }
}