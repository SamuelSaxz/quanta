import type { users } from "@db/schema/users.sql";
import type { UsersDto } from "@shared/dto/users.dto";
import { z } from "zod";

export type User = typeof users.$inferSelect;
export type UserSafe = Omit<User, "password">;
export type InsertUser = typeof users.$inferInsert;
export type UpdateUser = Partial<InsertUser>;

export type CreateUsersDto = z.infer<typeof UsersDto.create>;
export type LoginUsersDto = z.infer<typeof UsersDto.login>;
export type UpdateUsersDto = z.infer<typeof UsersDto.update>;
