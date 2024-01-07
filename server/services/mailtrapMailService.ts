import MailtrapClient from '../lib/MailTrapClient';
import {useMailTemplate, useMailSubject} from '../utils/useEmailTemplate';

export default function sendViaMailtrap(templateName: string | undefined, mailData: { toEmail: any; first_name?: any; charge_id?: any; paymentIntent?: any; receipt_email?: any; }){
    return new Promise(async (resolve, reject) =>{
        try{
            const sender_email = "kpruzhev@gmail.com",
                  toEmail = mailData?.toEmail || "",
                  sender = { name: "Mailtrap Test", email: sender_email };

            const sendMail = await MailtrapClient.send({
                from: sender,
                to: [{ email: toEmail }],
                subject: useMailSubject(templateName),
                html: useMailTemplate(templateName, mailData)
            });

            resolve(sendMail);
        }catch(e){
            reject(e);
        }
    })
}