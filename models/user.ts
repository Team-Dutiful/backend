import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index";

interface UserAttributes {
  user_id: number;
  identification: string;
  password: string;
  name: string;
  email: string;
}

export class User extends Model<UserAttributes> {
  public user_id!: number;
  public identification: string;
  public password!: string;
  public name!: string;
  public email!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    identification: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
  },
  {
    modelName: "User",
    tableName: "User",
    sequelize,
    freezeTableName: true,
    timestamps: true,
    updatedAt: "updateTimestamp",
  }
);
