import { SendEmailCommand } from "@aws-sdk/client-ses";
import sesClient from '../lib/SESClient';
import {useMailTemplate, useMailSubject} from '../utils/useEmailTemplate'

export default function sendViaSES (templateName: string | undefined, mailData: { toEmail: any; first_name?: any; charge_id?: any; paymentIntent?: any; receipt_email?: any; }) {
    return new Promise(async (resolve,reject) => {
        try{
            const email = useMailTemplate(templateName, mailData),
                sendFrom = mailData?.toEmail || "";

            const sendEmailCommand = new SendEmailCommand({
                Destination: { /* required */
                    ToAddresses: [
                        'kpruzhev@gmail.com',
                    ]
                },
                Message: { /* required */
                    Body: { /* required */
                        Html: {
                            Charset: "UTF-8",
                            Data: email
                        },
                        Text: {
                            Charset: "UTF-8",
                            Data: "RECEIPT HERE"
                        }
                    },
                    Subject: {
                        Charset: 'UTF-8',
                        Data: useMailSubject(templateName)
                    }
                },
                Source: sendFrom,
                ReplyToAddresses: [
                    'kpruzhev@gmail.com',
                ],
            });

            const data = await sesClient.send(sendEmailCommand)
            resolve(data);
        }catch(e){
            reject(e);
        }
    });
}