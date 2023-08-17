const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            validate: {
                validator: async function (value) {
                    const user = await this.constructor.findOne({ username: value });
                    return !user;
                },
                data: 'Username must be unique.'
            }
        },
        name: { type: String, required: true },
        password: { type: String, required: true }
    },
    { timestamps: true, versionKey: false }
);

const UsersModel = mongoose.model('users', UsersSchema);
module.exports = UsersModel;
