import { Group } from "../../models/group";

console.log("===============Create Group Table===============");

const create_table_group = async () => {
  await Group.sync({ force: true })
    .then(() => {
      console.log("✅Success Create Group Table");
    })
    .catch((err) => {
      console.log("❗️Error in Create Group Table : ", err);
    });
};

create_table_group();
