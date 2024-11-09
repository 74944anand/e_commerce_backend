const moment = require('moment');

exports.userEmailTemplate = (firstName,lastName,jobTitle,recruiterEmail) => {
    const userName= `${firstName} ${lastName}`
    const subject = `Your Job Application for ${jobTitle}`;
    const message = `<p>Dear ${userName},</p>
    <p>Thank you for applying for the position of ${jobTitle}.</p>
  
    <p>We have successfully received your application</p>
    
    <p>Our recruitment team will review your application and reach out to you if your qualifications match our requirements. If you are selected for an interview, you will be contacted via email or phone.

    We appreciate your interest in joining our team and will keep you updated on the status of your application.
    
    If you have any questions or need further information, please feel free to contact us at ${recruiterEmail}.
    
    Thank you again for applying.
    
    Best regards</p>`;
  
    return { subject, message };
  };

  exports.forgetPasswordTemplate = (templateDetail) => {
    const { firstName, otp } = templateDetail;
    const subject = 'Password reset request';
    const message = `<p>Hello ${firstName},</p>
    <p>We have sent you this email in response to your request to reset your password.</p>
  
    <p>To reset your password, Click on this link : <b>#${otp}</b> </p>
    
    <p>We recommend that you keep your password secure and not share it with anyone.</p>`;
  
    return { subject, message };
  };

  exports.recruiterEmailTemplate = (firstName,lastName,email,mobileNumber,recruiterName,jobTitle) => {
    const currentDate = moment().format('MMMM Do, YYYY'); // Format the current date
    const userName= `${firstName} ${lastName}`

    const subject = `New Job Application Received: ${jobTitle} - ${userName}`;
    const message = `<p>Hello ${recruiterName},</p>
    <p>We have sent you this email in response to your request to reset your password.</p>
  
    <p>Application Details:
    Applied For: ${jobTitle}
    Application Date: ${currentDate}
    Name: ${userName}
    Email: ${email}
    Phone: ${mobileNumber}
    </p>
    
    <p>Please review the applicant’s details at your earliest convenience.
    If you need any further information or wish to schedule an interview, feel free to reach out to the applicant directly or let me know if you need assistance.</p>`;
  
    return { subject, message };
  };