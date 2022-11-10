import { User } from "@db/models/user";

class AuthService {
  login = async () => {
    try {
      await User.create({
        identification: "John",
        password: "1234",
        name: "hi",
        email: "john@naver.com",
      });
    } catch (err) {
      console.error(err);
      return err;
    }
  };

  logout = async () => {
    console.log("test");
  };

  signup = async (
    identification: string,
    password: string,
    name: string,
    email: string
  ) => {
    try {
      await User.create({
        identification,
        password,
        name,
        email,
      });
    } catch (error) {
      throw error;
    }
  };
}

export default AuthService;
