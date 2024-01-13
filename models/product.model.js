import { DataTypes } from "sequelize"
import sequelize from "../config/sequelize.js"
import Image from "./image.model.js";
import Order from "./order.model.js";

const Product = sequelize.define('products', {
    productID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    product_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    screen_size: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    os: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cpu: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ram: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    internal_storage: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    main_cam_resolution: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    front_cam_resolution: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    battery: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    weight: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    post_date: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}, {
    timestamps: false
});

// Product.belongsTo(Company, {
//     foreignKey: {
//       name: 'companyID',
//       allowNull: false, // Nếu không muốn bài viết không có người dùng
//     },
//     onDelete: 'CASCADE',
//   });

//   Product.hasMany(Review, {
//     foreignKey: 'productID',
//     onDelete: 'CASCADE',
//   });

  Product.hasMany(Image, {
    foreignKey: 'productID',
    onDelete: 'CASCADE',
  });

  Product.belongsToMany(Order, {
    through: 'OrderDatail',
    foreignKey: 'productID'
  })


export default Product