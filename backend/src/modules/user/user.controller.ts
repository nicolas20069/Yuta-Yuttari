import { Controller, Get, Patch, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from './entities/user.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('obtener_perfil')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'Return user profile.' })
  async getProfile(@GetUser() user: User) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  @Patch('me')
  @ApiOperation({ summary: 'Update current user profile' })
  @ApiResponse({ status: 200, description: 'Profile successfully updated.' })
  @ApiBody({ type: UpdateUserDto })
  async updateProfile(
    @GetUser() user: User,
    @Body() updateData: UpdateUserDto,
  ) {
    const updatedUser = await this.userService.update(user.id, updateData);
    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }
}
