import { DataTypes, Model } from "sequelize";
import { Group } from "./group";
import { sequelize } from "./index";
import { User } from "./user";

interface GroupMemberAttributes {
  group_member_id: number;
}

export class GroupMember extends Model<GroupMemberAttributes> {
  public group_member_id: number;
}

GroupMember.init(
  {
    group_member_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
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

GroupMember.belongsTo(User, { foreignKey: "user_id" });
GroupMember.belongsTo(Group, { foreignKey: "group_id" });
