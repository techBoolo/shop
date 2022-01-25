import sgMail from '@sendgrid/mail';
import { updateUserVerifyResetToken } from '../models/user.js';
import ErrorResponse from '../utils/errorResponse.js'

const sendEmail = (obj) => {
  const message = {
    to: obj.to,
    from: obj.from,
    subject: obj.subject,
    html: obj.message
  }
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  return sgMail.send(message, async(error, info) => {
    if(error) {
      await updateUserVerifyResetToken(obj.id, { VRTokenHash: undefined, VRTokenExpire: undefined});
      throw new ErrorResponse(error, 400);
    } else  {
      return info
    }
  })
}

export default sendEmail;
