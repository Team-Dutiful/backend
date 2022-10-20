import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index";

interface CalendarAttributes {
  calendar_date_id: number;
  year: number;
  month: number;
  day: number;
}

export class CalendarDate extends Model<CalendarAttributes> {
  public calendar_date_id!: number;
  public year!: number;
  public month!: number;
  public day!: number;
}

CalendarDate.init(
  {
    calendar_date_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    month: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    day: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    modelName: "CalendarDate",
    tableName: "CalendarDate",
    sequelize,
    freezeTableName: true,
    timestamps: true,
    updatedAt: "updateTimestamp",
  }
);
