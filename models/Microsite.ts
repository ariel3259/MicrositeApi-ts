import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from "sequelize";
import sequelize from "../configs/devCon";

class Microsite extends Model<InferAttributes<Microsite>, InferCreationAttributes<Microsite>>{
    declare id: CreationOptional<number>
    declare name: string
    declare url: string
    declare typeId: number
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
    declare state: boolean
}

Microsite.init({
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    url: DataTypes.STRING,
    typeId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    state: DataTypes.BOOLEAN
}, {
    tableName: 'microsite',
    sequelize
});

Microsite.beforeCreate((microsite: Microsite) => {
        microsite.createdAt = new Date();
        microsite.updatedAt = new Date();
        microsite.state = true;
});

Microsite.beforeUpdate((microsite: Microsite) => {
        microsite.updatedAt = new Date();
});

export default Microsite