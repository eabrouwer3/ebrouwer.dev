import { z } from 'zod'
import { RESEND_API_KEY } from "$env/static/private";

const ResendErrorSchema = z.union([
  z.object({
    name: z.string(),
    message: z.string(),
    statusCode: z.number(),
  }),
  z.object({
    name: z.literal('UnknownError'),
    message: z.literal('Unknown Error'),
    statusCode: z.literal(500),
    cause: z.any(),
  }),
])
const ResendSuccessSchema = z.object({
  id: z.string(),
})

export type SendEmailOptions = {
  to: string | string[]
  subject: string
  html: string
  text?: string
}

export async function sendEmail(options: SendEmailOptions) {
  // For development mode, Resend will only accept emails from this domain.
  const from = 'no-reply@ebrouwer.dev';
  const email = { from, ...options };

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(email),
  });

  const data = await response.json();
  const parsedData = ResendSuccessSchema.safeParse(data);

  if (response.ok && parsedData.success) {
    return { status: 'success', data: parsedData } as const;
  } else {
    const parseResult = ResendErrorSchema.safeParse(data)
    if (parseResult.success) {
      console.error(parseResult.data);
      throw new Error('Unable to send email.');
    } else {
      console.error(data);
      throw new Error('Unable to send email.');
    }
  }
}

type AuthEmailOptions = {
  email: string;
  token: string;
  url?: string;
}

export async function sendAuthEmail ({ email, token, url }: AuthEmailOptions) {
  const subject = 'Your magic link for ebrouwer.dev/admin'
  const html = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
      </head>
      <body style="max-width: 50%; margin: 0 auto; text-align: center;">
        <h1>Login to ebrouwer.dev</h1>
        <p>
          Click the button below to login to ebrouwer.dev.
        </p>
        <a href="${url}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
          Login
        </a>
      </body>
    </html>
  `;

  await sendEmail({
    to: email,
    subject,
    html,
  });
}
