import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index";

interface WorkAttributes {
  work_id: number;
  name: string;
  color: string;
  start_time: Date;
  end_time: Date;
  work_type: string;
  memo: string;
}

export class Work extends Model<WorkAttributes> {
  public work_id: number;
  public name: string;
  public color: string;
  public start_time: Date;
  public end_time: Date;
  public work_type: string;
  public memo: string;
}

Work.init(
  {
    work_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
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
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    work_type: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    memo: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
  },
  {
    modelName: "Work",
    tableName: "Work",
    sequelize,
    freezeTableName: true,
    timestamps: true,
    updatedAt: "updateTimestamp",
  }
);
