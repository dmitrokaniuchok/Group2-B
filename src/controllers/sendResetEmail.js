import { User } from '../models/User.js';
import { sendEmail } from '../utils/sendEmail.js';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';

export const sendResetEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(404, 'User not found!');
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: '5m',
  });

  const resetLink = `${process.env.APP_DOMAIN}/reset-password?token=${token}`;

  try {
    await sendEmail({
      to: email,
      subject: 'Reset your password',
      html: `<p>Reset your password here:</p>
<a href="${resetLink}">${resetLink}</a>
`,
    });

    res.status(200).json({
      status: 200,
      message: 'Reset password email has been successfully sent.',
      data: {},
    });
  } catch (error) {
    console.error(error);
    throw createHttpError(500, 'Email sending failed. Try again later.');
  }
};
