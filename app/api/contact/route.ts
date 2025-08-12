"use client";

export async function POST(request: Request) {
  const res = await request.json();
  const { name, email, subject, message } = res;

  // In a real application, you would send an email here using a service like Nodemailer, Resend, or SendGrid.
  // For this example, we'll just log the data and return a success response.
  console.log({
    name,
    email,
    subject,
    message,
  });

  // Simulate sending an email
  const emailSent = Math.random() > 0.2; // 80% success rate

  if (emailSent) {
    return new Response(JSON.stringify({ message: "Email sent successfully!" }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } else {
    return new Response(JSON.stringify({ message: "Failed to send email." }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
