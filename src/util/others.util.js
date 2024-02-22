import bcrypt from "bcrypt";

//crea el hash
export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

//valida el password
export const isValidPassword = (user, password) =>
  bcrypt.compareSync(password, user.password);

  //compara el password
export const compareHash = async (passwordToCompare, hashedPassword) => {
  try {
    const match = await bcrypt.compare(passwordToCompare, hashedPassword);
    return match;
  } catch (error) {
    console.error("Error al comparar contraseñas:", error);
    throw error;
  }
};
