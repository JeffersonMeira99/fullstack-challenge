import { validate } from "class-validator";

export const validateDto = async (dto: object) => {
  const errors = await validate(dto);
  if (errors.length > 0) {
    const messages = errors
      .map((error) => Object.values(error.constraints || {}))
      .flat();
    throw new Error(messages.join(", "));
  }
};
