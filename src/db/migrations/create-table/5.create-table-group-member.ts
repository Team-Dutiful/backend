import { GroupMember } from "../../models/group-member";

console.log("===============Create GroupMember Table===============");

const create_table_group_member = async () => {
  await GroupMember.sync({ force: true })
    .then(() => {
      console.log("✅Success Create GroupMember Table");
    })
    .catch((err) => {
      console.log("❗️Error in Create GroupMember Table : ", err);
    });
};

create_table_group_member();
