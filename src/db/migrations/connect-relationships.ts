import { CalendarDate } from "../models/calendar-date";
import { Group } from "../models/group";
import { GroupMember } from "../models/group-member";
import { User } from "../models/user";
import { Work } from "../models/work";

console.log("===============Connect All Relationships===============");

const connect_relationships = () => {
  User.hasMany(CalendarDate, { sourceKey: "user_id", foreignKey: "user_id" });
  User.hasMany(Work, { sourceKey: "user_id", foreignKey: "user_id" });
  CalendarDate.hasMany(Work, {
    sourceKey: "calendar_date_id",
    foreignKey: "calendar_date_id",
  });
  Group.belongsTo(User, { foreignKey: "leader_id" });
  GroupMember.belongsTo(User, { foreignKey: "user_id" });
  GroupMember.belongsTo(Group, { foreignKey: "group_id" });
};

console.log(
  "=============== ✅Success Connect All Relationships ==============="
);

connect_relationships();
