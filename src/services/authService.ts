import { User, UserAttributes } from "@db/models/user";

export async function findByUserIdentification(identification: string) {
  return User.findOne({ where: { identification } });
}

export async function findByUserNameAndEmail(name: string, email: string) {
  return User.findAll({ where: { name, email } });
}

export async function findById(id: number) {
  return User.findByPk(id);
}

export async function createUser(user: UserAttributes) {
  return User.create(user).then((data) => console.log(data.identification));
}

export async function changeUserPasswrod(user_id: number, newPassword: string) {
  return User.update(
    { password: newPassword },
    {
      where: {
        user_id,
      },
    }
  );
}
