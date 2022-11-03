import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index";
import { User } from "./user";

interface GroupAttributes {
  group_id: number;
  name: string;
  color: string;
}

export class Group extends Model<GroupAttributes> {
  public group_id: number;
  public name: string;
  public color: string;
}

Group.init(
  {
    group_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
  },
  {
    modelName: "Group",
    tableName: "Group",
    sequelize,
    freezeTableName: true,
  }
);

User.hasOne(Group, { sourceKey: "user_id", foreignKey: "leader_id" });
Group.belongsTo(User, { targetKey: "user_id", foreignKey: "leader_id" });
