import { Controller, Get, Put, Body, UseGuards } from "@nestjs/common";
import { ContactService } from "./contact.service";
import { UpdateContactDto } from "./dto/update-contact.dto";
// Uncomment these if you have auth guards setup for admin routes
// import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
// import { RolesGuard } from "../auth/guards/roles.guard";
// import { Roles } from "../auth/decorators/roles.decorator";
// import { Role } from "@prisma/client";

@Controller("contact-info")
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  async getInfo() {
    return this.contactService.getContactInfo();
  }

  @Put()
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  async updateInfo(@Body() dto: UpdateContactDto) {
    return this.contactService.updateContactInfo(dto);
  }
}
