import Image from "../models/image.js"

const createImage = (file, prodID) => {
    Image.create({
        image_path: file,
        productID: prodID
    }).then(data => {
        console.log(data)
    }).catch(err => {
        console.log(err)
    })
}

export default createImage