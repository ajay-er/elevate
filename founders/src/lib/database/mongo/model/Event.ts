import mongoose, { Schema, Document } from 'mongoose';

interface IEvent extends Document {
  eventId: string;
  name: string;
}

const eventSchema = new Schema<IEvent>({
    eventId: { type: String, required: true },
    name: { type: String, required: true },
});

const EventModel = mongoose.model<IEvent>(
    'Event',
    eventSchema
);

export { EventModel, IEvent };
