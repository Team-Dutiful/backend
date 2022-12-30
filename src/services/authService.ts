import { config } from "config";
import { User, UserAttributes } from "@db/models/user";
import nodemailer from "nodemailer";
import ejs from "ejs";

export async function findByUserIdentification(identification: string) {
  return User.findOne({ where: { identification } });
}

export async function findByUserNameAndEmail(name: string, email: string) {
  return User.findOne({ where: { name, email } });
}

export async function findByEmail(email: string) {
  return User.findOne({ where: { email } });
}

export async function findById(id: number) {
  return User.findByPk(id);
}

export async function createUser(user: UserAttributes) {
  return User.create(user);
}

export async function changeUserName(user_id: number, newUserName: string) {
  return User.update(
    { name: newUserName },
    {
      where: {
        user_id,
      },
    }
  );
}

export async function changeUserEmail(user_id: number, newUserEmail: string) {
  return User.update(
    { email: newUserEmail },
    {
      where: {
        user_id,
      },
    }
  );
}

export async function changeUserPassword(user_id: number, newPassword: string) {
  return User.update(
    { password: newPassword },
    {
      where: {
        user_id,
      },
    }
  );
}

export async function sendCodeMail(
  email: string,
  type: "signup" | "changepwd"
) {
  const authNum = generateRandom(111111, 999999);
  let emailTemplate: string;
  const file =
    type === "signup" ? "src/ejs/signup.ejs" : "src/ejs/change_pwd.ejs";

  ejs.renderFile(file, { authCode: authNum }, (error, data) => {
    if (error) {
      console.log(error);
      throw error;
    }
    emailTemplate = data;
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: config.admin.email,
      pass: config.admin.password,
    },
  });

  const mailOptions = {
    from: "Dutiful",
    to: email,
    subject:
      type === "signup"
        ? "[Dutiful] 회원가입 인증번호 입니다."
        : "[Dutiful] 비밀번호 변경 인증번호 입니다.",
    html: emailTemplate,
  };

  const info = await transporter.sendMail(mailOptions);
  transporter.close();
  console.log("Finish sending email :", info.accepted[0]);

  return authNum;
}

function generateRandom(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
