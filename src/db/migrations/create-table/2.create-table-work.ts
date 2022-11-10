import { Work } from "../../models/work";

console.log("===============Create User Table===============");

const create_table_work = async () => {
  await Work.sync({ force: true })
    .then(() => {
      console.log("✅Success Create Work Table");
    })
    .catch((err) => {
      console.log("❗️Error in Create Work Table : ", err);
    });
};

create_table_work();
