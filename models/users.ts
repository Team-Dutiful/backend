import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index";

type Gender = "MAN" | "WOMEN";

interface UsersAttributes {
  email: string;
  password: string | null;
  nickname: string;
  age: number;
  gender: Gender;
}

export class Users extends Model<UsersAttributes> {
  public readonly id!: number;
  public email!: string;
  public password!: string;
  public nickname!: string;
  public age!: number;
  public gender!: Gender;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Users.init(
  {
    email: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    nickname: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: "Users",
    tableName: "Users",
    sequelize,
    freezeTableName: true,
    timestamps: true,
    updatedAt: "updateTimestamp",
  }
);
