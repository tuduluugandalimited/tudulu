import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UpdateContactDto } from "./dto/update-contact.dto";

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  async getContactInfo() {
    let info = await this.prisma.contactInfo.findFirst();
    if (!info) {
      // Seed default record if none exists
      info = await this.prisma.contactInfo.create({
        data: {
          headquarters: "Kampala, Uganda",
          email: "tuduluugandalimited@gmail.com",
          phone: "+256 750 692 621",
        },
      });
    }
    return info;
  }

  async updateContactInfo(dto: UpdateContactDto) {
    const info = await this.prisma.contactInfo.findFirst();
    if (!info) {
      return this.prisma.contactInfo.create({
        data: {
          headquarters: dto.headquarters ?? "Kampala, Uganda",
          email: dto.email ?? "tuduluugandalimited@gmail.com",
          phone: dto.phone ?? "+256 750 692 621",
        },
      });
    }

    return this.prisma.contactInfo.update({
      where: { id: info.id },
      data: dto,
    });
  }
}
