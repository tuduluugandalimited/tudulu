import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import * as nodemailer from "nodemailer";

@Injectable()
export class NewsletterService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly prisma: PrismaService) {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER || "tuduluugandalimited@gmail.com",
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // Get all subscribers
  async findAll() {
    return this.prisma.newsletterSubscriber.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  // Manually add subscriber from admin
  async addSubscriber(email: string) {
    const formattedEmail = email.toLowerCase().trim();
    const existing = await this.prisma.newsletterSubscriber.findUnique({
      where: { email: formattedEmail },
    });

    if (existing) {
      if (!existing.isActive) {
        return this.prisma.newsletterSubscriber.update({
          where: { id: existing.id },
          data: { isActive: true },
        });
      }
      throw new ConflictException("Subscriber already exists.");
    }

    return this.prisma.newsletterSubscriber.create({
      data: { email: formattedEmail },
    });
  }

  // Delete a subscriber
  async remove(id: string) {
    try {
      return await this.prisma.newsletterSubscriber.delete({
        where: { id },
      });
    } catch {
      throw new NotFoundException("Subscriber not found.");
    }
  }

  // Send broadcast newsletter to active subscribers
  async sendBroadcast(subject: string, content: string) {
    const subscribers = await this.prisma.newsletterSubscriber.findMany({
      where: { isActive: true },
      select: { email: true },
    });

    if (subscribers.length === 0) {
      return { message: "No active subscribers found." };
    }

    const emailList = subscribers.map((s) => s.email);

    // Send using BCC to respect recipient privacy
    await this.transporter.sendMail({
      from: `"Tudulu Newsletter" <${process.env.SMTP_USER || "tuduluugandalimited@gmail.com"}>`,
      bcc: emailList,
      subject: subject,
      html: `
        <div style="font-family: sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; line-height: 1.6;">
          ${content.replace(/\n/g, "<br/>")}
        </div>
      `,
    });

    return { message: `Broadcast sent to ${subscribers.length} subscribers.` };
  }
}
