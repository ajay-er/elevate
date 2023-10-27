import mongoose, { Schema, Document } from 'mongoose';

// Define the user schema
const userSessionSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  otp: {
    type: String,
  },
});

// Define the User interface for TypeScript
interface TempSession extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  otp: string;
}

// Create the User model
const UserSession = mongoose.model<TempSession>('Session', userSessionSchema);

export default UserSession;
