import { User, UserAttributes } from "@db/models/user";
import nodemailer from "nodemailer";
import ejs from "ejs";

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

export async function sendAuthMail() {
  let emailTemplate;
  const authNum = 12345;
  ejs.renderFile("src/ejs/auth.ejs", { authCode: authNum }, (error, data) => {
    if (error) {
      console.log(error);
      throw error;
    }
    emailTemplate = data;
  });

  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "teamdutiful",
      pass: "avkanfsowoilplqy",
    },
  });

  let mailOptions = await transporter.sendMail({
    from: "Dutiful",
    to: "azss0470@gmail.com",
    subject: "듀티풀 회원가입 인증번호 입니다.",
    html: emailTemplate,
  });

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      throw error;
    }
    console.log("Finish sending email : " + info.response);
    transporter.close();
  });
}
