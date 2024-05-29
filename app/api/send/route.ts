import EmailTemplate from '../../../emails/EmailTemplate';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    const { customerName, emails } = await request.json();
    console.log(customerName, emails);
    await resend.emails.send({
        from: 'studio@northlink.digital',
        to: [emails],
        subject: `New message from Reunitable`,
        react: EmailTemplate({ customerName })
    });

    return NextResponse.json({ status: 200 });
}
