import { Model, DataTypes } from 'sequelize'
import { sequelize} from "../utils/db.js"

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.TEXT,
    unique: true,
    allowNull: false
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
}, {
  sequelize,
  underscored: true,
  modelName: 'user'
})

export default User
