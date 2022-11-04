import { DataTypes, Model } from "sequelize";
import { Group } from "./group";
import { sequelize } from "./index";
import { User } from "./user";

interface GroupMemberAttributes {
  group_member_id: number;
  user_id: number;
  group_id: number;
}

export class GroupMember extends Model<GroupMemberAttributes> {
  public group_member_id: number;
}

GroupMember.init(
  {
    group_member_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    modelName: "GroupMember",
    tableName: "GroupMember",
    sequelize,
    freezeTableName: true,
  }
);

User.hasMany(GroupMember, { sourceKey: "user_id", foreignKey: "user_id" });
GroupMember.belongsTo(User, { targetKey: "user_id", foreignKey: "user_id" });

Group.hasMany(GroupMember, { sourceKey: "group_id", foreignKey: "group_id" });
GroupMember.belongsTo(Group, { targetKey: "group_id", foreignKey: "group_id" });
