import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate request body with Zod
    const result = contactFormSchema.safeParse(body);

    if (!result.success) {
      // If honeypot is triggered, simulate success to fool spambots
      if (body._gotcha && body._gotcha.length > 0) {
        return NextResponse.json({
          success: true,
          message: "Thank you for reaching out.",
        });
      }

      return NextResponse.json(
        {
          success: false,
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, company, projectType, budgetRange, message } = result.data;

    // Log the message for development/audit
    console.log("New contact inquiry received:", {
      name,
      email,
      company,
      projectType,
      budgetRange,
      messageLength: message.length,
      timestamp: new Date().toISOString(),
    });

    // If RESEND_API_KEY is configured in env, send via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);

        await resend.emails.send({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: process.env.CONTACT_EMAIL || "aditya21tripathi81040@gmail.com",
          replyTo: email,
          subject: `New Inquiry: ${projectType} from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || "N/A"}\nProject Type: ${projectType}\nBudget Range: ${budgetRange || "N/A"}\n\nMessage:\n${message}`,
        });
      } catch (emailErr) {
        console.warn("Resend email dispatch error (logging only):", emailErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully. I will respond within 24 hours.",
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected server error occurred. Please try again or email directly.",
      },
      { status: 500 }
    );
  }
}
