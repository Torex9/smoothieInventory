import Email from '../../../emails/EmailTemplate';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    const { customerName, emails } = await request.json();
    await resend.emails.send({
        from: 'studio@northlink.digital',
        to: [emails],
        subject: `New contact from NorthLink Studio`,
        react: Email({ customerName })
    });

    return NextResponse.json({ status: 200 });
}
