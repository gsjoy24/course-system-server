import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import { TPreviousPassword, TUser, UserModel } from './Auth.interface';
import config from '../../config';

const previousPasswordSchema = new Schema<TPreviousPassword>(
  {
    password: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: false,
  },
);

const UserSchema = new Schema<TUser, UserModel>(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: 0,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    previousPasswords: {
      type: [previousPasswordSchema],
      default: [],
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

//  hashing password
UserSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

// removing the password from the returning data for user creation.
UserSchema.post('save', function (doc, next) {
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { password, previousPasswords, ...userDataWithoutPassword } =
    this.toObject();
  this.set('password', undefined, { strict: false });
  this.set('previousPasswords', undefined, { strict: false });

  // Update the document with userDataWithoutPassword
  Object.assign(this, userDataWithoutPassword);
  next();
});

// method for finding user
UserSchema.statics.isUserExists = async function (username: string) {
  return await this.findOne({ username }).select('+password');
};

// method for comparing password
UserSchema.statics.isPasswordMatched = async function (
  plainPassword: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

export const User = model<TUser, UserModel>('User', UserSchema);
