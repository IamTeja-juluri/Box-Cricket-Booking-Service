const dotenv=require('dotenv');
dotenv.config();

module.exports={
    PORT:process.env.PORT,
    BOX_CRICKET_SERVICE:process.env.BOX_CRICKET_SERVICE
}