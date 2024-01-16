const db = require("../models");

const getAllCompany = () =>
  new Promise(async (resolve, reject) => {
    try {
      const companies = await db.Company.findAll({
        include: [
          {
            model: db.Product,
            required: true,
            attributes: [],
          },
        ],
      });

      if (companies) {
        resolve({ code: 1, message: "OK", data: companies });
      } else {
        resolve({ code: 0, message: "Không có công ty nào" });
      }
    } catch (error) {
      reject({ code: 0, message: "Lỗi server", error });
    }
  });

export default { getAllCompany };
